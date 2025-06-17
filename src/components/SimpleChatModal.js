// src/components/SimpleChatModal.js
"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send } from 'lucide-react'

export default function SimpleChatModal({ isOpen, onClose, onResult }) {
  const [messages, setMessages] = useState([
    { 
      type: 'jarvis', 
      text: '안녕하세요 주인님! 무엇을 도와드릴까요?',
      timestamp: Date.now()
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = {
      type: 'user',
      text: input,
      timestamp: Date.now()
    }
    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      })

      const data = await response.json()
      
      const aiMessage = {
        type: 'jarvis',
        text: data.response,
        timestamp: Date.now()
      }
      setMessages(prev => [...prev, aiMessage])
      
      // 검색 결과가 있으면 부모에게 전달
      if (data.searchResults && data.searchResults.length > 0) {
        onResult({
          command: input,
          response: data.response,
          searchResults: data.searchResults
        })
      }
      
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage = {
        type: 'jarvis',
        text: '죄송합니다. 오류가 발생했습니다.',
        timestamp: Date.now()
      }
      setMessages(prev => [...prev, errorMessage])
    }
    
    setInput('')
    setIsLoading(false)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* 백드롭 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* 모달 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative bg-gray-900/90 backdrop-blur-lg border border-cyan-500/30 rounded-xl w-96 h-96 flex flex-col"
        >
          {/* 헤더 */}
          <div className="flex items-center justify-between p-4 border-b border-cyan-500/30">
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-3 h-3 bg-cyan-400 rounded-full"
              />
              <h2 className="text-xl font-bold text-cyan-300">J.A.R.V.I.S</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* 채팅 영역 */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg text-sm ${
                    message.type === 'user'
                      ? 'bg-cyan-600 text-white'
                      : 'bg-gray-800 border border-cyan-500/30 text-cyan-100'
                  }`}
                >
                  {message.text}
                </div>
              </motion.div>
            ))}
            
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-gray-800 border border-cyan-500/30 rounded-lg p-3 text-sm text-cyan-100">
                  <div className="flex space-x-1">
                    {[0, 1, 2].map(i => (
                      <motion.div
                        key={i}
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: i * 0.2
                        }}
                        className="w-2 h-2 bg-cyan-400 rounded-full"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* 입력 영역 */}
          <div className="p-4 border-t border-cyan-500/30">
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="메시지를 입력하세요..."
                className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 text-sm"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-600 px-3 py-2 rounded-lg transition-colors"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}