import React, { createContext, useContext, useState, useCallback } from 'react'
import { processMessage as mockProcessMessage } from '../services/mockAgentService.js'

const ChatContext = createContext()

export const useChat = () => {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider')
  }
  return context
}

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'agent',
      content: `Hello! I'm your Code Helper Agent. I can help you with:

🐛 **Debug Error** - Find and fix bugs in your code
📝 **Explain Code** - Understand what code does step by step  
✨ **Improve Code** - Get suggestions for better performance and readability
🧪 **Write Tests** - Generate test cases for your code
📚 **Best Practices** - Learn coding standards and conventions

Paste your code or ask a question to get started!`,
      timestamp: new Date()
    }
  ])

  const addMessage = useCallback((message) => {
    setMessages(prev => [...prev, { 
      ...message, 
      id: Date.now(),
      timestamp: new Date()
    }])
  }, [])

  const processMessage = useCallback(async (userInput) => {
    try {
      const response = await mockProcessMessage(userInput)
      return response
    } catch (error) {
      console.error('Error processing message:', error)
      return 'Sorry, I encountered an error processing your request. Please try again.'
    }
  }, [])

  const clearMessages = useCallback(() => {
    setMessages([])
  }, [])

  const value = {
    messages,
    addMessage,
    processMessage,
    clearMessages
  }

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  )
}

export { ChatContext }