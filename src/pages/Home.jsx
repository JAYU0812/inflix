import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [lastMovie, setLastMovie] = useState(null);
  const navigate = useNavigate();

  // Fetch movies
  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const { data, error } = await supabase.from("movies").select("*");
    if (error) {
      console.log(error);
    } else {
      setMovies(data);
      setFilteredMovies(data);
    }
  };

  // Search function
  const handleSearch = (query) => {
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  // Continue watching logic
  useEffect(() => {
    const lastId = localStorage.getItem("lastMovie");
    if (lastId && movies.length > 0) {
      const found = movies.find((m) => m.id === lastId);
      setLastMovie(found);
    }
  }, [movies]);

  return (
    <div 
      style={{
        backgroundColor: "#030504",
        background: "linear-gradient(180deg, #070F0A 0%, #030504 100%)",
        minHeight: "100vh",
        color: "#FFFFFF",
        fontFamily: "system-ui, -apple-system, sans-serif",
        paddingBottom: "80px",
        boxSizing: "border-box"
      }}
    >
      {/* Navbar Section */}
      <Navbar onSearch={handleSearch} />

      {/* Banner Section */}
      <div style={{ paddingTop: "72px" }}>
        <Banner movie={movies[0]} />
      </div>

      {/* Continue Watching */}
      {lastMovie && (
        <div style={{ padding: "32px 6% 16px 6%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            <span style={{ color: "#2ECC71", fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1.5px" }}>
              Playback
            </span>
            <div style={{ flexGrow: 1, height: "1px", backgroundColor: "rgba(46, 204, 113, 0.15)" }}></div>
          </div>
          
          <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#FFFFFF", margin: "0 0 16px 0", letterSpacing: "-0.5px" }}>
            Continue Watching
          </h2>

          <div
            style={{
              cursor: "pointer",
              width: "240px",
              backgroundColor: "rgba(18, 26, 22, 0.45)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              borderRadius: "14px",
              padding: "12px",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
              transition: "transform 0.3s ease, border-color 0.3s ease",
            }}
            onClick={() => navigate(`/player/${lastMovie.id}`)}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.03)";
              e.currentTarget.style.borderColor = "rgba(46, 204, 113, 0.4)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.05)";
            }}
          >
            <div style={{ width: "100%", height: "130px", overflow: "hidden", borderRadius: "10px", position: "relative" }}>
              <img
                src={lastMovie.thumbnail}
                alt={lastMovie.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div style={{
                position: "absolute",
                bottom: "8px",
                left: "8px",
                backgroundColor: "#2ECC71",
                color: "#030504",
                fontSize: "11px",
                fontWeight: "700",
                padding: "3px 8px",
                borderRadius: "4px"
              }}>
                RESUME
              </div>
            </div>
            <h3 style={{ marginTop: "12px", fontSize: "14px", fontWeight: "700", color: "#FFFFFF", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", margin: "12px 0 2px 0" }}>
              {lastMovie.title}
            </h3>
            <p style={{ fontSize: "11px", color: "#6D8177", margin: 0 }}>
              Pick up right where you left off
            </p>
          </div>
        </div>
      )}

      {/* Suggested & Movie Grid Section */}
      <div style={{ padding: "32px 6% 16px 6%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
          <span style={{ color: "#2ECC71", fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1.5px" }}>
            Discovery
          </span>
          <div style={{ flexGrow: 1, height: "1px", backgroundColor: "rgba(46, 204, 113, 0.15)" }}></div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "800", color: "#FFFFFF", margin: 0, letterSpacing: "-0.5px" }}>
            Suggested For You
          </h2>
          <span style={{ fontSize: "12px", color: "#6D8177", fontWeight: "600", cursor: "pointer", letterSpacing: "0.5px" }}>
            VIEW ALL ➔
          </span>
        </div>

        {filteredMovies.length === 0 ? (
          <p style={{ color: "#6D8177", fontSize: "14px" }}>No movies found in current selection.</p>
        ) : (
          <div 
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))",
              gap: "24px"
            }}
          >
            {filteredMovies.map((movie) => (
              <div
                key={movie.id}
                style={{
                  cursor: "pointer",
                  backgroundColor: "rgba(18, 26, 22, 0.35)",
                  border: "1px solid rgba(255, 255, 255, 0.04)",
                  borderRadius: "14px",
                  padding: "10px",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)"
                }}
                onClick={() => navigate(`/player/${movie.id}`)}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.borderColor = "rgba(46, 204, 113, 0.35)";
                  e.currentTarget.style.boxShadow = "0 12px 30px rgba(46, 204, 113, 0.12)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.04)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.2)";
                }}
              >
                <div style={{ width: "100%", height: "260px", overflow: "hidden", borderRadius: "10px", position: "relative" }}>
                  <img
                    src={movie.thumbnail}
                    alt={movie.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                  />
                  {/* Subtle 4K Neon Tag Over Image */}
                  <div style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    backgroundColor: "rgba(7, 15, 10, 0.8)",
                    border: "1px solid rgba(46, 204, 113, 0.4)",
                    color: "#2ECC71",
                    fontSize: "9px",
                    fontWeight: "800",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    letterSpacing: "0.5px"
                  }}>
                    4K HDR
                  </div>
                </div>

                <div style={{ marginTop: "14px", padding: "0 4px 4px 4px" }}>
                  <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#FFFFFF", margin: "0 0 4px 0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {movie.title}
                  </h3>
                  <span style={{ fontSize: "11px", color: "#56675E", fontWeight: "500" }}>
                    Cyberpunk • Action
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cyber Noir Page Footer */}
      <div 
        style={{
          borderTop: "1px solid rgba(255, 255, 255, 0.04)",
          marginTop: "64px",
          padding: "40px 20px 24px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <h3 style={{ fontSize: "16px", fontWeight: "900", color: "#FFFFFF", letterSpacing: "1px", margin: "0 0 14px 0" }}>
          INFLIX
        </h3>
        <span style={{ fontSize: "11px", color: "#415047", letterSpacing: "0.5px" }}>
          © 2026 INFLIX ENTERTAINMENT. ALL RIGHTS RESERVED.
        </span>
      </div>
    </div>
  );
}