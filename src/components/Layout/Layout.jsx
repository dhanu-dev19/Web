import React from 'react'
import ChatInterface from '../ChatInterface/ChatInterface.jsx'
import InputArea from '../InputArea/InputArea.jsx'
import { ChatProvider } from '../../context/ChatContext.jsx'

const Layout = () => {
  return (
    <ChatProvider>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-blue-600 text-white py-4 px-4 shadow-lg">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-center">Code Helper Agent Demo</h1>
            <p className="text-center mt-2 text-blue-100">AI-powered code assistance for debugging, explanation, and improvement</p>
          </div>
        </header>

        <main className="max-w-4xl mx-auto p-4">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <ChatInterface />
            <InputArea />
          </div>
        </main>

        <footer className="mt-8 pb-4 text-center text-gray-600 text-sm">
          <p>Code Helper Agent Demo - Interactive AI-powered code assistance</p>
        </footer>
      </div>
    </ChatProvider>
  )
}

export default Layout