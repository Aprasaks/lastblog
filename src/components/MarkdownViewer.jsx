// src/components/MarkdownViewer.jsx
'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/monokai-sublime.css';

export default function MarkdownViewer({ source }) {
  return (
    <article className="prose prose-invert max-w-none leading-relaxed text-lg ">
      <ReactMarkdown
        children={source}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
        }}
      />
    </article>
  );
};