// Mock AI Agent Service for Demo Purposes
// Simulates responses from an AI code assistant

const commonResponses = {
  greeting: [
    "Hello! I'm here to help with your coding questions. What can I assist you with today?",
    "Hi! I'm your Code Helper Agent. Feel free to ask me anything about programming or paste your code for analysis!",
    "Welcome! I can help you debug, explain, or improve your code. What would you like to work on?"
  ],
  debug: [
    "I'd be happy to help you debug! Could you share the code that's causing issues along with any error messages you're seeing?",
    "Let's hunt down those bugs together! Please paste your code and describe what's not working as expected.",
    "Debugging time! Share your code and I'll help you identify and fix the issues."
  ],
  explain: [
    "I can help explain that! Please paste the code you'd like me to break down for you.",
    "Code explanation is one of my specialties! Share the code and I'll walk you through how it works.",
    "I'd love to help you understand that code better! Paste it here and I'll explain it step by step."
  ],
  improve: [
    "Code improvement suggestions coming right up! Share your current implementation and I'll suggest enhancements.",
    "I can definitely help optimize that code! Please show me what you have, and I'll suggest improvements.",
    "Let's make that code even better! Paste your code and I'll provide suggestions for enhancement."
  ],
  test: [
    "Testing is crucial! I'll help you write comprehensive tests. Share your code and let me know what testing framework you prefer.",
    "Test generation is one of my favorite tasks! Paste your code and I'll create appropriate test cases for you.",
    "I'll help you ensure your code is well-tested! Share the implementation and I'll write test cases."
  ],
  practices: [
    "Best practices are so important for maintainable code! What type of code or language would you like guidance on?",
    "I'd be happy to share best practices! Let me know what language or type of code you're working with.",
    "Following best practices makes code much better! What specific area would you like guidance on?"
  ]
}

const codeExamples = {
  react: {
    buggy: `function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, []);
  
  return <div>{user?.name}</div>;
}`,
    fixed: `function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]); // Added userId to dependency array
  
  return <div>{user?.name}</div>;
}`,
    explanation: "The issue was that `userId` was missing from the useEffect dependency array. This means the effect won't re-run when `userId` changes, potentially showing stale user data."
  },
  javascript: {
    buggy: `function calculateSum(numbers) {
  let total = 0;
  for (let i = 0; i <= numbers.length; i++) {
    total += numbers[i];
  }
  return total;
}`,
    fixed: `function calculateSum(numbers) {
  let total = 0;
  for (let i = 0; i < numbers.length; i++) { // Fixed: removed = 
    total += numbers[i];
  }
  return total;
}`,
    explanation: "The bug was in the loop condition `i <= numbers.length` which would try to access an undefined index. It should be `i < numbers.length`."
  }
}

function detectUserIntent(userInput) {
  const lowerInput = userInput.toLowerCase()
  
  if (lowerInput.includes('debug') || lowerInput.includes('error') || lowerInput.includes('bug')) {
    return 'debug'
  }
  if (lowerInput.includes('explain') || lowerInput.includes('understand') || lowerInput.includes('what does')) {
    return 'explain'
  }
  if (lowerInput.includes('improve') || lowerInput.includes('better') || lowerInput.includes('optimize')) {
    return 'improve'
  }
  if (lowerInput.includes('test') || lowerInput.includes('testing') || lowerInput.includes('coverage')) {
    return 'test'
  }
  if (lowerInput.includes('best practice') || lowerInput.includes('standards') || lowerInput.includes('convention')) {
    return 'practices'
  }
  
  return 'general'
}

function detectLanguage(code) {
  if (code.includes('useState') || code.includes('useEffect') || code.includes('React')) {
    return 'react'
  }
  if (code.includes('function') && code.includes('const') && code.includes('let')) {
    return 'javascript'
  }
  if (code.includes('def ') || code.includes('import ') && code.includes(':')) {
    return 'python'
  }
  return 'general'
}

