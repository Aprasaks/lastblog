// src/app/posts/[category]/page.js
"use client";

import { useParams } from "next/navigation";
import Script from "next/script"
import dynamic from "next/dynamic"


const SplineViewer = dynamic(
  () => import("../../../components/SplineViewer"),
  { ssr: false }
)

export default function PostCategoryPage() {
  const { category } = useParams();

  return (
    <>
    <div className="p-12">
      
    </div>
  
    <SplineViewer
  url="https://prod.spline.design/eu2uMpSZBa8xnMYO/scene.splinecode"
  className="pointer-events-none fixed right-8 bottom-8 w-80 h-80 scale-80 origin-bottom-right"
  
/>
</>
  );
};
