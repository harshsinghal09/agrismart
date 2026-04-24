import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sprout } from 'lucide-react';
import axios from 'axios';

const QUICK = [
  'Best crops for black soil in Maharashtra?',
  'How much urea for 1 acre wheat?',
  'Signs of nitrogen deficiency?',
  'When to sow Kharif crops?',
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hello! I\'m your AgriSmart AI assistant 🌱 Ask me anything about farming, crops, or soil.' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async (text) => {
    const q = text || input.trim();
    if (!q || loading) return;
    setInput('');
    setMessages((m) => [...m, { role: 'user', text: q }]);
    setLoading(true);
    try {
      const history = messages.map((m) => ({ role: m.role, parts: [{ text: m.text }] }));
      const res = await axios.post('/api/chat', { message: q, history });
      setMessages((m) => [...m, { role: 'assistant', text: res.data.reply }]);
    } catch {
      setMessages((m) => [...m, { role: 'assistant', text: 'Sorry, I couldn\'t connect right now. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${
          open ? 'bg-red-600 hover:bg-red-500' : 'bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 shadow-green-900/50'
        }`}
      >
        {open ? <X size={22} className="text-white" /> : <MessageCircle size={22} className="text-white" />}
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full text-[9px] font-bold text-green-950 flex items-center justify-center">AI</span>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 flex flex-col rounded-2xl border border-green-700/40 bg-green-950/98 backdrop-blur-xl shadow-2xl shadow-black/60 overflow-hidden"
          style={{ maxHeight: '500px' }}>
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-green-900 to-emerald-900 border-b border-green-700/40">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg flex items-center justify-center">
              <Sprout size={16} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">AgriSmart Assistant</p>
              <p className="text-xs text-green-400"></p>
            </div>
            <div className="ml-auto w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ minHeight: 0, maxHeight: '300px' }}>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-amber-500 text-green-950 font-medium rounded-br-sm'
                    : 'bg-green-900/60 text-green-100 border border-green-700/30 rounded-bl-sm'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-green-900/60 border border-green-700/30 px-3 py-2 rounded-xl rounded-bl-sm">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <span key={i} className="w-1.5 h-1.5 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick prompts */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {QUICK.map((q) => (
                <button key={q} onClick={() => send(q)}
                  className="text-xs px-2 py-1 rounded-lg bg-green-900/50 border border-green-700/40 text-green-300 hover:border-green-500 hover:text-green-100 transition-colors text-left">
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-3 border-t border-green-800/40 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Ask about farming..."
              className="flex-1 bg-green-900/40 border border-green-700/40 rounded-xl px-3 py-2 text-sm text-green-100 placeholder-green-600 focus:outline-none focus:border-green-500 transition-colors"
            />
            <button onClick={() => send()}
              disabled={!input.trim() || loading}
              className="w-9 h-9 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl flex items-center justify-center transition-colors flex-shrink-0">
              <Send size={15} className="text-green-950" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
