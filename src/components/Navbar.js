// src/components/Navbar.js
import Link from "next/link";

export default function Navbar() {
  // 메뉴 라벨과 경로 매핑
  const NAVS = [
    { label: "DOCS", href: "/post" },
    { label: "LEARN", href: "/learn" },
    { label: "PROJECT", href: "/project" },
    { label: "ABOUT", href: "/about" },
  ];

  // 공부 일수 계산
  const START_DATE = new Date("2025-02-27");
  const today = new Date();
  const diff = today - START_DATE;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;

  return (
    <header className="flex items-center justify-between mt-2 py-4 px-20 z-50 font-maplestory">
      {/* 왼쪽: 로고 */}
      <Link href="/">
        <h1 className="text-3xl font-light text-gray-100">
          DEMIAN
        </h1>
      </Link>

      {/* 가운데: 메뉴 */}
      <nav className="flex gap-12 items-center mx-auto">
        {NAVS.map((nav, i) => (
          <Link
            key={nav.label}
            href={nav.href}
            className="text-base tracking-wider hover:text-gray-400 transition-colors"
          >
            {nav.label}
          </Link>
        ))}
      </nav>

      {/* 오른쪽: 공부 일수 */}
      <div className="text-right">
        <p className="text-sm text-gray-400">
          오늘로 {days}일째 공부중
        </p>
      </div>
    </header>
  );
}