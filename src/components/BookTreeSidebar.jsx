// components/BookTreeSidebar.jsx
'use client';
import React, { useState, useMemo } from "react";

export default function BookTreeSidebar({ categories = [], searchTerm = "" }) {
  const [openCategory, setOpenCategory] = useState(null);

  // 검색어에 따라 자동 오픈/하이라이트
  const highlightInfo = useMemo(() => {
    if (!searchTerm) return { open: null, highlightPostId: null };
    const lower = searchTerm.toLowerCase();
    for (const cat of categories) {
      for (const post of cat.posts) {
        if (post.title.toLowerCase().includes(lower)) {
          return { open: cat.category, highlightPostId: post.id };
        }
      }
    }
    return { open: null, highlightPostId: null };
  }, [searchTerm, categories]);

  const actuallyOpen = highlightInfo.open ?? openCategory;

  return (
    <aside className="w-80 min-w-[240px] max-w-xs h-full bg-transparent ml-4 px-5 py-8  select-none">
      
      <div className="space-y-2">
        {categories.map(cat => (
          <div key={cat.category}>
            <button
              className={`
                font-semibold py-1 px-2 rounded w-full text-left
                ${
                  actuallyOpen === cat.category
                    ? "bg-cyan-400/20 text-cyan-200 shadow-[0_0_10px_2px_rgba(34,211,238,0.3)] ring-1 ring-cyan-400/50"
                    : "hover:bg-cyan-400/10 hover:text-cyan-200"
                }
                transition
              `}
              onClick={() => setOpenCategory(cat.category)}
              type="button"
            >
              {cat.category}
            </button>
            <div className={`tree-children ${actuallyOpen === cat.category ? 'open' : ''} pl-4`}>
              {cat.posts.map(post => (
                <div
                key={post.id}
                className={`
                  py-1 px-2 rounded
                  ${
                    highlightInfo.highlightPostId === post.id
                      ? "bg-cyan-300/20 text-cyan-200 font-semibold shadow-[0_0_8px_0_rgba(34,211,238,0.13)] border border-cyan-200/30"
                      : "hover:bg-cyan-400/10 hover:text-cyan-200"
                  }
                  transition
                `}
              >
                {post.title}
              </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        .tree-children {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.35s cubic-bezier(.4,0,.2,1);
        }
        .tree-children.open {
          max-height: 350px;
        }
      `}</style>
    </aside>
  );
}