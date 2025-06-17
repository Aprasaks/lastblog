"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TypingEffect from './TypingEffect'

export default function JarvisDocsPage() {
  const [messages, setMessages] = useState([
    { 
      type: 'jarvis', 
      text: 'Hello! I am JARVIS, your documentation assistant. How may I help you today?',
      timestamp: Date.now()
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [searchResults, setSearchResults] = useState([])

  // 실제 AI 채팅 함수
  const handleSearch = async (query) => {
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: query }),
      })

      const data = await response.json()
      
      // AI 응답 추가
      const aiMessage = {
        type: 'jarvis',
        text: data.response,
        timestamp: Date.now()
      }
      setMessages(prev => [...prev, aiMessage])
      
      // 검색 결과 업데이트
      if (data.searchResults && data.searchResults.length > 0) {
        const formattedResults = data.searchResults.map(post => ({
          id: post.id,
          title: post.title,
          category: post.category,
          preview: post.content.slice(0, 150) + '...'
        }))
        setSearchResults(formattedResults)
      } else {
        setSearchResults([])
      }
      
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage = {
        type: 'jarvis',
        text: '죄송합니다. 현재 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
        timestamp: Date.now()
      }
      setMessages(prev => [...prev, errorMessage])
    }
    
    setIsLoading(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    // 사용자 메시지 추가
    const userMessage = {
      type: 'user',
      text: input,
      timestamp: Date.now()
    }
    setMessages(prev => [...prev, userMessage])
    
    // 검색 실행
    handleSearch(input)
    setInput('')
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* 왼쪽: 검색 결과 영역 */}
      <div className="flex-1 p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            DOCUMENTATION ARCHIVE
          </h1>

          {/* 검색 결과 */}
          <AnimatePresence>
            {searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-4"
              >
                {searchResults.map((result, index) => (
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-blue-500/30 rounded-lg p-6 hover:border-cyan-400/50 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-cyan-300">{result.title}</h3>
                      <span className="text-xs text-blue-400 bg-blue-900/40 px-2 py-1 rounded">
                        {result.category}
                      </span>
                    </div>
                    <p className="text-gray-300">{result.preview}</p>
                    <div className="mt-4">
                      <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium">
                        Access Document →
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* 로딩 상태 */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-16"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-2 border-blue-500 border-t-transparent rounded-full mb-4"
              />
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-cyan-400"
              >
                JARVIS is analyzing your request...
              </motion.p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* 오른쪽: JARVIS 채팅창 */}
      <div className="w-96 bg-gradient-to-b from-gray-900 to-black border-l border-blue-500/30">
        <motion.div
          initial={{ x: 400 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
          className="h-full flex flex-col"
        >
          {/* 헤더 */}
          <div className="p-4 border-b border-blue-500/30">
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-3 h-3 bg-cyan-400 rounded-full"
              />
              <h2 className="text-xl font-bold text-cyan-300">J.A.R.V.I.S</h2>
            </div>
            <p className="text-xs text-gray-400 mt-1">Documentation Assistant</p>
          </div>

          {/* 메시지 영역 */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 border border-cyan-500/30 text-cyan-100'
                  }`}
                >
                  {message.type === 'jarvis' ? (
                    <div className="text-sm">
                      <TypingEffect 
                        text={message.text} 
                        speed={30}
                        onComplete={() => console.log('Typing complete!')}
                      />
                    </div>
                  ) : (
                    <p className="text-sm">{message.text}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* 입력 영역 */}
          <div className="p-4 border-t border-blue-500/30">
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask JARVIS anything..."
                className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
                disabled={isLoading}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isLoading}
                className="bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-600 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Send
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}