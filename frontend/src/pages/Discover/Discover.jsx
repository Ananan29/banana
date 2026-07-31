import React from "react";

const colors = [
  "#FFB4A2",
  "#A0C4FF",
  "#B9FBC0",
  "#FFD166",
  "#CDB4DB",
  "#90E0EF",
];

const Discover = () => {
  return (
    <div
      style={{
        minHeight: "200vh",
        background: "linear-gradient(to bottom, #eef7ff, #d7ecff)",
        padding: "40px",
        fontFamily: "sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          color: "#2c3e50",
          marginBottom: "10px",
        }}
      >
        📚 Discover
      </h1>

      <p
        style={{
          color: "#555",
          marginBottom: "40px",
        }}
      >
        Browse your next favourite book.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "25px",
        }}
      >
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            style={{
              background: "white",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
            }}
          >
            <div
              style={{
                height: "180px",
                background: colors[i % colors.length],
              }}
            />

            <div style={{ padding: "18px" }}>
              <h2 style={{ margin: 0 }}>Book {i + 1}</h2>

              <p
                style={{
                  color: "#666",
                  marginTop: "10px",
                  lineHeight: "1.5",
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                facilisi. Pellentesque habitant morbi tristique senectus.
              </p>

              <button
                style={{
                  marginTop: "10px",
                  padding: "10px 18px",
                  border: "none",
                  borderRadius: "10px",
                  background: "#4F46E5",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Discover;