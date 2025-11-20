import React from 'react'

const FeatureButtons = ({ onFeatureClick }) => {
  const features = [
    {
      emoji: '🐛',
      label: 'Debug Error',
      prompt: 'Can you help me debug this error? I\'m getting an error in my code.',
      description: 'Find and fix bugs in your code'
    },
    {
      emoji: '📝',
      label: 'Explain Code',
      prompt: 'Can you explain what this code does? I want to understand how it works.',
      description: 'Understand what code does step by step'
    },
    {
      emoji: '✨',
      label: 'Improve Code',
      prompt: 'How can I improve this code? Please suggest better ways to write it.',
      description: 'Get suggestions for better performance and readability'
    },
    {
      emoji: '🧪',
      label: 'Write Tests',
      prompt: 'Can you help me write tests for this code? I need comprehensive test coverage.',
      description: 'Generate test cases for your code'
    },
    {
      emoji: '📚',
      label: 'Best Practices',
      prompt: 'What are the best practices for this type of code? I want to follow standards.',
      description: 'Learn coding standards and conventions'
    }
  ]

  return (
    <div className="space-y-3">
      <div className="text-sm font-medium text-gray-700 text-center">
        Quick Actions - Click to get started:
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {features.map((feature, index) => (
          <button
            key={index}
            onClick={() => onFeatureClick(feature.prompt)}
            className="group relative p-3 bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-lg hover:from-blue-50 hover:to-blue-100 hover:border-blue-300 hover:shadow-md transition-all duration-200 text-center"
            title={feature.description}
          >
            <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">
              {feature.emoji}
            </div>
            <div className="text-xs font-medium text-gray-700 group-hover:text-blue-700">
              {feature.label}
            </div>
            
            {/* Tooltip for mobile */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
              {feature.description}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800"></div>
            </div>
          </button>
        ))}
      </div>
      
      <div className="text-xs text-gray-500 text-center">
        💡 Tip: You can also paste your code directly and ask specific questions
      </div>
    </div>
  )
}

export default FeatureButtons