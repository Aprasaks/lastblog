// src/app/components/SplineViewer.js
"use client"
import "@splinetool/viewer"

export default function SplineViewer({ url, className = "" }) {
  return (
    <spline-viewer
      url={url}
      className={className}
      data-aos="fade-zoom-in"
      data-aos-easing="ease-in-back"
      data-aos-delay="300"
      data-aos-offset="0"
      data-aos-duration="1500"
    />
  );
}