function generateDebugResponse(userInput) {
  if (userInput.includes('```')) {
    // Extract code block
    const codeMatch = userInput.match(/```[\w]*\n([\s\S]*?)```/)
    if (codeMatch) {
      const code = codeMatch[1]
      const language = detectLanguage(code)
      
      if (language === 'react' && code.includes('useEffect') && code.includes('userId')) {
        return `I found a potential issue in your React code!

**Problem:** Missing dependency in useEffect
\`\`\`javascript
// Your current code has:
useEffect(() => {
  fetchUser(userId).then(setUser);
}, []); // userId is missing!
\`\`\`

**Fixed version:**
\`\`\`javascript
useEffect(() => {
  fetchUser(userId).then(setUser);
}, [userId]); // Added userId to dependencies
\`\`\`

**Why this matters:**
- Without userId in dependencies, the effect won't re-run when userId changes
- This could show stale user data when navigating between profiles
- React will also show a warning in development

The React Rules of Hooks require that all values from the component scope used in effects be listed in the dependency array. This ensures your effect stays in sync with your component's props and state.`
      }
      
      if (language === 'javascript' && code.includes('for (let i')) {
        return `I spotted a common bug in your JavaScript code!

**Problem:** Off-by-one error in loop
\`\`\`javascript
// Your current code:
for (let i = 0; i <= numbers.length; i++) {
  total += numbers[i];
}
\`\`\`

**Fixed version:**
\`\`\`javascript
for (let i = 0; i < numbers.length; i++) {  // Use < not <=
  total += numbers[i];
}
\`\`\`

**What was happening:**
- Arrays are 0-indexed, so the last valid index is \`length - 1\`
- Your code was trying to access \`numbers[numbers.length]\` which is \`undefined\`
- This would add \`undefined\` to your total, resulting in \`NaN\`

**Quick tip:** Always use \`< array.length\` unless you specifically need the length value itself!`
      }
    }
  }
  
  return commonResponses.debug[Math.floor(Math.random() * commonResponses.debug.length)]
}

function generateExplainResponse(userInput) {
  if (userInput.includes('```')) {
    const codeMatch = userInput.match(/```(\w+)?\n([\s\S]*?)```/)
    if (codeMatch) {
      const code = codeMatch[2]
      const language = codeMatch[1] || 'javascript'
      
      return `I'll break down that ${language} code for you:

\`\`\`${language}
${code}
\`\`\`

**Line by line explanation:**
- Each line serves a specific purpose in the overall logic
- The code follows standard ${language} conventions
- Variables are used to store and manipulate data

**Key concepts at work:**
- **Variables/Functions**: Storing reusable values and logic
- **Control Flow**: How the execution path is determined
- **Data Operations**: How data is processed and transformed

**What this code accomplishes:**
The main purpose is to perform its intended function efficiently while following best practices for readability and maintainability.

Would you like me to explain any specific part in more detail?`
    }
  }
  
  return commonResponses.explain[Math.floor(Math.random() * commonResponses.explain.length)]
}

function generateImproveResponse(userInput) {
  return `I'd be happy to suggest improvements! Based on your request, here are some general enhancement strategies:

**Performance Improvements:**
- Optimize algorithms and data structures
- Reduce unnecessary computations
- Implement caching where appropriate
- Minimize DOM manipulations in web apps

**Code Quality Enhancements:**
- Add meaningful comments and documentation
- Use descriptive variable and function names
- Follow consistent coding conventions
- Break down complex functions into smaller, focused ones

**Modern Practices:**
- Use modern language features appropriately
- Implement proper error handling
- Add input validation
- Consider accessibility requirements

**Example Before/After:**
\`\`\`javascript
// Before
function d(a) {
  let x = 0;
  for(let i = 0; i < a.length; i++) {
    x = x + a[i];
  }
  return x;
}

// After  
function calculateSum(numbers) {
  return numbers.reduce((sum, number) => sum + number, 0);
}
\`\`\`

The improved version is more readable, concise, and uses modern array methods.

Share your specific code and I'll provide targeted improvement suggestions!`
}

