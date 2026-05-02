import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabaseClient";
import Hls from "hls.js";

export default function Player() {
  const { id } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  
  const [movie, setMovie] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Fetch movie data
  useEffect(() => {
    fetchMovie();
  }, [id]);

  const fetchMovie = async () => {
    const { data, error } = await supabase
      .from("movies")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.log(error);
    } else {
      setMovie(data);
      setVideoUrl(data.video_url);
    }
  };

  // Save last watched movie
  useEffect(() => {
    if (id) {
      localStorage.setItem("lastMovie", id);
    }
  }, [id]);

  // Load HLS video
  useEffect(() => {
    if (!videoUrl) return;

    const video = videoRef.current;

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = videoUrl;
    } else if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoUrl);
      hls.attachMedia(video);
    }
  }, [videoUrl]);

  // Handle Play/Pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Skip time forward/backward
  const skipTime = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  // Handle volume changes
  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
    }
  };

  // Time updates for progress slider
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100 || 0);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleProgressChange = (e) => {
    const manualPercent = parseFloat(e.target.value);
    if (videoRef.current && videoRef.current.duration) {
      const manualTime = (manualPercent / 100) * videoRef.current.duration;
      videoRef.current.currentTime = manualTime;
      setProgress(manualPercent);
    }
  };

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if (containerRef.current.webkitRequestFullscreen) {
        containerRef.current.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Formatter for time display
  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "00:00";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    const mm = m < 10 ? `0${m}` : m;
    const ss = s < 10 ? `0${s}` : s;
    if (h > 0) return `${h}:${mm}:${ss}`;
    return `${mm}:${ss}`;
  };

  return (
    <div 
      ref={containerRef}
      style={{
        backgroundColor: "#030504",
        background: "linear-gradient(180deg, #070F0A 0%, #030504 100%)",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        fontFamily: "system-ui, -apple-system, sans-serif",
        color: "#FFFFFF",
        boxSizing: "border-box",
        padding: isFullscreen ? "0" : "24px 6%",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Dynamic Cyber-Noir Header Bar */}
      {!isFullscreen && (
        <div 
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            maxWidth: "1120px",
            marginBottom: "16px",
            zIndex: 10
          }}
        >
          <button 
            onClick={() => navigate("/home")}
            style={{
              background: "none",
              border: "none",
              color: "#2ECC71",
              fontSize: "24px",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            ←
          </button>
          <h1 style={{
            color: "#2ECC71",
            fontSize: "22px",
            fontWeight: "900",
            letterSpacing: "1px",
            margin: 0,
            textShadow: "0px 0px 18px rgba(46, 204, 113, 0.45)"
          }}>
            INFLIX
          </h1>
          <div style={{ width: "24px" }}></div>
        </div>
      )}

      {/* Modern High-Fidelity Video Player Container */}
      <div 
        style={{
          width: "100%",
          maxWidth: isFullscreen ? "100vw" : "1120px",
          height: isFullscreen ? "100vh" : "auto",
          backgroundColor: "#000000",
          border: isFullscreen ? "none" : "1px solid rgba(46, 204, 113, 0.2)",
          borderRadius: isFullscreen ? "0" : "16px",
          overflow: "hidden",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          boxShadow: isFullscreen ? "none" : "0 25px 60px rgba(0, 0, 0, 0.55)",
          aspectRatio: isFullscreen ? "auto" : "16/9"
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          style={{
            width: "100%",
            height: "100%",
            objectFit: isFullscreen ? "contain" : "cover",
            backgroundColor: "#000000"
          }}
          onClick={togglePlay}
        />

        {/* Video Overlay Control Bar */}
        <div 
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            background: "linear-gradient(0deg, #030504 0%, rgba(3, 5, 4, 0.8) 50%, transparent 100%)",
            padding: isFullscreen ? "40px 60px" : "24px 32px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            zIndex: 10,
            opacity: 1,
            transition: "opacity 0.3s"
          }}
        >
          {/* Custom Track Scrubbing Slider */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#8B9E95", fontWeight: "600" }}>
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleProgressChange}
              style={{
                width: "100%",
                height: "5px",
                accentColor: "#2ECC71",
                cursor: "pointer",
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                border: "none",
                borderRadius: "3px",
                outline: "none"
              }}
            />
          </div>

          {/* Action Button Strip */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {/* Play, Rewind, Skip */}
            <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
              <button 
                onClick={togglePlay} 
                style={{
                  background: "none",
                  border: "none",
                  color: "#2ECC71",
                  fontSize: "26px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center"
                }}
              >
                {isPlaying ? "⏸" : "▶"}
              </button>

              <button 
                onClick={() => skipTime(-10)} 
                style={{ background: "none", border: "none", color: "#FFFFFF", fontSize: "18px", cursor: "pointer" }}
                title="Rewind 10 Seconds"
              >
                ↺ <span style={{ fontSize: "11px" }}>10s</span>
              </button>

              <button 
                onClick={() => skipTime(10)} 
                style={{ background: "none", border: "none", color: "#FFFFFF", fontSize: "18px", cursor: "pointer" }}
                title="Skip 10 Seconds"
              >
                ↻ <span style={{ fontSize: "11px" }}>10s</span>
              </button>

              {/* Dynamic Sound slider */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ color: "#8B9E95", fontSize: "16px" }}>
                  {volume === 0 ? "🔇" : "🔊"}
                </span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={handleVolumeChange}
                  style={{
                    width: "80px",
                    height: "4px",
                    accentColor: "#2ECC71",
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    cursor: "pointer",
                    borderRadius: "3px"
                  }}
                />
              </div>
            </div>

            {/* Screen Scaling Button */}
            <button 
              onClick={toggleFullscreen}
              style={{
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: "10px",
                color: "#FFFFFF",
                fontWeight: "600",
                fontSize: "12.5px",
                padding: "8px 16px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                transition: "all 0.2s"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(46, 204, 113, 0.15)";
                e.currentTarget.style.borderColor = "#2ECC71";
                e.currentTarget.style.color = "#2ECC71";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
                e.currentTarget.style.color = "#FFFFFF";
              }}
            >
              {isFullscreen ? "🗗 Minimal Screen" : "🗖 Full Screen"}
            </button>
          </div>
        </div>
      </div>

      {/* Cyber Noir Footer Meta Description */}
      {!isFullscreen && movie && (
        <div style={{ width: "100%", maxWidth: "1120px", marginTop: "24px", zIndex: 5 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
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
              Now Streaming
            </span>
            <span style={{ fontSize: "12px", color: "#6D8177", fontWeight: "500" }}>
              2026 • 1h 42m • Action, Sci-Fi
            </span>
          </div>

          <h2 style={{ fontSize: "32px", fontWeight: "900", color: "#FFFFFF", margin: "0 0 8px 0", letterSpacing: "-1px" }}>
            {movie.title}
          </h2>
          <p style={{ fontSize: "14px", color: "#A8BDB1", margin: 0, maxWidth: "720px", lineHeight: "1.6", fontWeight: "400" }}>
            {movie.description || "In a world where digital reality and physical existence have blurred, a rogue hacker discovers a hidden protocol that could redefine humanity."}
          </p>
        </div>
      )}
    </div>
  );
}