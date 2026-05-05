import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { aiChatAPI } from '../services/api';
import { X, Send, Bot, Loader2 } from 'lucide-react';

export default function AIChat({ onClose }) {
  const { tasks } = useSelector((s) => s.tasks);
  const [msgs,    setMsgs]    = useState([{ role:'assistant', text:"👋 Hi! I'm your Gemini AI assistant. Ask me anything about your tasks or project!" }]);
  const [input,   setInput]   = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:'smooth' }); }, [msgs]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role:'user', text: input };
    setMsgs(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const { data } = await aiChatAPI(input, tasks, msgs);
      setMsgs(prev => [...prev, { role:'assistant', text: data.reply }]);
    } catch {
      setMsgs(prev => [...prev, { role:'assistant', text:'Sorry, I had trouble connecting. Make sure your GEMINI_API_KEY is in backend/.env' }]);
    }
    setLoading(false);
  };

  return (
    <div className="fixed bottom-5 right-5 w-80 h-[440px] bg-gray-900 border border-gray-700 rounded-2xl flex flex-col shadow-2xl z-50">
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Bot size={16} className="text-white" />
          </div>
          <div>
            <p className="text-white text-sm font-bold">Gemini AI</p>
            <p className="text-green-400 text-xs flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" /> Online
            </p>
          </div>
        </div>
        <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors"><X size={16} /></button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {msgs.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] text-xs leading-relaxed p-3 rounded-2xl ${m.role === 'user' ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-br-sm' : 'bg-gray-800 text-gray-200 rounded-bl-sm'}`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-800 text-gray-400 p-3 rounded-2xl rounded-bl-sm flex items-center gap-2 text-xs">
              <Loader2 size={12} className="animate-spin" /> Gemini thinking…
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="p-3 border-t border-gray-800 flex gap-2">
        <input value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          className="flex-1 bg-gray-800 border border-gray-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500 placeholder-gray-600"
          placeholder="Ask about your project…" />
        <button onClick={send} disabled={loading || !input.trim()}
          className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-2 text-white disabled:opacity-40 transition-opacity">
          <Send size={14} />
        </button>
      </div>
    </div>
  );
}