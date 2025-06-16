"use client"

import dynamic from "next/dynamic"
import { FaGithub, FaInstagram } from "react-icons/fa";
import { useEffect } from "react";

const SplineViewer = dynamic(
  () => import("../../components/SplineViewer"),
  { ssr: false }
)

export default function About() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="h-screen overflow-hidden">
      <SplineViewer url="https://prod.spline.design/tZM9wsV-jktMKeMb/scene.splinecode" />
      
      {/* 메인 페이지와 같은 구조로 변경 */}
      <main className="flex flex-col justify-start min-h-[90vh] pt-32">
        <div className="ml-16">
          <section className="text-left">
            <div className="space-y-6">
            <p className="text-2xl md:text-3xl text-gray-200 font-semibold max-w-xl drop-shadow leading-relaxed">
                Breaking out of the &quot;Hello World&quot; shell <br /><br />
                into a limitless open platform world <br /><br />
                where code and community collide.
              </p><br /><br />
              <div className="flex items-center gap-6 mt-6">
                <a href="https://github.com/Aprasaks" target="_blank" rel="noopener noreferrer">
                  <FaGithub size={34} className="text-white hover:text-gray-400 transition" />
                </a>
                <a href="https://instagram.com/aprasaks30" target="_blank" rel="noopener noreferrer">
                  <FaInstagram size={34} className="text-white hover:text-pink-400 transition" />
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}