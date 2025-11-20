# Code Helper Agent Demo

An interactive AI-powered code assistant demo built with React, Vite, and Tailwind CSS. This showcase demonstrates how developers can get help with debugging, code explanation, improvements, testing, and best practices.

## ✨ Features

- **🐛 Debug Error** - Find and fix bugs in your code with intelligent suggestions
- **📝 Explain Code** - Get step-by-step explanations of complex code
- **✨ Improve Code** - Receive suggestions for better performance and readability
- **🧪 Write Tests** - Generate comprehensive test cases for your code
- **📚 Best Practices** - Learn coding standards and conventions

## 🚀 Tech Stack

- **Frontend**: React 18 with modern hooks
- **Build Tool**: Vite for fast development and building
- **Styling**: Tailwind CSS with custom theme
- **Code Highlighting**: Custom syntax highlighting
- **State Management**: React Context API
- **Icons**: Native emoji icons

## 📁 Project Structure

```
src/
├── components/
│   ├── ChatInterface/
│   │   ├── ChatInterface.jsx    # Main chat container
│   │   ├── Message.jsx          # Individual message display
│   │   └── CodeBlock.jsx        # Syntax-highlighted code
│   ├── InputArea/
│   │   ├── InputArea.jsx        # User input and send functionality
│   │   └── FeatureButtons.jsx   # Quick action buttons
│   └── Layout/
│       └── Layout.jsx           # Main app layout
├── context/
│   └── ChatContext.jsx          # Global chat state management
├── services/
│   └── mockAgentService.js      # Simulated AI responses
├── styles/
│   └── globals.css              # Global styles and Tailwind imports
└── main.jsx                     # React app entry point
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. **Clone and navigate to the project:**
   ```bash
   cd Web
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   - Navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🎯 How to Use

1. **Quick Actions**: Click the feature buttons (🐛 Debug, 📝 Explain, ✨ Improve, 🧪 Test, 📚 Best Practices) to get started quickly
2. **Direct Chat**: Type your coding questions or paste code directly
3. **Code Blocks**: Use markdown code blocks (```language) for syntax highlighting
4. **Interactive**: Get real-time responses from the AI agent

## 💡 Demo Scenarios

### Debugging Example
```javascript
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, []);  // Missing userId dependency!

  return <div>{user?.name}</div>;
}
```

The agent will identify the missing dependency in useEffect and provide the fix.

### Code Explanation
Paste any code and ask "What does this code do?" to get line-by-line explanations.

### Improvement Suggestions
Share working code and ask "How can I improve this?" to get optimization tips.

## 🎨 Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Syntax Highlighting**: Beautiful code display with multiple language support
- **Copy to Clipboard**: One-click code copying
- **Smooth Animations**: Polished UI with loading states
- **Real-time Chat**: Instant responses with typing indicators
- **Error Handling**: Graceful fallbacks for edge cases

## 🧪 Testing

The app includes comprehensive testing scenarios:

### Manual Testing Checklist
- [ ] Chat interface renders correctly
- [ ] Code highlighting works for JavaScript, Python, etc.
- [ ] Feature buttons pre-fill input
- [ ] Copy-to-clipboard functionality
- [ ] Responsive design on all devices
- [ ] Keyboard shortcuts (Enter to send, Shift+Enter for new line)

### Test Cases
1. **Debug Flow**: Click debug button → paste buggy code → get fix
2. **Explain Flow**: Click explain button → paste complex code → get explanation
3. **Improve Flow**: Click improve button → paste working code → get suggestions
4. **Direct Input**: Type freeform questions → get relevant help

## 🔧 Customization

### Adding New Features
1. Update `mockAgentService.js` with new response patterns
2. Add corresponding buttons in `FeatureButtons.jsx`
3. Update styling in `globals.css`

### Theming
Customize colors in `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: { /* your colors */ },
      agent: { /* your colors */ }
    }
  }
}
```

## 📦 Production Deployment

### Build for Production
```bash
npm run build
```

### Deployment Options
- **Vercel**: Connect repository for automatic deployments
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Use GitHub Actions for automatic deployment
- **Custom Hosting**: Serve the `dist` folder with any web server

### Environment Variables
Create `.env.production` for production settings:
```
VITE_APP_TITLE=Code Helper Agent
VITE_API_URL=https://your-api.com
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly
5. Commit changes: `git commit -m 'Add feature'`
6. Push to branch: `git push origin feature-name`
7. Open a Pull Request

## 📄 License

MIT License - feel free to use this project for learning and development.

## 🚀 Future Enhancements

- **Real AI Integration**: Connect to OpenAI, Anthropic, or other LLM APIs
- **Multiple Languages**: Extended support for more programming languages
- **File Upload**: Allow users to upload code files for analysis
- **Code Execution**: Safe sandboxed code execution environment
- **User Accounts**: Save conversation history and preferences
- **Collaborative Features**: Share conversations and collaborate on code

## 📞 Support

For questions or issues:
1. Check the existing code and documentation
2. Test in different browsers
3. Review the console for error messages
4. Create an issue with detailed steps to reproduce

---

**Built with ❤️ for the developer community**