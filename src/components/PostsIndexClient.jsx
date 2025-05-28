'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import BookTreeSidebar from '@/components/BookTreeSidebar';
import Link from 'next/link';
import dynamic from "next/dynamic";

const SplineViewer = dynamic(
    () => import("./SplineViewer"),
    { ssr: false }
  );

export default function PostsIndexClient({ categories: initialCategories }) {
  const [term, setTerm] = useState('');
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const totalPages = Math.ceil(results.length / pageSize);
  const pagedResults = results.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const searchBoxRef = useRef(null);

  useEffect(() => {
    const q = term.trim().toLowerCase();
    if (!q) {
      setResults([]);
      setSearched(false);
      return;
    }
    setLoading(true);
    const allPosts = initialCategories.flatMap((cat) =>
      cat.posts.map((p) => ({ ...p, category: cat.category }))
    );
    const filtered = allPosts.filter((p) =>
      p.title.toLowerCase().includes(q)
    );
    setResults(filtered);
    setSearched(true);
    setLoading(false);
    setCurrentPage(1);
  }, [term, initialCategories]);

  return (
    <>
    <main className="relative min-h-screen  text-white overflow-hidden">
      {/* 레이아웃 */}
      <div className="relative flex flex-row min-h-screen w-full pt-32">
        {/* 사이드바 (카테고리) */}
        <div className="w-64 p-6 ">
          <BookTreeSidebar categories={initialCategories} searchTerm={term} />
        </div>
        {/* 메인: 검색창 + 검색결과 */}
        <div className="flex-1 flex flex-col items-center px-8 pt-16">
          <form
            ref={searchBoxRef}
            className="relative w-full max-w-xl mb-10"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="검색어를 입력하세요"
              className="w-full py-3 pl-4 pr-12 rounded-full bg-white/10 placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-white/40 transition"
            />
            <button
              type="submit"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white opacity-80 hover:opacity-100"
            >
              <Search size={20} />
            </button>
          </form>

          {/* 검색결과 */}
          {searched && !loading && results.length > 0 && (
            <div className="w-full flex flex-col items-center mb-6">
              <div className="flex items-center justify-between w-full max-w-xl mb-4">
                <div className="text-sm text-gray-400">
                  {currentPage} / {totalPages}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage((c) => Math.max(c - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-2 py-1 bg-white/20 rounded disabled:opacity-50"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => setCurrentPage((c) => Math.min(c + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-2 py-1 bg-white/20 rounded disabled:opacity-50"
                  >
                    →
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl">
                {pagedResults.map((item) => (
                  <Link
                    key={item.id}
                    href={`/posts/${item.id}`}
                    className="block p-4 bg-zinc-800/80 hover:bg-zinc-700 rounded-lg transition"
                  >
                    <div className="text-sm text-cyan-300 uppercase">
                      {item.category}
                    </div>
                    <h3 className="mt-1 text-lg font-bold">{item.title}</h3>
                  </Link>
                ))}
              </div>
            </div>
          )}
          {!searched && <div className="text-gray-400">검색어를 입력해 주세요.</div>}
          {searched && !loading && results.length === 0 && (
            <div className="text-gray-400">검색 결과가 없습니다.</div>
          )}
          {loading && <div className="text-gray-400">검색 중…</div>}
        </div>
      </div>
    </main>
     <SplineViewer
     url="https://prod.spline.design/eu2uMpSZBa8xnMYO/scene.splinecode"
     className="pointer-events-none fixed right-8 bottom-8 w-80 h-80 origin-bottom-right"
   />
   </>
  );
}
