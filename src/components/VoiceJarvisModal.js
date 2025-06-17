// src/components/VoiceJarvisModal.js
"use client"

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mic, MicOff } from 'lucide-react'

export default function VoiceJarvisModal({ isOpen, onClose, onResult }) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const recognitionRef = useRef(null)

  useEffect(() => {
    // 음성 인식 설정
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = false
        recognitionRef.current.lang = 'ko-KR'
        recognitionRef.current.interimResults = true

        recognitionRef.current.onstart = () => {
          setIsListening(true)
        }

        recognitionRef.current.onresult = (event) => {
          const current = event.resultIndex
          const transcriptText = event.results[current][0].transcript
          setTranscript(transcriptText)

          if (event.results[current].isFinal) {
            setIsListening(false)
            setIsProcessing(true)
            // AI 처리
            handleVoiceCommand(transcriptText)
          }
        }

        recognitionRef.current.onerror = (event) => {
          console.error('Speech recognition error:', event.error)
          setIsListening(false)
          setIsProcessing(false)
        }

        recognitionRef.current.onend = () => {
          setIsListening(false)
        }
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      setTranscript('')
      setIsProcessing(false)
      startListening()
    }
  }, [isOpen])

  const startListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start()
      } catch (error) {
        console.error('Error starting recognition:', error)
      }
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
    setIsListening(false)
  }

  const handleVoiceCommand = useCallback(async (command) => {
    try {
      // AI API 호출
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: command }),
      })

      const data = await response.json()
      
      // 결과를 부모 컴포넌트로 전달
      onResult({
        command,
        response: data.response,
        searchResults: data.searchResults || []
      })

      // 모달 닫기
      setTimeout(() => {
        onClose()
      }, 1000)

    } catch (error) {
      console.error('Error processing voice command:', error)
      setIsProcessing(false)
    }
  }, [onResult, onClose])

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
          className="relative bg-gray-900/90 backdrop-blur-lg border border-cyan-500/30 rounded-xl p-8 min-w-96 max-w-md"
        >
          {/* 닫기 버튼 */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>

          {/* 헤더 */}
          <div className="text-center mb-6">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-4 h-4 bg-cyan-400 rounded-full mx-auto mb-3"
            />
            <h2 className="text-2xl font-bold text-cyan-300 mb-2">J.A.R.V.I.S</h2>
            <p className="text-sm text-gray-400">AI Documentation Assistant</p>
          </div>

          {/* 상태 표시 */}
          <div className="text-center mb-6">
            {isListening && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-4xl mb-3"
                >
                  🎤
                </motion.div>
                <p className="text-cyan-300 font-medium">듣고 있습니다...</p>
                <div className="mt-3 flex space-x-1">
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      animate={{ height: [10, 25, 10] }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                      className="w-1 bg-cyan-400 rounded-full"
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {isProcessing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full mb-3"
                />
                <p className="text-cyan-300 font-medium">처리 중...</p>
              </motion.div>
            )}

            {!isListening && !isProcessing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center"
              >
                <div className="text-4xl mb-3">🤖</div>
                <p className="text-gray-400">음성 인식을 시작합니다</p>
                <button
                  onClick={startListening}
                  className="mt-4 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-medium transition-colors"
                >
                  다시 시작
                </button>
              </motion.div>
            )}
          </div>

          {/* 인식된 텍스트 */}
          {transcript && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800/50 rounded-lg p-3 mb-4"
            >
              <p className="text-sm text-gray-300 mb-1">인식된 음성:</p>
              <p className="text-white">{transcript}</p>
            </motion.div>
          )}

          {/* 컨트롤 버튼 */}
          <div className="flex justify-center space-x-3">
            {isListening ? (
              <button
                onClick={stopListening}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg font-medium transition-colors"
              >
                <MicOff size={16} />
                <span>중지</span>
              </button>
            ) : (
              !isProcessing && (
                <button
                  onClick={startListening}
                  className="flex items-center space-x-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-medium transition-colors"
                >
                  <Mic size={16} />
                  <span>음성 인식</span>
                </button>
              )
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}