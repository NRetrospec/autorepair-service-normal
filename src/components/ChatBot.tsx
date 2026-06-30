import { useApp } from '@/store/AppContext';
import { cn } from '@/utils/cn';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { useState } from 'react';

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  time: string;
}

const initialMessages: Message[] = [
  { id: 1, text: "👋 Hi! I'm Apex Auto's virtual assistant. How can I help you today?", sender: 'bot', time: 'Now' },
];

const quickReplies = ['Book appointment', 'Check repair status', 'Get an estimate', 'Business hours', 'Location'];

const botResponses: Record<string, string> = {
  'book appointment': "I'd be happy to help you book an appointment! You can use our online booking system for real-time scheduling. Would you like me to take you there? 📅",
  'check repair status': "To check your repair status, I'll need your order number or phone number. You can also use our Track Repair page for real-time updates! 🔧",
  'get an estimate': "We offer free estimates for most services! You can request one online, or call us at (555) 123-4567. Our certified technicians will assess your vehicle and provide a transparent quote. 💰",
  'business hours': "We're open:\n📅 Mon-Fri: 7:30 AM - 6:00 PM\n📅 Saturday: 8:00 AM - 4:00 PM\n📅 Sunday: Closed\n\nFor emergencies, call (555) 999-0000 🚨",
  'location': "We're located at 1234 Auto Drive, Springfield, IL 62701. Free parking available! 📍\n\nEasy access from I-72. We're right next to Springfield Mall.",
};

export default function ChatBot() {
  const { chatOpen, toggleChat } = useApp();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), text, sender: 'user', time: 'Now' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      const key = Object.keys(botResponses).find(k => text.toLowerCase().includes(k));
      const response = key ? botResponses[key] : "Thanks for your message! For specific inquiries, please call us at (555) 123-4567 or use our online booking system. Our team will be happy to assist you! 😊";
      setMessages(prev => [...prev, { id: Date.now() + 1, text: response, sender: 'bot', time: 'Now' }]);
    }, 800);
  };

  return (
    <>
      {/* Chat Button */}
      {!chatOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-20 md:bottom-6 right-6 z-50 w-14 h-14 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-xl shadow-primary-600/30 flex items-center justify-center transition-all hover:scale-110 animate-float"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {chatOpen && (
        <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 w-[calc(100vw-2rem)] md:w-96 h-[500px] bg-white dark:bg-dark-800 rounded-2xl shadow-2xl border border-dark-200 dark:border-dark-700 flex flex-col overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-semibold text-white text-sm">Apex Assistant</p>
                <p className="text-xs text-primary-200">Online now</p>
              </div>
            </div>
            <button onClick={toggleChat} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map(msg => (
              <div key={msg.id} className={cn('flex gap-2', msg.sender === 'user' ? 'justify-end' : 'justify-start')}>
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-3.5 h-3.5 text-primary-600" />
                  </div>
                )}
                <div className={cn(
                  'max-w-[80%] px-3 py-2 rounded-2xl text-sm whitespace-pre-line',
                  msg.sender === 'user'
                    ? 'bg-primary-600 text-white rounded-br-md'
                    : 'bg-dark-100 dark:bg-dark-700 text-dark-900 dark:text-white rounded-bl-md'
                )}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Replies */}
          <div className="px-4 pb-2 flex flex-wrap gap-1.5">
            {quickReplies.map(reply => (
              <button
                key={reply}
                onClick={() => sendMessage(reply)}
                className="px-3 py-1.5 text-xs font-medium bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-full hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
              >
                {reply}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-dark-200 dark:border-dark-700">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 bg-dark-50 dark:bg-dark-700 rounded-xl text-sm text-dark-900 dark:text-white border-none focus:ring-2 focus:ring-primary-500 focus:outline-none"
              />
              <button onClick={() => sendMessage(input)} className="p-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
