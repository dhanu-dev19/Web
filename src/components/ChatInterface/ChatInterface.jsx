import React, { useEffect, useRef, useContext } from 'react'
import Message from './Message.jsx'
import { ChatContext } from '../../context/ChatContext.jsx'

const ChatInterface = () => {
  const { messages } = useContext(ChatContext)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

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