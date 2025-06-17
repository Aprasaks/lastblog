// src/app/api/chat/route.js
import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// 내 포스트들 가져오기
function getMyPosts() {
  try {
    const postsDir = path.join(process.cwd(), 'src', 'posts')
    const filenames = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'))
    
    return filenames.map(filename => {
      const filePath = path.join(postsDir, filename)
      const source = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(source)
      
      return {
        id: filename.replace(/\.md$/, ''),
        title: data.title || filename.replace(/\.md$/, ''),
        category: data.category || '기타',
        content: content.slice(0, 1000) // 처음 1000자만
      }
    })
  } catch (error) {
    console.error('Error reading posts:', error)
    return []
  }
}

export async function POST(request) {
  try {
    const { message } = await request.json()
    
    // 내 포스트들 가져오기
    const myPosts = getMyPosts()
    
    // 시스템 프롬프트 생성
    const systemPrompt = `당신은 DEMIAN의 개인 블로그 AI 어시스턴트 JARVIS입니다.

규칙:
1. 오직 아래 제공된 문서들에서만 정보를 찾아 답변하세요
2. 제공되지 않은 정보는 "죄송하지만 제 문서에서 관련 내용을 찾을 수 없습니다"라고 답변하세요
3. 친근하고 도움이 되는 톤으로 답변하세요
4. 답변할 때 어느 문서에서 찾은 정보인지 언급해주세요
5. 간단한 인사나 일상 대화는 자연스럽게 응답하세요

사용 가능한 DEMIAN의 문서들:
${myPosts.map(post => `
제목: ${post.title}
카테고리: ${post.category}
내용: ${post.content}
---`).join('\n')}

답변 예시:
- "제가 작성한 '${myPosts[0]?.title || 'React 가이드'}' 문서에 따르면..."
- "DEMIAN의 ${myPosts[0]?.category || 'JavaScript'} 문서에서..."
`

    // OpenAI API 호출
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      max_tokens: 500,
      temperature: 0.7,
    })

    const aiResponse = completion.choices[0].message.content

    // 검색된 포스트들 찾기 (키워드 기반)
    const searchResults = myPosts.filter(post => 
      message.toLowerCase().split(' ').some(word => 
        post.title.toLowerCase().includes(word) || 
        post.content.toLowerCase().includes(word) ||
        post.category.toLowerCase().includes(word)
      )
    ).slice(0, 3) // 최대 3개만

    return NextResponse.json({ 
      response: aiResponse,
      searchResults: searchResults
    })

  } catch (error) {
    console.error('OpenAI API Error:', error)
    
    // 에러 시 기본 응답
    const fallbackResponse = "죄송합니다. 현재 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요."
    
    return NextResponse.json({ 
      response: fallbackResponse,
      searchResults: []
    })
  }
}