function generateTestResponse(userInput) {
  return `I'll help you create comprehensive tests! Here's a testing framework approach:

**Test Structure Template:**
\`\`\`javascript
// Jest/React Testing Library Example
describe('YourComponent/Function', () => {
  // Test happy path
  test('should work correctly with valid inputs', () => {
    // Your test implementation
  })
  
  // Test edge cases
  test('should handle edge cases properly', () => {
    // Test boundary conditions
  })
  
  // Test error handling
  test('should handle errors gracefully', () => {
    // Test error scenarios
  })
})
\`\`\`

**Types of Tests to Consider:**
1. **Unit Tests**: Individual functions/components
2. **Integration Tests**: Multiple parts working together
3. **E2E Tests**: Complete user workflows

**Test Coverage Goals:**
- ✅ Happy path scenarios
- ✅ Edge cases and boundaries
- ✅ Error conditions
- ✅ Performance expectations

**Example for a Simple Function:**
\`\`\`javascript
// Function to test
function calculateArea(width, height) {
  return width * height;
}

// Tests
describe('calculateArea', () => {
  test('calculates area correctly', () => {
    expect(calculateArea(5, 10)).toBe(50);
  })
  
  test('handles zero values', () => {
    expect(calculateArea(0, 10)).toBe(0);
  })
  
  test('handles negative inputs', () => {
    expect(() => calculateArea(-1, 10)).toThrow();
  })
})
\`\`\`

Share your specific code and I'll write targeted tests for it!`
}

function generatePracticesResponse(userInput) {
  return `Here are essential best practices for clean, maintainable code:

**Code Organization:**
- Keep functions small and focused on single responsibility
- Use consistent naming conventions
- Group related functionality together
- Remove unused code and imports

**Variable Naming:**
- Use descriptive, meaningful names
- Avoid abbreviations (except widely known ones)
- Use camelCase for variables, PascalCase for classes
- Name booleans with prefixes like \`is\`, \`has\`, \`can\`

**Error Handling:**
- Always handle potential errors
- Provide meaningful error messages
- Use try-catch blocks appropriately
- Fail fast and clearly

**Performance:**
- Avoid unnecessary computations in loops
- Use appropriate data structures
- Implement lazy loading where beneficial
- Optimize database queries

**Example of Good Practices:**
\`\`\`javascript
// Good: Descriptive names, error handling, single responsibility
async function fetchUserData(userId) {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }
    
    const response = await api.get(\`/users/\${userId}\`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    throw error; // Re-throw for caller to handle
  }
}
\`\`\`

**Code Reviews:**
- Review your own code before submitting
- Focus on logic, not just style
- Suggest improvements, don't just point out issues
- Learn from feedback from others

What specific area would you like more detailed guidance on?`
}

export async function processMessage(userInput) {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000))
  
  const intent = detectUserIntent(userInput)
  
  switch (intent) {
    case 'debug':
      return generateDebugResponse(userInput)
    case 'explain':
      return generateExplainResponse(userInput)
    case 'improve':
      return generateImproveResponse(userInput)
    case 'test':
      return generateTestResponse(userInput)
    case 'practices':
      return generatePracticesResponse(userInput)
    default:
      if (userInput.includes('```')) {
        // Has code but unclear intent
        return `I can see you've shared some code! Here's what I can help you with:

🐛 **Debug issues** - Find and fix bugs in your code
📝 **Explain functionality** - Understand how your code works  
✨ **Improve optimization** - Make your code better and faster
🧪 **Write tests** - Create comprehensive test coverage
📚 **Best practices** - Follow coding standards and conventions

What would you like me to focus on with this code? Just let me know if you need debugging, explanation, improvements, tests, or best practice advice!`
      } else {
        // General conversation
        return `I'm here to help with your coding needs! I can assist you with:

🐛 **Debugging errors** - Find and fix bugs in your code
📝 **Code explanation** - Understand how code works step by step
✨ **Code improvement** - Get suggestions for better performance and readability
🧪 **Test writing** - Generate comprehensive test cases
📚 **Best practices** - Learn coding standards and conventions

Feel free to:
- Paste your code and ask questions about it
- Describe a programming problem you're facing
- Request help with specific coding concepts
- Ask for improvement suggestions

What would you like to work on today?`
      }
  }
}