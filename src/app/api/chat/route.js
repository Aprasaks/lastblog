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
1. 답변은 2-3줄 이내로 간단하게 하세요
2. 기술 관련 질문: 문서가 있으면 "제목이 'XXX'인 포스트가 있습니다" 형식으로 답변
3. 일상 대화: 친근하게 자연스럽게 대화하세요
4. 문서에 없는 기술 질문: "관련 문서를 찾을 수 없습니다"

사용 가능한 DEMIAN의 문서들:
${myPosts.map(post => `제목: ${post.title}, 카테고리: ${post.category}`).join('\n')}

답변 예시:
- 기술: "map에 관한 '비동기 함수' 문서가 있습니다"
- 일상: "점심은 김치찌개 어떠세요? 따뜻하고 맛있어요!"
- 일상: "모든 분들이 각자의 매력이 있어서 비교하기 어려워요 😊"
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