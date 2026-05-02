import { useNavigate } from "react-router-dom";

export default function Banner({ movie }) {
  const navigate = useNavigate();

  if (!movie) return null;

  return (
    <div
      style={{
        height: "65vh",
        minHeight: "420px",
        backgroundImage: `linear-gradient(180deg, rgba(7, 15, 10, 0.1) 0%, #030504 95%), url(${movie.thumbnail})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "40px 6%",
        boxSizing: "border-box",
        position: "relative",
        borderBottom: "1px solid rgba(46, 204, 113, 0.08)"
      }}
    >
      <div style={{ maxWidth: "600px", zIndex: 5 }}>
        {/* Neon Green Featured Badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
          <span style={{
            backgroundColor: "rgba(46, 204, 113, 0.15)",
            border: "1px solid rgba(46, 204, 113, 0.5)",
            color: "#2ECC71",
            fontSize: "10.5px",
            fontWeight: "800",
            letterSpacing: "1.5px",
            padding: "4px 10px",
            borderRadius: "6px",
            textTransform: "uppercase"
          }}>
            Trending Now
          </span>
          <span style={{ fontSize: "12px", color: "#6D8177", fontWeight: "500" }}>
            2026 • 1h 42m • Action, Sci-Fi
          </span>
        </div>

        {/* Title */}
        <h1 
          style={{
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: "900",
            color: "#FFFFFF",
            margin: "0 0 14px 0",
            letterSpacing: "-1px",
            lineHeight: "1.1",
            textShadow: "0px 2px 10px rgba(0,0,0,0.5)"
          }}
        >
          {movie.title}
        </h1>

        {/* Description */}
        <p 
          style={{
            fontSize: "14px",
            color: "#A8BDB1",
            margin: "0 0 24px 0",
            maxWidth: "520px",
            lineHeight: "1.6",
            fontWeight: "400"
          }}
        >
          {movie.description || "In a world where digital reality and physical existence have blurred, discover a hidden protocol that could redefine humanity."}
        </p>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={() => navigate(`/player/${movie.id}`)}
            style={{
              backgroundColor: "#2ECC71",
              border: "none",
              color: "#070F0A",
              fontSize: "14px",
              fontWeight: "700",
              padding: "12px 28px",
              borderRadius: "10px",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0px 6px 16px rgba(46, 204, 113, 0.3)",
              transition: "transform 0.2s ease, background-color 0.2s ease"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#27ae60";
              e.currentTarget.style.transform = "scale(1.02)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#2ECC71";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            ▶ Watch Now
          </button>

          <button
            onClick={() => alert("Added to your Watchlist!")}
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.06)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              color: "#FFFFFF",
              fontSize: "14px",
              fontWeight: "600",
              padding: "12px 24px",
              borderRadius: "10px",
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.12)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.06)";
            }}
          >
            + My List
          </button>
        </div>
      </div>
    </div>
  );
}