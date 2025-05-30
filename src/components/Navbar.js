import { Github } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  // 메뉴 라벨과 경로 매핑
  const NAVS = [
    { label: "POST", href: "/post" },
    { label: "PROJECT", href: "/project" },
    { label: "ERROR", href: "/error" },
  ];

  return (
    <header className="flex items-center justify-between  mt-2 py-4 px-20 z-50 font-maplestory">
      {/* 왼쪽: 로고 */}
      <Link href="https://demian.dev">
      <h1
        className="text-3xl font-light text-gray-100"
        data-aos="fade-down"
        data-aos-duration="1500"
      >
        DEMIAN
      </h1>
      </Link>

      {/* 가운데: 메뉴 + 깃허브 */}
      <nav className="flex gap-12 items-center mx-auto">
        {NAVS.map((nav, i) => (
          <Link
            key={nav.label}
            href={nav.href}
            className="text-base tracking-wider hover:text-gray-400 transition-colors"
            data-aos="fade-down"
            data-aos-duration={1500 + i * 500}
          >
            {nav.label}
          </Link>
        ))}
        <a
          href="https://github.com/Aprasaks"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="rounded-full text-white px-2 py-2 hover:bg-white hover:text-black transition flex items-center justify-center"
          data-aos="fade-down"
          data-aos-duration="3000"
        >
          <Github className="w-6 h-6" />
        </a>
      </nav>

      {/* 오른쪽: 빈 div로 양쪽 여백 균형 맞춤 */}
      <div className="w-40" /> 
    </header>
  );
}