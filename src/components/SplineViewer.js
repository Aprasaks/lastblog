// src/app/components/SplineViewer.js
"use client"
import "@splinetool/viewer"

export default function SplineViewer({ url, className = "" }) {
  return (
    <spline-viewer
      url={url}
      className={className}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
      }}
      
    />
  );
}