import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Send, Sparkles, User, Building, Clock, CheckCheck } from 'lucide-react';

export const ChatDrawer: React.FC = () => {
  const {
    isChatDrawerOpen,
    setIsChatDrawerOpen,
    chatPartner,
    setChatPartner,
    messages,
    sendMessage,
    role,
    student,
    employer
  } = useApp();

  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Default partner if none selected
  const activePartner = chatPartner || {
    id: role === 'student' ? employer.id : student.id,
    name: role === 'student' ? employer.companyName : student.fullName,
    avatar: role === 'student' ? employer.logo : student.avatar,
    role: (role === 'student' ? 'employer' : 'student') as 'student' | 'employer',
    jobTitle: 'Event Assistant - Mediterranean Tech Summit'
  };

  const currentUserId = role === 'student' ? student.id : employer.id;

  // Filter messages relevant to this conversation
  const thread = messages.filter(
    m =>
      (m.senderId === currentUserId && m.recipientId === activePartner.id) ||
      (m.senderId === activePartner.id && m.recipientId === currentUserId)
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [thread, isChatDrawerOpen]);

  if (!isChatDrawerOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    sendMessage(activePartner.id, inputMessage, activePartner.jobId, activePartner.jobTitle);
    setInputMessage('');
  };

  const handleQuickReply = (text: string) => {
    sendMessage(activePartner.id, text, activePartner.jobId, activePartner.jobTitle);
  };

  const quickReplies = role === 'student'
    ? [
        'I have arrived at the venue lobby!',
        'Is parking available nearby?',
        'Can you confirm the required dress code?',
        'Thank you so much!'
      ]
    : [
        'Welcome to the team! See you at briefing.',
        'Please check in via your GetBoth digital pass.',
        'Great work today, payout is approved!',
        'Any questions before starting?'
      ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-navy-900/50 backdrop-blur-xs animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-float border-l border-slate-200 flex flex-col h-full animate-slide-in-right">
          
          {/* Header */}
          <div className="p-4 bg-navy text-white flex items-center justify-between border-b border-navy-700">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={activePartner.avatar}
                  alt={activePartner.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-fresh bg-white"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-navy"></span>
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-sm text-white leading-tight flex items-center gap-1.5 font-display">
                  <span className="truncate">{activePartner.name}</span>
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-fresh/20 text-fresh border border-fresh/30 uppercase shrink-0 font-display">
                    {activePartner.role}
                  </span>
                </h3>
                {activePartner.jobTitle && (
                  <p className="text-[11px] text-slate-300 truncate max-w-[200px]">
                    {activePartner.jobTitle}
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={() => setIsChatDrawerOpen(false)}
              className="p-2 rounded-full hover:bg-navy-600 text-slate-300 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick info bar */}
          <div className="px-4 py-2 bg-blush/40 border-b border-blush-200 flex items-center justify-between text-[11px] text-steel font-medium">
            <span className="flex items-center gap-1 font-display">
              <Sparkles className="w-3.5 h-3.5 text-tunisian" />
              <span>GetBoth Secure Direct Messaging</span>
            </span>
            <span className="text-slate-400">Tunisia Time (GMT+1)</span>
          </div>

          {/* Message Thread */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FAFBFD]">
            {thread.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs">
                <p className="font-semibold text-slate-500">No messages yet in this thread.</p>
                <p className="mt-1">Say hello or confirm details below!</p>
              </div>
            ) : (
              thread.map(msg => {
                const isMe = msg.senderId === currentUserId;
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} animate-fade-in`}
                  >
                    <div
                      className={`max-w-[82%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        isMe
                          ? 'bg-navy text-white rounded-br-xs shadow-sm'
                          : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs shadow-xs'
                      }`}
                    >
                      {msg.content}
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-400 px-1">
                      <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      {isMe && <CheckCheck className="w-3.5 h-3.5 text-fresh" />}
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Reply Pills */}
          <div className="p-2.5 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {quickReplies.map((r, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleQuickReply(r)}
                className="whitespace-nowrap px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 text-[11px] font-medium transition shrink-0 btn-press"
              >
                {r}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={e => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 h-11 text-xs sm:text-sm px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-fresh/30 focus:border-fresh bg-slate-50/50"
            />
            <button
              type="submit"
              className="h-11 px-4 rounded-xl bg-navy hover:bg-navy-600 text-white font-bold transition shadow-sm hover:scale-105 active:scale-95 flex items-center justify-center btn-press"
            >
              <Send className="w-4 h-4 text-sunny" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
