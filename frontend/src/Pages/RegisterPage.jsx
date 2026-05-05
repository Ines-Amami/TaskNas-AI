import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../JS/actions/authActions';
import { Zap, User, Mail, Lock, Loader2 } from 'lucide-react';

export default function RegisterPage() {
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector((s) => s.auth);

  const fields = [
    { label:'Full Name', value:name,     set:setName,     type:'text',     icon:User, ph:'Full Name' },
    { label:'Email',     value:email,    set:setEmail,    type:'email',    icon:Mail, ph:'you@example.com' },
    { label:'Password',  value:password, set:setPassword, type:'password', icon:Lock, ph:'Min 6 characters' },
  ];

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
          <h1 className="text-white text-2xl font-black mb-1">Create account</h1>
          <p className="text-gray-400 text-sm mb-6">Join your AI-powered team workspace</p>

          {error && (
            <div className="bg-red-950 border border-red-800 text-red-400 rounded-xl p-3 mb-4 text-sm">{error}</div>
          )}

          <div className="space-y-4">
            {fields.map(({ label, value, set, type, icon: Icon, ph }) => (
              <div key={label}>
                <label className="text-gray-400 text-xs font-bold uppercase block mb-2">{label}</label>
                <div className="relative">
                  <Icon size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input type={type} value={value} onChange={e => set(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder={ph} />
                </div>
              </div>
            ))}

            <button onClick={() => dispatch(register(name, email, password))} disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl py-3 text-sm font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-60 shadow-lg shadow-blue-500/20">
              {loading ? <><Loader2 size={15} className="animate-spin" /> Creating…</> : 'Create Account'}
            </button>
          </div>

          <p className="text-gray-500 text-sm text-center mt-5">
            Have an account?{' '}
            <Link to="/login" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}