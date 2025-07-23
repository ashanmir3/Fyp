import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Paperclip, Smile, Phone, Video, MoreVertical, Search } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';
import { ChatMessage } from '../types';
import { CommunityChat } from '../components/CommunityChat';

export const Chat: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'direct' | 'community'>('direct');
  const [selectedChat, setSelectedChat] = useState<string | null>('1');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatContacts = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=150',
      lastMessage: 'Your skin analysis results look promising...',
      timestamp: '2 min ago',
      unread: 2,
      online: true,
      type: 'doctor'
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      avatar: 'https://images.pexels.com/photos/612608/pexels-photo-612608.jpeg?auto=compress&cs=tinysrgb&w=150',
      lastMessage: 'Let\'s schedule a follow-up appointment',
      timestamp: '1 hour ago',
      unread: 0,
      online: false,
      type: 'doctor'
    },
    {
      id: '3',
      name: 'Skin Care Community',
      avatar: 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=150',
      lastMessage: 'Emma: Has anyone tried the new moisturizer?',
      timestamp: '3 hours ago',
      unread: 5,
      online: true,
      type: 'group'
    }
  ];

  const mockMessages: ChatMessage[] = [
    {
      id: '1',
      senderId: '1',
      receiverId: user?.id || '',
      message: 'Hello! I\'ve reviewed your recent skin analysis. The results look quite promising.',
      timestamp: new Date(Date.now() - 300000),
      type: 'text'
    },
    {
      id: '2',
      senderId: user?.id || '',
      receiverId: '1',
      message: 'That\'s great to hear! What do you recommend for the next steps?',
      timestamp: new Date(Date.now() - 240000),
      type: 'text'
    },
    {
      id: '3',
      senderId: '1',
      receiverId: user?.id || '',
      message: 'I\'d recommend continuing with the current treatment plan. We should see significant improvement in 2-3 weeks.',
      timestamp: new Date(Date.now() - 180000),
      type: 'text'
    },
    {
      id: '4',
      senderId: user?.id || '',
      receiverId: '1',
      message: 'Perfect! Should I schedule a follow-up appointment?',
      timestamp: new Date(Date.now() - 120000),
      type: 'text'
    }
  ];

  useEffect(() => {
    setMessages(mockMessages);
  }, [selectedChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim() || !selectedChat) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: user?.id || '',
      receiverId: selectedChat,
      message: message.trim(),
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');

    // Simulate doctor response after a delay
    setTimeout(() => {
      const doctorResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        senderId: selectedChat,
        receiverId: user?.id || '',
        message: 'Thank you for your message. I\'ve received your inquiry and will review your case. I\'ll get back to you with detailed recommendations shortly.',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, doctorResponse]);
    }, 1500);
  };

  const selectedContact = chatContacts.find(contact => contact.id === selectedChat);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl w-fit">
            <button
              onClick={() => setActiveTab('direct')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'direct'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Direct Messages
            </button>
            <button
              onClick={() => setActiveTab('community')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'community'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Community Chat
            </button>
          </div>
        </div>

        {activeTab === 'direct' ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Chat List */}
          <div className="lg:col-span-1">
            <Card className="h-full p-0 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Messages</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="overflow-y-auto flex-1">
                {chatContacts.map((contact) => (
                  <motion.div
                    key={contact.id}
                    whileHover={{ backgroundColor: '#f8fafc' }}
                    onClick={() => setSelectedChat(contact.id)}
                    className={`p-4 cursor-pointer border-b border-gray-100 ${
                      selectedChat === contact.id ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img
                          src={contact.avatar}
                          alt={contact.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        {contact.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium text-gray-900 truncate">
                            {contact.name}
                          </h3>
                          <span className="text-xs text-gray-500">{contact.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{contact.lastMessage}</p>
                      </div>
                      {contact.unread > 0 && (
                        <div className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {contact.unread}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </div>

          {/* Chat Window */}
          <div className="lg:col-span-3">
            <Card className="h-full p-0 overflow-hidden flex flex-col">
              {selectedContact ? (
                <>
                  {/* Chat Header */}
                  <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img
                          src={selectedContact.avatar}
                          alt={selectedContact.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        {selectedContact.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{selectedContact.name}</h3>
                        <p className="text-sm text-gray-500">
                          {selectedContact.online ? 'Online' : 'Last seen 2 hours ago'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" icon={Phone} />
                      <Button variant="ghost" size="sm" icon={Video} />
                      <Button variant="ghost" size="sm" icon={MoreVertical} />
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                            msg.senderId === user?.id
                              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{msg.message}</p>
                          <p className={`text-xs mt-1 ${
                            msg.senderId === user?.id ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <div className="p-6 border-t border-gray-200">
                    <div className="flex items-center space-x-4">
                      <Button variant="ghost" size="sm" icon={Paperclip} />
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          placeholder="Type your message..."
                          className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={Smile}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        />
                      </div>
                      <Button
                        onClick={handleSendMessage}
                        disabled={!message.trim()}
                        icon={Send}
                      >
                        Send
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageCircle className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No conversation selected</h3>
                    <p className="text-gray-500">Choose a conversation from the sidebar to start chatting</p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
        ) : (
          <CommunityChat />
        )}
      </div>
    </div>
  );
};