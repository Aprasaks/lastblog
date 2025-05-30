// src/app/[category]/page.js

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import PostsIndexClient from '@/components/PostsIndexClient';

export default async function PostsIndexPage({ params }) {
  const { category } = params;

  const postsDir = path.join(process.cwd(), 'src', 'posts');
  const filenames = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

  const posts = filenames.map(filename => {
    const filePath = path.join(postsDir, filename);
    const source = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(source);

    return {
      id: filename.replace(/\.md$/, ''),
      title: data.title || filename.replace(/\.md$/, ''),
      category: data.category || '기타',
      tag: data.tag,
    };
  });

  // tag가 배열/문자열 모두 지원 & 대소문자 무시 비교
  const filtered = posts.filter(post => {
    if (!post.tag) return false;
    if (Array.isArray(post.tag)) {
      return post.tag.map(t => t.toLowerCase()).includes(category.toLowerCase());
    }
    return (post.tag || '').toLowerCase() === category.toLowerCase();
  });

  // 카테고리별로 묶기
  const byCategory = {};
  filtered.forEach(post => {
    if (!byCategory[post.category]) byCategory[post.category] = [];
    byCategory[post.category].push(post);
  });
  const categories = Object.entries(byCategory).map(([category, posts]) => ({
    category,
    posts,
  }));

  return <PostsIndexClient categories={categories} />;
}