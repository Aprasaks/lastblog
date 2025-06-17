// src/components/NewDocsPage.js
"use client"

import { useState, useEffect, useRef } from 'react'
import { Search } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import VoiceJarvisModal from './VoiceJarvisModal'

export default function NewDocsPage({ categories: initialCategories }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false)
  const [jarvisResponse, setJarvisResponse] = useState('')
  const [showAllCategories, setShowAllCategories] = useState(true)
  const searchBoxRef = useRef(null)

  // 음성 인식 감지
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)()
      recognition.continuous = true
      recognition.lang = 'ko-KR'

      recognition.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase()
        
        if (transcript.includes('자비스') || transcript.includes('jarvis')) {
          setIsVoiceModalOpen(true)
        }
      }

      recognition.start()

      return () => recognition.stop()
    }
  }, [])

  // 검색 기능
  useEffect(() => {
    const q = searchTerm.trim().toLowerCase()
    if (!q) {
      setSearchResults([])
      setShowAllCategories(true)
      return
    }

    const allPosts = initialCategories.flatMap((cat) =>
      cat.posts.map((p) => ({ ...p, category: cat.category }))
    )
    const filtered = allPosts.filter((p) =>
      p.title.toLowerCase().includes(q)
    )
    setSearchResults(filtered)
    setShowAllCategories(false)
  }, [searchTerm, initialCategories])

  // JARVIS 음성 명령 처리
  const handleVoiceResult = (result) => {
    setJarvisResponse(result.response)
    
    // "전체 목록" 또는 "모든 문서" 요청 시
    if (result.command.includes('전체') || result.command.includes('목록') || result.command.includes('모든')) {
      setShowAllCategories(true)
      setSearchTerm('')
      setSearchResults([])
    } else if (result.searchResults && result.searchResults.length > 0) {
      // 검색 결과가 있으면 표시
      setSearchResults(result.searchResults)
      setShowAllCategories(false)
      setSearchTerm('')
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
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
              ref={searchBoxRef}
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
            음성으로 자비스를 부르면 AI 어시스턴트가 도와드립니다
          </motion.p>
        </div>

        {/* JARVIS 응답 표시 */}
        {jarvisResponse && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-6 mb-8 max-w-4xl mx-auto"
          >
            <div className="flex items-center mb-3">
              <div className="w-3 h-3 bg-cyan-400 rounded-full mr-3"></div>
              <span className="text-cyan-300 font-medium">JARVIS</span>
            </div>
            <p className="text-gray-200">{jarvisResponse}</p>
          </motion.div>
        )}

        {/* 결과 영역 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* 검색 결과 */}
          {!showAllCategories && searchResults.length > 0 && (
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

          {/* 전체 카테고리 목록 */}
          {showAllCategories && (
            <div className="space-y-12">
              {initialCategories.map((category, index) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h2 className="text-3xl font-bold mb-6 text-cyan-300">
                    {category.category}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.posts.map((post) => (
                      <motion.div
                        key={post.id}
                        whileHover={{ scale: 1.02 }}
                        className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 hover:border-cyan-500/50 transition-all"
                      >
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
                </motion.div>
              ))}
            </div>
          )}

          {/* 검색 결과 없음 */}
          {!showAllCategories && searchResults.length === 0 && searchTerm && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg">
                {searchTerm}에 대한 검색 결과가 없습니다.
              </div>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setShowAllCategories(true)
                }}
                className="mt-4 text-cyan-400 hover:text-cyan-300 font-medium"
              >
                전체 문서 보기
              </button>
            </div>
          )}
        </motion.div>
      </div>

      {/* 음성 JARVIS 모달 */}
      <VoiceJarvisModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        onResult={handleVoiceResult}
      />
    </div>
  )
}