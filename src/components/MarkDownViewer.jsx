// src/components/MarkdownViewer.jsx
'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
// 하이라이트 CSS 예시 (원하면 스타일 입혀도 됨)
import 'highlight.js/styles/github-dark.css';

export default function MarkdownViewer({ source }) {
  return (
    <article className="prose prose-invert max-w-none leading-relaxed text-lg">
      <ReactMarkdown
        children={source}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
      />
    </article>
  );
};