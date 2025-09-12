'use client'

import { useChat } from '@ai-sdk/react'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Settings, X, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useSettings } from './hooks/useSettings'
import { useNotificationSound } from './hooks/useNotificationSound'
import { Response } from './Response'
import { Suggestions, Suggestion } from './Suggestions'

interface SimpleChatProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const SimpleChat = ({ isOpen, setIsOpen }: SimpleChatProps) => {
  const [showSettings, setShowSettings] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const { settings, updateSettings } = useSettings()
  const { playSound } = useNotificationSound({ 
    soundEnabled: settings.soundEnabled, 
    soundUrl: settings.notificationSound 
  })

  const {
    messages,
    sendMessage,
    status,
    setMessages
  } = useChat({
    onFinish: () => {
      playSound()
    }
  })

  const [input, setInput] = useState('')
  const isLoading = status === 'streaming' || status === 'submitted'

  // Starter suggestions for empty chat
  const starterSuggestions = [
    "Tell me about Nikita's skills",
    "What projects has he worked on?",
    "Show me his experience",
    "What technologies does he use?"
  ]

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    sendMessage({ text: suggestion })
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    
    sendMessage({ text: input })
    setInput('')
  }

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  // Auto scroll to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen])

  const clearHistory = () => {
    setMessages([])
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="fixed bottom-0 right-0 md:bottom-6 md:right-6 z-50 w-full h-full md:w-96 md:h-[600px] bg-background/95 backdrop-blur-sm border rounded-none md:rounded-lg shadow-xl flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-muted/50">
          <h3 className="font-semibold">AI Assistant</h3>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="p-4 border-b bg-muted/30 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Sound notifications</label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
              >
                {settings.soundEnabled ? 'On' : 'Off'}
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Save chat history</label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateSettings({ saveChatHistory: !settings.saveChatHistory })}
              >
                {settings.saveChatHistory ? 'On' : 'Off'}
              </Button>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={clearHistory}
              className="w-full"
            >
              Clear History
            </Button>
          </div>
        )}

        {/* Show suggestions when no messages */}
        {messages.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold">How can I help you today?</h2>
              </div>
              <p className="text-muted-foreground text-sm">
                Hi! I'm Nikita's AI assistant. Ask me anything about his skills, projects, or experience!
              </p>
            </div>
            
            <Suggestions className="w-full">
              {starterSuggestions.map((suggestion) => (
                <Suggestion
                  key={suggestion}
                  suggestion={suggestion}
                  onClick={handleSuggestionClick}
                />
              ))}
            </Suggestions>
          </div>
        )}

        {/* Messages */}
        {messages.length > 0 && (
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-tr-none'
                        : 'bg-muted text-foreground rounded-tl-none'
                    }`}
                  >
                    {message.role === 'user' ? (
                      <div className="text-sm whitespace-pre-wrap break-words">
                        {message.parts?.find(part => part.type === 'text')?.text || ''}
                      </div>
                    ) : (
                      <Response className="text-sm [&_.prose]:text-sm [&_.prose]:text-current">
                        {message.parts?.find(part => part.type === 'text')?.text || ''}
                      </Response>
                    )}
                  </div>
                </div>
              ))}
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted text-foreground rounded-2xl rounded-tl-none px-4 py-2">
                  <div className="flex items-center space-x-1">
                    <span className="text-sm">AI is thinking</span>
                    <div className="flex space-x-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1 h-1 bg-current rounded-full"
                          animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.2
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        )}

        {/* Input */}
        <div className="p-4 border-t">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" disabled={!input.trim() || isLoading}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default SimpleChat
