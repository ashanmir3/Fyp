import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Users, Hash, Settings, Search, Smile, Paperclip } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { useAuth } from '../hooks/useAuth';
import io from 'socket.io-client';

interface CommunityMessage {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  message: string;
  timestamp: Date;
  channel: string;
  reactions?: { emoji: string; count: number; users: string[] }[];
}

interface Channel {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  isPrivate: boolean;
}

export const CommunityChat: React.FC = () => {
  const { user } = useAuth();
  const [selectedChannel, setSelectedChannel] = useState('general');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<CommunityMessage[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const channels: Channel[] = [
    {
      id: 'general',
      name: 'General',
      description: 'General skin care discussions',
      memberCount: 1250,
      isPrivate: false
    },
    {
      id: 'acne-support',
      name: 'Acne Support',
      description: 'Support group for acne treatment',
      memberCount: 890,
      isPrivate: false
    },
    {
      id: 'skincare-routine',
      name: 'Skincare Routines',
      description: 'Share and discuss skincare routines',
      memberCount: 650,
      isPrivate: false
    },
    {
      id: 'product-reviews',
      name: 'Product Reviews',
      description: 'Reviews and recommendations',
      memberCount: 420,
      isPrivate: false
    }
  ];

  // Mock messages for demonstration
  const mockMessages: CommunityMessage[] = [
    {
      id: '1',
      userId: 'user1',
      username: 'SkinCareEnthusiast',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
      message: 'Has anyone tried the new CeraVe cleanser? I\'m looking for something gentle for sensitive skin.',
      timestamp: new Date(Date.now() - 300000),
      channel: selectedChannel,
      reactions: [
        { emoji: '👍', count: 3, users: ['user2', 'user3', 'user4'] },
        { emoji: '❤️', count: 1, users: ['user5'] }
      ]
    },
    {
      id: '2',
      userId: 'user2',
      username: 'DrSkinExpert',
      avatar: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=150',
      message: 'I\'ve been using it for 3 months now and it\'s been great! Very gentle and doesn\'t strip the skin.',
      timestamp: new Date(Date.now() - 240000),
      channel: selectedChannel
    },
    {
      id: '3',
      userId: user?.id || 'current-user',
      username: user?.name || 'You',
      avatar: user?.avatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      message: 'Thanks for the recommendation! I\'ll definitely give it a try.',
      timestamp: new Date(Date.now() - 180000),
      channel: selectedChannel
    }
  ];

  useEffect(() => {
    setMessages(mockMessages);
    setOnlineUsers(['SkinCareEnthusiast', 'DrSkinExpert', 'AcneFighter', 'GlowUp2024']);
  }, [selectedChannel]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage: CommunityMessage = {
      id: Date.now().toString(),
      userId: user?.id || 'current-user',
      username: user?.name || 'You',
      avatar: user?.avatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      message: message.trim(),
      timestamp: new Date(),
      channel: selectedChannel
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');
  };

  const addReaction = (messageId: string, emoji: string) => {
    setMessages(prev =>
      prev.map(msg => {
        if (msg.id === messageId) {
          const reactions = msg.reactions || [];
          const existingReaction = reactions.find(r => r.emoji === emoji);
          
          if (existingReaction) {
            if (existingReaction.users.includes(user?.id || 'current-user')) {
              // Remove reaction
              return {
                ...msg,
                reactions: reactions.map(r =>
                  r.emoji === emoji
                    ? {
                        ...r,
                        count: r.count - 1,
                        users: r.users.filter(u => u !== (user?.id || 'current-user'))
                      }
                    : r
                ).filter(r => r.count > 0)
              };
            } else {
              // Add reaction
              return {
                ...msg,
                reactions: reactions.map(r =>
                  r.emoji === emoji
                    ? {
                        ...r,
                        count: r.count + 1,
                        users: [...r.users, user?.id || 'current-user']
                      }
                    : r
                )
              };
            }
          } else {
            // New reaction
            return {
              ...msg,
              reactions: [
                ...reactions,
                { emoji, count: 1, users: [user?.id || 'current-user'] }
              ]
            };
          }
        }
        return msg;
      })
    );
  };

  const selectedChannelInfo = channels.find(c => c.id === selectedChannel);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
      {/* Channels Sidebar */}
      <div className="lg:col-span-1">
        <Card className="h-full p-0 overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-green-600">
            <h2 className="text-lg font-semibold text-white">Community Channels</h2>
          </div>
          
          <div className="p-4 space-y-2">
            {channels.map((channel) => (
              <button
                key={channel.id}
                onClick={() => setSelectedChannel(channel.id)}
                className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                  selectedChannel === channel.id
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  <Hash className="w-4 h-4" />
                  <span className="font-medium">{channel.name}</span>
                </div>
                <p className="text-xs text-gray-500">{channel.memberCount} members</p>
              </button>
            ))}
          </div>

          {/* Online Users */}
          <div className="p-4 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Online ({onlineUsers.length})
            </h3>
            <div className="space-y-2">
              {onlineUsers.slice(0, 5).map((username, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm text-gray-600">{username}</span>
                </div>
              ))}
              {onlineUsers.length > 5 && (
                <p className="text-xs text-gray-500">+{onlineUsers.length - 5} more</p>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Chat Area */}
      <div className="lg:col-span-3">
        <Card className="h-full p-0 overflow-hidden flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Hash className="w-5 h-5 text-gray-600" />
              <div>
                <h3 className="font-semibold text-gray-900">{selectedChannelInfo?.name}</h3>
                <p className="text-sm text-gray-500">{selectedChannelInfo?.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" icon={Search} />
              <Button variant="ghost" size="sm" icon={Settings} />
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group"
              >
                <div className="flex items-start space-x-3">
                  <img
                    src={msg.avatar}
                    alt={msg.username}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-gray-900">{msg.username}</span>
                      <span className="text-xs text-gray-500">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-gray-700">{msg.message}</p>
                    
                    {/* Reactions */}
                    {msg.reactions && msg.reactions.length > 0 && (
                      <div className="flex items-center space-x-1 mt-2">
                        {msg.reactions.map((reaction, index) => (
                          <button
                            key={index}
                            onClick={() => addReaction(msg.id, reaction.emoji)}
                            className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs transition-colors ${
                              reaction.users.includes(user?.id || 'current-user')
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            <span>{reaction.emoji}</span>
                            <span>{reaction.count}</span>
                          </button>
                        ))}
                        <button
                          onClick={() => addReaction(msg.id, '👍')}
                          className="opacity-0 group-hover:opacity-100 w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-xs transition-all"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" icon={Paperclip} />
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={`Message #${selectedChannelInfo?.name}`}
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
        </Card>
      </div>
    </div>
  );
};