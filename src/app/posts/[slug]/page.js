// src/app/posts/[slug]/page.js

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import MarkdownViewer from '@/components/MarkdownViewer';

// 꼭 async! 그리고 { params } 구조분해!
export default async function PostDetailPage({ params }) {
  // params.slug로 접근
  const { slug } = params;
  const filePath = path.join(process.cwd(), "src", "posts", `${slug}.md`);
  const source = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(source);

  return (
    <main className="min-h-screen w-full text-white ">
      <div className="p-8 max-w-3xl mx-auto">
        <MarkdownViewer source={content} />
      </div>
    </main>
  );
}