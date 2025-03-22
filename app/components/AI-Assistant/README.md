# AI Assistant Component

A modern, accessible chat interface for AI interactions with speech recognition and text-to-speech capabilities.

## Features

- 🎨 Clean, modern UI with animations and smooth transitions
- 🔊 Speech synthesis (text-to-speech) for reading messages aloud
- 🎤 Speech recognition for voice input
- 💬 Message reactions with emoji picker
- 🔔 Notification sounds with customizable settings
- 💾 Optional chat history persistence
- ⌨️ Keyboard shortcuts for improved accessibility
- 📱 Responsive design for mobile and desktop
- ♿ Fully accessible with ARIA attributes and screen reader support

## Component Structure

The component has been modularized for better maintainability and reusability:

```
app/components/AI-Assistant/
├── ai-assistant.tsx             # Main component
├── animations.ts                # Animation variants
├── ChatButton.tsx               # Floating chat button
├── ChatMessage.tsx              # Individual message component
├── LoadingDots.tsx              # Loading animation
├── MessageInput.tsx             # Input field with voice support
├── translations.ts              # Text strings and translations
├── types.ts                     # TypeScript interfaces
├── components/                  # Smaller UI components
│   ├── ChatBody.tsx             # Message container
│   ├── ChatHeader.tsx           # Header with controls
│   ├── SettingsPanel.tsx        # User preferences panel
│   └── VoiceControls.tsx        # Speech controls
└── hooks/                       # Custom React hooks
    ├── useChatHistory.ts        # Chat persistence
    ├── useNotificationSound.ts  # Sound management
    ├── useSettings.ts           # User preferences
    ├── useSpeechRecognition.ts  # Voice input
    └── useSpeechSynthesis.ts    # Text-to-speech
```

## Usage

Import the component into your Next.js application:

```tsx
import AiAssistant from '@/app/components/AI-Assistant/ai-assistant';

export default function Page() {
  return (
    <main>
      <h1>Your Page Content</h1>
      <AiAssistant />
    </main>
  );
}
```

## Voice Interaction Features

The AI Assistant provides a comprehensive voice interaction experience:

### Speech Recognition (Voice Input)

- Microphone button in the input field toggles voice listening mode
- Real-time transcript updates in the input field as you speak
- Automatic message submission when speech ends with a short delay (500ms)
- Visual feedback with pulsing animation during listening mode
- Graceful fallback for browsers without speech recognition support

### Speech Synthesis (Text-to-Speech)

- Read aloud button for assistant messages
- Play/pause controls for speech playback
- Visual indication when messages are being read
- Support for multiple languages based on browser capabilities
- Seamless integration with the conversation flow

The voice features work together to create a hands-free experience where users can:
1. Activate voice input with a single click
2. Speak their message naturally
3. Have it automatically submitted when they finish speaking
4. Listen to the AI's response read aloud

## Technical Implementation

### Speech Recognition Hook

The `useSpeechRecognition` hook provides voice-to-text functionality:

```tsx
const { 
  isListening,            // Boolean indicating if listening is active
  recognitionSupported,   // Boolean indicating browser support
  transcript,             // Current speech transcript
  toggleListening,        // Function to start/stop listening
  resetTranscript         // Function to clear transcript
} = useSpeechRecognition();
```

Implementation details:
- Uses the Web Speech API's SpeechRecognition interface
- Handles browser prefixing (standard and webkit)
- Automatically restarts recognition on timeouts
- Manages recognition states and error handling
- Provides continuous recognition with interim results

### Speech Synthesis Hook

The `useSpeechSynthesis` hook provides text-to-speech functionality:

```tsx
const {
  isSpeaking,          // Boolean indicating if speech is active
  speechSupported,     // Boolean indicating browser support
  speakMessage         // Function to speak text or stop speaking
} = useSpeechSynthesis();
```

Implementation details:
- Uses the Web Speech API's SpeechSynthesis interface
- Selects appropriate voices based on language settings
- Manages speaking state with event listeners
- Provides controls to start and stop speech
- Handles speech synthesis errors gracefully

### Integration in the AI Assistant

The voice features are integrated in the main component:
1. State from both hooks is used to control UI elements
2. The transcript updates the input field in real-time
3. Voice toggle automatically submits messages after speech ends
4. The VoiceControls component provides text-to-speech for assistant messages
5. Accessibility features ensure screen readers announce voice states

## API Integration

The component sends messages to the `/api/ai-assistant` endpoint. Ensure this endpoint is implemented to:

1. Accept POST requests with `{ message: string }` in the request body
2. Return responses in the format `{ message: string }`

## Keyboard Shortcuts

- `Ctrl+/` or `Cmd+/`: Toggle chat open/close
- `Esc`: Close chat
- `Ctrl+,` or `Cmd+,`: Toggle settings panel

## Accessibility

This component follows WCAG guidelines with:

- Proper focus management
- ARIA attributes
- Screen reader announcements
- Keyboard navigation
- High contrast mode support
- Reduced motion support

## Browser Support

- Speech synthesis is supported in all modern browsers
- Speech recognition is supported in Chrome, Edge, Safari, and some mobile browsers
- Fallbacks are provided for browsers without speech support

## Conclusion

The refactored AI Assistant component offers a significantly improved user experience through:

1. **Enhanced Accessibility**: With voice controls, keyboard shortcuts, and screen reader support, the assistant is usable by people with a wide range of abilities.

2. **Multimodal Interaction**: The combination of text and voice input/output allows users to interact in their preferred way or switch between modes as needed.

3. **Improved UX**: Clean, modern UI with smooth animations and intuitive controls makes the assistant feel responsive and professional.

4. **Modularity and Maintainability**: The component architecture follows best practices for React development, making it easy to extend or modify.

5. **Performance Optimization**: Careful use of React hooks, memoization, and optimistic updates ensures the assistant remains responsive even during API calls.

The voice-enabled features transform the assistant from a simple chat interface into a more natural, conversational AI experience that feels more human and less like a traditional text-based chatbot.

## Integration with Portfolio

The AI Assistant is a key component of the overall portfolio application, designed to:

1. **Enhance Visitor Experience**: Provide an interactive way for portfolio visitors to learn about the developer's skills, projects, and experience without having to navigate through multiple pages.

2. **Showcase Technical Skills**: Demonstrate advanced React development capabilities including custom hooks, state management, accessibility implementation, and integration with modern Web APIs.

3. **Complement Traditional Content**: Work alongside static portfolio components like:
   - Hero section
   - Projects showcase
   - Skills list
   - Education history
   - Contact form
   
4. **Provide Contextual Help**: Answer questions about the developer's background, explain technical concepts in projects, and assist with portfolio navigation.

5. **Serve as a Technical Differentiator**: Set the portfolio apart from traditional static portfolios by showcasing expertise in conversational interfaces and modern web technologies.

The component is strategically placed in the application layout to be persistently available while not interfering with the main content, making it an optional but valuable addition to the user's browsing experience. 