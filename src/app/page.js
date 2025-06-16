// src/app/page.js
"use client"

import Script from "next/script"
import dynamic from "next/dynamic"
import { useEffect } from "react"

const SplineViewer = dynamic(
  () => import("../components/SplineViewer"),
  { ssr: false }
)

export default function HomePage() {
  

  // 메인 페이지에서만 body 스크롤 숨기기
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    // 컴포넌트 언마운트될 때 다시 원복
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="h-screen overflow-hidden"> 
      <SplineViewer url="https://prod.spline.design/1R-Re4QqI1zUkFxz/scene.splinecode"/>
    

          <main className="flex flex-col justify-center min-h-[90vh]">
      <div
        className="w-full px-10 z-50" // max-w 제거하고 w-full로 변경
        data-aos="fade-zoom-in"
        data-aos-easing="ease-in-back"
        data-aos-delay="300"
        data-aos-offset="0"
        data-aos-duration="1000"
      >
        {/* 3개 버튼을 화면 전체에 균등 분배 */}
        <div className="flex justify-between items-center"> {/* justify-between으로 변경 */}
          
          {/* Frontend Developer - 보라/파랑 계열 */}
        <div className="relative w-72 h-10 rounded-full overflow-hidden
                        bg-[length:200%_auto]
                        bg-[linear-gradient(to_right,#4f46e5,#7c3aed,#a855f7,#c084fc,#4f46e5)]
                        animate-gradient
                        shadow-[0_0_15px_rgba(139,92,246,0.4)]">
          <div className="absolute inset-1 bg-black rounded-full flex items-center justify-center transition-colors hover:text-[#a855f7]">
            Frontend Developer
          </div>
        </div>

        {/* Backend Developer - 초록/청록 계열 */}
        <div className="relative w-72 h-10 rounded-full overflow-hidden
                        bg-[length:200%_auto]
                        bg-[linear-gradient(to_right,#059669,#10b981,#34d399,#6ee7b7,#059669)]
                        animate-gradient
                        shadow-[0_0_15px_rgba(16,185,129,0.4)]">
          <div className="absolute inset-1 bg-black rounded-full flex items-center justify-center transition-colors hover:text-[#10b981]">
            Backend Developer
          </div>
        </div>

        {/* FullStack Developer - 주황/빨강 계열 */}
        <div className="relative w-72 h-10 rounded-full overflow-hidden
                        bg-[length:200%_auto]
                        bg-[linear-gradient(to_right,#dc2626,#f97316,#fbbf24,#f59e0b,#dc2626)]
                        animate-gradient
                        shadow-[0_0_15px_rgba(249,115,22,0.4)]">
          <div className="absolute inset-1 bg-black rounded-full flex items-center justify-center transition-colors hover:text-[#f97316]">
            FullStack Developer
          </div>
        </div>

        </div>
      </div>
    </main>

          

    </div>
  )
}