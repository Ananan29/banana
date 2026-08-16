import AppError from "../utils/AppError.js";

const ollamaBaseUrl = () =>
  (process.env.OLLAMA_HOST || "http://127.0.0.1:11434").replace(/\/$/, "");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const postChat = async ({ model, system, prompt }) => {
  const response = await fetch(`${ollamaBaseUrl()}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    signal: AbortSignal.timeout(90000),
    body: JSON.stringify({
      model,
      stream: false,
      keep_alive: "10m",
      options: {
        temperature: 0,
        top_p: 0.8,
        top_k: 20,
        repeat_penalty: 1.15,
        num_predict: 220,
        num_ctx: 4096,
      },
      messages: [
        ...(system ? [{ role: "system", content: system }] : []),
        { role: "user", content: prompt },
      ],
    }),
  });

  if (!response.ok) {
    const errBody = await response.json().catch(() => ({}));
    const error = new Error(errBody?.error || `Ollama ${response.status}`);
    error.status = response.status;
    throw error;
  }

  const data = await response.json();
  return data.message?.content?.trim() || "";
};

export const askOllama = async ({ system, prompt }) => {
  const model = process.env.OLLAMA_MODEL || "llama3.2";
  let lastError;

  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      return await postChat({ model, system, prompt });
    } catch (error) {
      lastError = error;
      const retryable =
        error.name === "TimeoutError" ||
        error.name === "AbortError" ||
        error.code === "ECONNREFUSED" ||
        error.status >= 500;
      if (!retryable || attempt === 2) break;
      await sleep(800);
    }
  }

  if (lastError?.name === "TimeoutError" || lastError?.name === "AbortError") {
    throw new AppError("The local model took too long. Try a shorter question.", 504);
  }
  if (lastError?.code === "ECONNREFUSED" || lastError?.cause?.code === "ECONNREFUSED") {
    throw new AppError("Ollama is not running. Start the Ollama app and try again.", 503);
  }
  if (lastError?.status === 404) {
    throw new AppError(
      `Ollama model "${model}" is not installed. Run: ollama pull ${model}`,
      503
    );
  }
  if (lastError?.message?.includes("fetch failed") || lastError?.cause) {
    throw new AppError("Ollama is not running. Start the Ollama app and try again.", 503);
  }
  console.error("Ollama error:", lastError);
  throw new AppError(lastError?.message || "The local model failed.", 502);
};
