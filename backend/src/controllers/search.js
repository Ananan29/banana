import typesense from "../config/typesense.js";

export const searchBooks = async (req, res,next) => {
    try {
        const {q}= req.query;

        if (!q || !q.trim()) {
            return res.status(400).json({
                message: "Search query is required",
            });
        }

        const results = await typesense
                .collections("books")
                .documents()
                .search({
                    q: q.trim(),
                    query_by: "title,author,genres,description",
                    per_page: 10,
                    sort_by: "_text_match:desc,popularityScore:desc",
                });

        const books = results.hits.map((hit) => hit.document);

        res.status(200).json(books);

    } 
    catch (error) {
        next(error);
    }
};