import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../JS/actions/authActions';
import { Zap, Mail, Lock, Loader2, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector((s) => s.auth);

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md">

        <div className="flex items-center gap-3 justify-center mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Zap size={20} className="text-white" />
          </div>
          <span className="text-white text-2xl font-black tracking-tight">TaskNas AI</span>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">
          <h1 className="text-white text-2xl font-black mb-1">Welcome back 👋</h1>
          <p className="text-gray-400 text-sm mb-5">Sign in to your AI-powered workspace</p>

          <div className="flex items-center gap-2 bg-indigo-950 border border-indigo-800/60 rounded-xl p-3 mb-6">
            <Sparkles size={14} className="text-indigo-400 flex-shrink-0" />
            <p className="text-indigo-300 text-xs">Powered by Google Gemini AI — your API key is safe in the backend!</p>
          </div>

          {error && (
            <div className="bg-red-950 border border-red-800 text-red-400 rounded-xl p-3 mb-4 text-sm">{error}</div>
          )}

          <div className="space-y-4">
            <div>
              <label className="text-gray-400 text-xs font-bold uppercase block mb-2">Email</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && dispatch(login(email, password))}
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="you@example.com" />
              </div>
            </div>

            <div>
              <label className="text-gray-400 text-xs font-bold uppercase block mb-2">Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && dispatch(login(email, password))}
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="••••••••" />
              </div>
            </div>

            <button onClick={() => dispatch(login(email, password))} disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl py-3 text-sm font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-60 shadow-lg shadow-blue-500/20">
              {loading ? <><Loader2 size={15} className="animate-spin" /> Signing in…</> : 'Sign In'}
            </button>
          </div>

          <p className="text-gray-500 text-sm text-center mt-5">
            No account?{' '}
            <Link to="/register" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">Create one free</Link>
          </p>
        </div>
      </div>
    </div>
  );
}