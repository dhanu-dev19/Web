import React, { useState, useEffect } from 'react'

const CodeBlock = ({ code, language }) => {
  const [highlightedCode, setHighlightedCode] = useState(code)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    // Simple syntax highlighting simulation
    // In a real app, you'd use Prism.js or highlight.js
    const highlightSyntax = (code, language) => {
      if (language === 'javascript' || language === 'js') {
        return code
          .replace(/\b(function|const|let|var|if|else|for|while|return|import|export|default|from|class|extends)\b/g, '<span class="text-blue-600 font-semibold">$1</span>')
          .replace(/\b(true|false|null|undefined)\b/g, '<span class="text-purple-600">$1</span>')
          .replace(/(['"`])((?:\\.|(?!\1)[^\\])*?)\1/g, '<span class="text-green-600">$&</span>')
          .replace(/\/\/.*$/gm, '<span class="text-gray-500">$&</span>')
      }
      return code
    }

    setHighlightedCode(highlightSyntax(code, language))
  }, [code, language])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="relative my-3">
      <div className="flex items-center justify-between bg-gray-800 text-gray-200 px-4 py-2 text-xs font-mono rounded-t-lg">
        <span className="uppercase">{language || 'code'}</span>
        <button
          onClick={copyToClipboard}
          className="px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded transition-colors"
        >
          {copied ? '✓ Copied!' : '📋 Copy'}
        </button>
      </div>
      <pre className="bg-gray-900 text-gray-100 p-4 overflow-x-auto rounded-b-lg">
        <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
      </pre>
    </div>
  )
}

export default CodeBlock