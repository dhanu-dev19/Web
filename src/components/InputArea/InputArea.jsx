import React, { useState, useRef, useContext } from 'react'
import FeatureButtons from './FeatureButtons.jsx'
import { ChatContext } from '../../context/ChatContext.jsx'

const InputArea = () => {
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const textareaRef = useRef(null)
  const { addMessage, processMessage } = useContext(ChatContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!inputText.trim() || isLoading) return

    const userMessage = {
      role: 'user',
      content: inputText.trim()
    }

    addMessage(userMessage)
    setInputText('')
    setIsLoading(true)

    try {
      const agentResponse = await processMessage(inputText.trim())
      setTimeout(() => {
        addMessage({
          role: 'agent',
          content: agentResponse
        })
        setIsLoading(false)
      }, 1000 + Math.random() * 1000) // Simulate processing time
    } catch (error) {
      setTimeout(() => {
        addMessage({
          role: 'agent',
          content: 'Sorry, I encountered an error processing your request. Please try again.'
        })
        setIsLoading(false)
      }, 1000)
    }

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleInputChange = (e) => {
    setInputText(e.target.value)
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }

  const handleFeatureClick = (prompt) => {
    setInputText(prompt)
    textareaRef.current?.focus()
  }

  return (
    <div className="p-4 bg-white border-t border-gray-200">
      <FeatureButtons onFeatureClick={handleFeatureClick} />
      
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="flex gap-3">
          <textarea
            ref={textareaRef}
            value={inputText}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Ask a coding question or paste your code..."
            className="flex-1 resize-none border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            rows={2}
            disabled={isLoading}
            style={{ minHeight: '60px', maxHeight: '200px' }}
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              !inputText.trim() || isLoading
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Thinking...
              </span>
            ) : (
              'Send'
            )}
          </button>
        </div>
        
        <div className="text-xs text-gray-500 mt-2 text-center">
          Press Enter to send, Shift+Enter for new line
        </div>
      </form>
    </div>
  )
}

export default InputArea