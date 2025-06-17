// src/components/TypingEffect.js
"use client"

import { useState, useEffect } from 'react'

export default function TypingEffect({ text, speed = 50, onComplete }) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    if (text && currentIndex < text.length) {
      setIsTyping(true)
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)

      return () => clearTimeout(timer)
    } else if (currentIndex >= text.length && text) {
      setIsTyping(false)
      onComplete && onComplete()
    }
  }, [text, currentIndex, speed, onComplete])

  // 텍스트가 바뀌면 리셋
  useEffect(() => {
    setDisplayText('')
    setCurrentIndex(0)
  }, [text])

  return (
    <span className="inline-block">
      {displayText}
      {isTyping && (
        <span className="inline-block w-2 h-5 bg-cyan-400 ml-1 animate-pulse">
          |
        </span>
      )}
    </span>
  )
}