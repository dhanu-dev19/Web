import React, { useState, useEffect, useRef } from 'react'
import Message from './Message.jsx'

const ChatInterface = () => {
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
  
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const addMessage = (message) => {
    setMessages(prev => [...prev, { 
      ...message, 
      id: Date.now(),
      timestamp: new Date()
    }])
  }

  return (
    <div className="h-96 overflow-y-auto border-b border-gray-200 bg-gray-50">
      <div className="p-4 space-y-4">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}

export default ChatInterface