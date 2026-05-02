import { useState } from "react";
import { supabase } from "../services/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (error) alert(error.message);
    else navigate("/home");
  };

  return (
    <div 
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        background: "linear-gradient(180deg, #070F0A 0%, #030504 100%)",
        fontFamily: "system-ui, -apple-system, sans-serif",
        padding: "40px 20px",
        boxSizing: "border-box",
        color: "#FFFFFF"
      }}
    >
      {/* Top Main Section */}
      <div 
        style={{
          width: "100%",
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexGrow: 1,
          justifyContent: "center",
          marginBottom: "40px"
        }}
      >
        {/* Glow INFLIX Header */}
        <h1 
          style={{
            color: "#2ECC71",
            fontSize: "44px",
            fontWeight: "900",
            letterSpacing: "1px",
            margin: "0 0 32px 0",
            textShadow: "0px 0px 25px rgba(46, 204, 113, 0.45)",
            textAlign: "center"
          }}
        >
          INFLIX
        </h1>

        {/* Login Card */}
        <div 
          style={{
            width: "100%",
            backgroundColor: "rgba(18, 26, 22, 0.55)",
            border: "1px solid rgba(46, 204, 113, 0.15)",
            borderRadius: "18px",
            padding: "36px 28px",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
            boxSizing: "border-box"
          }}
        >
          <h2 
            style={{
              fontSize: "26px",
              fontWeight: "700",
              textAlign: "center",
              margin: "0 0 8px 0",
              color: "#FFFFFF"
            }}
          >
            Welcome Back
          </h2>
          <p 
            style={{
              fontSize: "13px",
              color: "#8B9E95",
              textAlign: "center",
              margin: "0 0 28px 0",
              fontWeight: "400"
            }}
          >
            Stream your favorites in high-fidelity.
          </p>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column" }}>
            {/* Email Field */}
            <div style={{ marginBottom: "20px" }}>
              <label 
                style={{
                  fontSize: "11px",
                  color: "#2ECC71",
                  fontWeight: "700",
                  letterSpacing: "0.8px",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "8px"
                }}
              >
                Email Address
              </label>
              <div style={{ position: "relative" }}>
                <span 
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#6D8177",
                    fontSize: "14px"
                  }}
                >
                  ✉
                </span>
                <input
                  type="email"
                  placeholder="name@inflix.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: "100%",
                    backgroundColor: "rgba(11, 15, 13, 0.75)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "10px",
                    padding: "13px 16px 13px 40px",
                    color: "#FFFFFF",
                    fontSize: "13.5px",
                    outline: "none",
                    boxSizing: "border-box",
                    transition: "border-color 0.2s"
                  }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div style={{ marginBottom: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <label 
                  style={{
                    fontSize: "11px",
                    color: "#2ECC71",
                    fontWeight: "700",
                    letterSpacing: "0.8px",
                    textTransform: "uppercase",
                    margin: 0
                  }}
                >
                  Password
                </label>
                <span style={{ fontSize: "11px", color: "#6D8177", cursor: "pointer" }}>
                  Forgot?
                </span>
              </div>
              <div style={{ position: "relative" }}>
                <span 
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#6D8177",
                    fontSize: "14px"
                  }}
                >
                  🔒
                </span>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: "100%",
                    backgroundColor: "rgba(11, 15, 13, 0.75)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "10px",
                    padding: "13px 16px 13px 40px",
                    color: "#FFFFFF",
                    fontSize: "13.5px",
                    outline: "none",
                    boxSizing: "border-box",
                    transition: "border-color 0.2s"
                  }}
                />
              </div>
            </div>

            {/* Submit Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                backgroundColor: "#2ECC71",
                border: "none",
                color: "#050B08",
                fontSize: "14.5px",
                fontWeight: "700",
                padding: "14px",
                borderRadius: "10px",
                cursor: loading ? "not-allowed" : "pointer",
                boxShadow: "0 6px 20px rgba(46, 204, 113, 0.25)",
                transition: "background-color 0.2s, transform 0.1s",
                boxSizing: "border-box",
                marginBottom: "24px"
              }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Footer of Card */}
          <div style={{ textAlign: "center" }}>
            <p style={{ margin: 0, fontSize: "13px", color: "#FFFFFF" }}>
              New to INFLIX?{" "}
              <span 
                onClick={() => navigate("/signup")}
                style={{ color: "#2ECC71", cursor: "pointer", fontWeight: "600" }}
              >
                Create account
              </span>
            </p>
          </div>
        </div>

        {/* Small T&C disclaimer */}
        <p 
          style={{
            fontSize: "11px",
            color: "#56675E",
            textAlign: "center",
            marginTop: "24px",
            lineHeight: "1.6",
            maxWidth: "320px"
          }}
        >
          By continuing, you agree to our <span style={{ color: "#A8BDB1" }}>Terms of Service</span> and <span style={{ color: "#A8BDB1" }}>Privacy Policy</span>.
        </p>

        {/* Verification tiny icons */}
        <div style={{ display: "flex", gap: "16px", marginTop: "14px", color: "#415047", fontSize: "12px" }}>
          <span>🛡️</span> <span>✔️</span> <span>🌐</span>
        </div>
      </div>

      {/* Page Footer */}
      <div 
        style={{
          width: "100%",
          maxWidth: "400px",
          borderTop: "1px solid rgba(255, 255, 255, 0.04)",
          paddingTop: "24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <h3 
          style={{
            fontSize: "14px",
            fontWeight: "900",
            color: "#FFFFFF",
            letterSpacing: "1px",
            margin: "0 0 16px 0"
          }}
        >
          INFLIX
        </h3>
        <div 
          style={{
            display: "flex",
            gap: "24px",
            fontSize: "11.5px",
            color: "#6D8177",
            marginBottom: "20px"
          }}
        >
          <span style={{ cursor: "pointer" }}>Privacy Policy</span>
          <span style={{ cursor: "pointer" }}>Terms of Service</span>
          <span style={{ cursor: "pointer" }}>Help Center</span>
        </div>
        <span style={{ fontSize: "11.5px", color: "#6D8177", cursor: "pointer", marginBottom: "20px" }}>Contact Us</span>
        <span style={{ fontSize: "10px", color: "#415047", letterSpacing: "0.5px" }}>
          © 2026 INFLIX ENTERTAINMENT. ALL RIGHTS RESERVED.
        </span>
      </div>
    </div>
  );
}