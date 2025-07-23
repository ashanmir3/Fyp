import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, MessageCircle, X, Minimize2 } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

interface ChatMessage {
  id: string;
  message: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  suggestions?: string[];
}

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
  onMinimize: () => void;
}

export const AIChat: React.FC<AIChatProps> = ({ isOpen, onClose, onMinimize }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      message: 'Hello! I\'m your AI dermatology assistant. I can help you with basic skin care questions, analyze symptoms, and guide you to appropriate care. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
      suggestions: [
        'I have a rash on my arm',
        'What skincare routine do you recommend?',
        'I need help with acne',
        'Book an appointment with a doctor'
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): ChatMessage => {
    const lowerMessage = userMessage.toLowerCase();
    
    let response = '';
    let suggestions: string[] = [];

    if (lowerMessage.includes('acne') || lowerMessage.includes('pimple')) {
      response = 'Acne is a common skin condition. Here are some general tips: 1) Use a gentle cleanser twice daily, 2) Apply non-comedogenic moisturizer, 3) Consider over-the-counter treatments with salicylic acid or benzoyl peroxide. For persistent acne, I recommend consulting with a dermatologist.';
      suggestions = ['Book dermatologist appointment', 'Recommend acne products', 'More acne care tips'];
    } else if (lowerMessage.includes('rash') || lowerMessage.includes('irritation')) {
      response = 'Skin rashes can have various causes. Can you describe the rash? Is it itchy, red, or raised? For proper diagnosis, I recommend uploading a photo for AI analysis or consulting with a dermatologist, especially if the rash persists or worsens.';
      suggestions = ['Upload photo for analysis', 'Book dermatologist appointment', 'Describe symptoms more'];
    } else if (lowerMessage.includes('routine') || lowerMessage.includes('skincare')) {
      response = 'A basic skincare routine includes: 1) Gentle cleanser (morning & evening), 2) Moisturizer suitable for your skin type, 3) Sunscreen (SPF 30+ during day). Your routine may vary based on your skin type and concerns. Would you like personalized recommendations?';
      suggestions = ['Get personalized routine', 'Shop skincare products', 'Skin type assessment'];
    } else if (lowerMessage.includes('appointment') || lowerMessage.includes('doctor')) {
      response = 'I can help you book an appointment with one of our certified dermatologists. They can provide professional diagnosis and treatment plans. Would you like to see available doctors in your area?';
      suggestions = ['Find doctors near me', 'View doctor profiles', 'Check appointment availability'];
    } else {
      response = 'I understand you have a skin concern. For the best assistance, could you provide more details about your symptoms? You can also upload a photo for AI analysis or book a consultation with one of our dermatologists.';
      suggestions = ['Upload photo for analysis', 'Describe symptoms', 'Book consultation', 'Browse skincare products'];
    }

    return {
      id: Date.now().toString(),
      message: response,
      sender: 'bot',
      timestamp: new Date(),
      suggestions
    };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="fixed bottom-6 right-6 w-96 h-[600px] z-50"
    >
      <Card className="h-full flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-white font-semibold">AI Dermatology Assistant</h3>
              <p className="text-blue-100 text-sm">Online • Ready to help</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={onMinimize}
              className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-2 max-w-[80%] ${
                message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === 'user' 
                    ? 'bg-blue-600' 
                    : 'bg-gradient-to-r from-green-500 to-green-600'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                <div>
                  <div className={`px-4 py-2 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-800 shadow-sm'
                  }`}>
                    <p className="text-sm">{message.message}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 px-2">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  
                  {/* Suggestions */}
                  {message.suggestions && message.suggestions.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {message.suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="block w-full text-left text-xs px-3 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-700 transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white px-4 py-2 rounded-2xl shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about your skin concerns..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              size="sm"
              icon={Send}
            />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};