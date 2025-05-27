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
      <h2 className="text-4xl font-bold mb-8">
        {category.toUpperCase()} 카테고리
      </h2>
      {/* 이 아래에 category 값에 따라 글 리스트 등 표시 */}
      <p>여기서 {category} 카테고리의 게시물을 보여줄 수 있어요!</p>
    </div>
  
    <SplineViewer
  url="https://prod.spline.design/eu2uMpSZBa8xnMYO/scene.splinecode"
  className="pointer-events-none fixed right-8 bottom-8 w-80 h-80 scale-80 origin-bottom-right"
  
/>
</>
  );
};
