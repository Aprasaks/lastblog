// src/app/page.js
"use client"

import Script from "next/script"
import dynamic from "next/dynamic"

const SplineViewer = dynamic(
  () => import("../components/SplineViewer"),
  { ssr: false }
)

export default function HomePage() {
  const START_DATE = new Date("2025-02-27");
  const today = new Date();
  const diff = today - START_DATE;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;

  return (
    <div className =" pointer-events-none"> 
    

      <main className="flex flex-col justify-center min-h-[90vh]">
        <div
          className="max-w-[40rem] ml-10 space-y-6 z-50"
          data-aos="fade-zoom-in"
          data-aos-easing="ease-in-back"
          data-aos-delay="300"
          data-aos-offset="0"
          data-aos-duration="1500"
        >
          <div className="relative w-72 h-10 rounded-full overflow-hidden
                          bg-[length:200%_auto]
                          bg-[linear-gradient(to_right,#656565,#7f42a7,#6600c5,#5300a0,#757575,#656565)]
                          animate-gradient
                          shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            <div className="absolute inset-1 bg-black rounded-full flex items-center justify-center transition-colors hover:text-[#5300a0]">
              Frontend Developer
            </div>
          </div>

          <h2
            className="text-6xl font-semibold leading-tight text-white"
            data-aos="fade-zoom-in"
            data-aos-easing="ease-in-back"
            data-aos-delay="300"
            data-aos-duration="2500"
          >
            24Hours Studying
            
          </h2>
          <p
            className="text-lg text-gray-400 max-w-[35rem]"
            data-aos="fade-zoom-in"
            data-aos-easing="ease-in-back"
            data-aos-delay="300"
            data-aos-duration="2500"
          >
            오늘로 {days}일째 공부중입니다.
          </p>
          
        </div>
      </main>

      <SplineViewer url="https://prod.spline.design/LhHn-IAeBtDJN3SY/scene.splinecode" className="absolute top-0 right-[-20%]" />
    </div>
  )
}
