// src/components/PostsIndexClient.js (깔끔한 버전)
'use client';

import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import SimpleChatModal from '@/components/SimpleChatModal';

export default function PostsIndexClient({ categories: initialCategories }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);

  // 간단한 음성 인식 - 자비스 부르면 채팅창만 열기
  useEffect(() => {
    if (typeof window === 'undefined') return

    let recognition
    let isActive = true // 컴포넌트 활성 상태 추적
    
    const startListening = () => {
      if (!isActive) return // 비활성화되면 중단
      
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (!SpeechRecognition) return

      recognition = new SpeechRecognition()
      recognition.continuous = false
      recognition.lang = 'ko-KR'

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase()
        console.log('👂 들었음:', transcript)
        
        if (transcript.includes('자비스') || transcript.includes('jarvis')) {
          console.log('🤖 자비스 호출!')
          setIsVoiceModalOpen(true)
        }
      }

      recognition.onend = () => {
        console.log('🛑 인식 종료')
        // 모달이 열려있지 않고 컴포넌트가 활성화되어 있으면 다시 시작
        if (!isVoiceModalOpen && isActive) {
          setTimeout(() => {
            if (isActive) startListening()
          }, 1000)
        }
      }

      recognition.onerror = (event) => {
        console.log('❌ 에러:', event.error)
        if (event.error !== 'aborted' && isActive) {
          setTimeout(() => {
            if (isActive) startListening()
          }, 2000)
        }
      }

      try {
        recognition.start()
        console.log('🎤 인식 시작')
      } catch (error) {
        console.log('시작 실패:', error)
        if (isActive) {
          setTimeout(() => {
            if (isActive) startListening()
          }, 2000)
        }
      }
    }

    startListening()

    // 클리업 함수
    return () => {
      console.log('🧹 음성 인식 완전 정리')
      isActive = false // 비활성화
      if (recognition) {
        recognition.stop()
        recognition = null
      }
    }
  }, [isVoiceModalOpen])

  // 검색 기능
  useEffect(() => {
    const q = searchTerm.trim().toLowerCase()
    if (!q) {
      setSearchResults([])
      return
    }

    const allPosts = initialCategories.flatMap((cat) =>
      cat.posts.map((p) => ({ ...p, category: cat.category }))
    )
    const filtered = allPosts.filter((p) =>
      p.title.toLowerCase().includes(q)
    )
    setSearchResults(filtered)
  }, [searchTerm, initialCategories])

  // JARVIS 음성 결과 처리
  const handleVoiceResult = (result) => {
    if (result.searchResults && result.searchResults.length > 0) {
      // 검색 결과가 있으면 표시
      const formattedResults = result.searchResults.map(post => ({
        id: post.id,
        title: post.title,
        category: post.category
      }))
      setSearchResults(formattedResults)
      setSearchTerm('')
    }
  }

  return (
    <>
      <main className="min-h-screen bg-black text-white">
        {/* 메인 컨테이너 */}
        <div className="container mx-auto px-8 pt-32">
          
          {/* 큰 검색창 */}
          <div className="flex flex-col items-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
            >
              DOCUMENTATION
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative w-full max-w-2xl"
            >
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder='검색어를 입력하세요... 또는 "Hey JARVIS" 말해보세요'
                className="w-full py-4 px-6 pr-16 text-lg rounded-2xl bg-gray-900/50 border border-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors">
                <Search size={24} />
              </button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-400 mt-4 text-center"
            >
              음성으로 "자비스"를 부르면 AI 어시스턴트가 도와드립니다
            </motion.p>

            {/* 임시 테스트 버튼 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col items-center gap-4"
            >
              <button
                onClick={() => setIsVoiceModalOpen(true)}
                className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-medium transition-colors"
              >
                🤖 JARVIS 호출 (버튼)
              </button>
              
              <div className="text-gray-400 text-sm">
                음성 인식 상태: {isVoiceModalOpen ? '모달 열림' : '대기 중'}
              </div>
            </motion.div>
          </div>

          {/* 결과 영역 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            {/* 검색 결과만 표시 */}
            {searchResults.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-cyan-300">
                  검색 결과 ({searchResults.length}개)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.map((post) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.02 }}
                      className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 hover:border-cyan-500/50 transition-all"
                    >
                      <div className="text-sm text-cyan-400 uppercase mb-2">
                        {post.category}
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-white">
                        {post.title}
                      </h3>
                      <Link
                        href={`/posts/${post.id}`}
                        className="text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center"
                      >
                        문서 보기 →
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* 검색 결과 없음 */}
            {searchResults.length === 0 && searchTerm && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg">
                  "{searchTerm}"에 대한 검색 결과가 없습니다.
                </div>
              </div>
            )}

            {/* 기본 상태 - 검색 안내 */}
            {!searchTerm && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg mb-4">
                  검색어를 입력하거나 "Hey JARVIS"를 불러보세요
                </div>
                <div className="text-gray-500 text-sm">
                  AI 어시스턴트가 문서를 찾아드립니다
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </main>

      {/* 간단한 채팅 모달 */}
      <SimpleChatModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        onResult={handleVoiceResult}
      />
    </>
  );
}