'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { motion, AnimatePresence } from 'framer-motion';
import { getBotResponse } from '@/features/chatbot/getbotresponse';

type ChatMessage = {
  from: 'user' | 'bot';
  text: string;
  isHTML?: boolean;
};

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const { user } = useKindeBrowserClient();
  const [firstOpen, setFirstOpen] = useState(true);

  useEffect(() => {
    if (open && firstOpen) {
      setMessages([
        {
          from: 'bot',
          text: 'Hello! How can I help you today?',
        },
      ]);
      setFirstOpen(false);
    }
  }, [open, firstOpen]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { from: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    const botReply = getBotResponse(input);

    const botMessage: ChatMessage =
      typeof botReply === 'string'
        ? { from: 'bot', text: botReply }
        : {
            from: 'bot',
            text: botReply.text,
            isHTML: botReply.isHTML,
          };

    setMessages((prev) => [...prev, botMessage]);
  };

  return (
    <div>
      <AnimatePresence>
        {!open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-3 shadow-lg cursor-pointer z-50"
            onClick={() => setOpen(true)}
          >
            <MessageCircle size={24} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="fixed bottom-6 right-6 w-[350px] h-[460px] bg-white rounded-xl shadow-xl z-50 flex flex-col overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-blue-600 text-white flex justify-between items-center px-4 py-2"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-2"
              >
                <motion.img
                  src="/images/chatbot.png"
                  alt="bot"
                  className="w-7 h-7"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                />
                <div className="text-sm">
                  <p className="font-semibold leading-tight">HireLens Bot</p>
                  <p className="text-xs opacity-80 -mt-1">Online</p>
                </div>
              </motion.div>
              <X className="cursor-pointer" size={20} onClick={() => setOpen(false)} />
            </motion.div>

            <div className="flex-1 p-3 space-y-2 overflow-y-auto text-[15px] scrollbar-thin scrollbar-thumb-blue-200">
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-center text-gray-400 mt-10 italic"
                >
                  🙏 Jai Shree Ram! Har Har Mahadev! Satsriakaal! <br />
                  Ask me anything about resumes, cover letters, or tools!
                </motion.div>
              )}

              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: msg.from === 'user' ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className={`px-3 py-2 rounded-lg max-w-[85%] whitespace-pre-line ${
                    msg.from === 'user'
                      ? 'bg-gray-100 self-end ml-auto'
                      : 'bg-blue-100 font-medium self-start'
                  }`}
                >
                  {msg.isHTML ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      dangerouslySetInnerHTML={{ __html: msg.text }}
                    />
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {msg.text}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-2 border-t flex items-center bg-gray-50"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 border px-3 py-2 rounded-l-md text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                placeholder="Type your message..."
              />
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                onClick={handleSend}
                className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors"
              >
                Send
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBot;
