// src/app/layout.js
"use client"

import "./globals.css"
import { useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"
import Navbar from"../components/Navbar";

export default function RootLayout({ children }) {
  // ← 반드시 중괄호 블록으로! 아무것도 리턴하지 않게
  useEffect(() => {
    AOS.init({ once: true })
  }, [])

  return (
    <html lang="en">
      <body className="relative  px-8 bg-black text-gray-200 overflow-x-hidden">
      <div className="image-gradient absolute top-0 right-0 -z-10">
         
      </div>
        <div className="layer-blur mt-4" />
        <Navbar/>
        {children}
      </body>
    </html>
  )
}