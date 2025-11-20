import React from 'react'
import CodeBlock from './CodeBlock.jsx'

const Message = ({ message }) => {
  const { role, content, timestamp } = message
  const isUser = role === 'user'
  
  const formatMessageContent = (content) => {
    // Split content by code blocks
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g
    const parts = []
    let lastIndex = 0
    let match

    while ((match = codeBlockRegex.exec(content)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: content.slice(lastIndex, match.index)
        })
      }

      // Add code block
      parts.push({
        type: 'code',
        language: match[1] || 'javascript',
        content: match[2].trim()
      })

      lastIndex = match.index + match[0].length
    }

    // Add remaining text
    if (lastIndex < content.length) {
      parts.push({
        type: 'text',
        content: content.slice(lastIndex)
      })
    }

    return parts
  }

  const formatText = (text) => {
    // Convert markdown to basic HTML
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm">$1</code>')
      .replace(/\n/g, '<br />')
  }

  const parts = formatMessageContent(content)

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-3xl rounded-lg p-4 ${
          isUser
            ? 'bg-blue-500 text-white ml-auto'
            : 'bg-purple-100 text-purple-900 mr-auto'
        }`}
      >
        <div className="flex items-center mb-2">
          <span className="text-sm font-medium">
            {isUser ? 'You' : 'Code Helper'}
          </span>
          <span className={`text-xs ml-2 ${isUser ? 'text-blue-100' : 'text-purple-600'}`}>
            {timestamp.toLocaleTimeString()}
          </span>
        </div>
        
        <div className={`text-sm ${isUser ? 'text-white' : 'text-gray-800'}`}>
          {parts.map((part, index) => {
            if (part.type === 'code') {
              return (
                <CodeBlock
                  key={index}
                  code={part.content}
                  language={part.language}
                />
              )
            } else {
              return (
                <div
                  key={index}
                  dangerouslySetInnerHTML={{ __html: formatText(part.content) }}
                />
              )
            }
          })}
        </div>
      </div>
    </div>
  )
}

export default Message