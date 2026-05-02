import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabaseClient";
import { useState } from "react";

export default function Navbar({ onSearch }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div 
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 6%",
        backgroundColor: "rgba(7, 15, 10, 0.8)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(46, 204, 113, 0.15)",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "72px",
        zIndex: 100,
        boxSizing: "border-box"
      }}
    >
      {/* Dynamic Glowing Logo */}
      <h1
        style={{
          color: "#2ECC71",
          fontSize: "26px",
          fontWeight: "900",
          letterSpacing: "1px",
          cursor: "pointer",
          margin: 0,
          textShadow: "0px 0px 18px rgba(46, 204, 113, 0.55)",
          userSelect: "none"
        }}
        onClick={() => navigate("/home")}
      >
        INFLIX
      </h1>

      {/* Cyber Search Input */}
      <div style={{ position: "relative", width: "100%", maxWidth: "340px", display: "flex", alignItems: "center" }}>
        <span style={{ position: "absolute", left: "14px", color: "#415047", fontSize: "14px" }}>🔍</span>
        <input
          type="text"
          placeholder="Search titles, genres..."
          value={query}
          onChange={handleSearch}
          style={{
            width: "100%",
            backgroundColor: "rgba(18, 26, 22, 0.65)",
            border: "1px solid rgba(46, 204, 113, 0.25)",
            borderRadius: "10px",
            padding: "10px 16px 10px 40px",
            color: "#FFFFFF",
            fontSize: "13.5px",
            outline: "none",
            boxSizing: "border-box",
            transition: "border-color 0.2s ease, box-shadow 0.2s ease"
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#2ECC71";
            e.target.style.boxShadow = "0 0 15px rgba(46, 204, 113, 0.2)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "rgba(46, 204, 113, 0.25)";
            e.target.style.boxShadow = "none";
          }}
        />
      </div>

      {/* Modern Account Icon / Logout Button */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            color: "#8B9E95",
            fontSize: "12.5px",
            fontWeight: "600",
            padding: "9px 18px",
            borderRadius: "10px",
            cursor: "pointer",
            transition: "all 0.2s ease"
          }}
          onMouseOver={(e) => {
            e.target.style.borderColor = "#2ECC71";
            e.target.style.color = "#2ECC71";
            e.target.style.backgroundColor = "rgba(46, 204, 113, 0.05)";
          }}
          onMouseOut={(e) => {
            e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
            e.target.style.color = "#8B9E95";
            e.target.style.backgroundColor = "transparent";
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}