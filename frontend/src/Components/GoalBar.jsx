import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTask } from '../JS/actions/taskActions';
import { aiGoalAPI } from '../services/api';
import { Sparkles, Loader2 } from 'lucide-react';

export default function GoalBar() {
  const [goal,    setGoal]    = useState('');
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');
  const dispatch = useDispatch();

  const handleGenerate = async () => {
    if (!goal.trim()) return;
    setLoading(true);
    setError('');
    try {
      const { data } = await aiGoalAPI(goal);
      for (const t of data.tasks) {
        await dispatch(createTask({
          title:       t.title,
          priority:    t.priority   || 'Medium',
          tags:        t.tags       || ['Setup'],
          description: t.description || '',
          status:      'todo',
          subtasks:    (t.subtasks || []).map(s => ({ title: s, completed: false })),
          dueDate:     t.dueDate ? new Date(t.dueDate) : new Date(Date.now() + 7 * 86400000),
        }));
      }
      setGoal('');
    } catch (err) {
      setError(err.response?.data?.message || 'AI failed — check backend GEMINI_API_KEY in .env');
    }
    setLoading(false);
  };

  return (
    <div className="mb-5">
      <div className="flex items-center gap-3 bg-gray-900 border border-indigo-900/60 rounded-xl px-4 py-3">
        {loading ? <Loader2 size={16} className="text-indigo-400 animate-spin flex-shrink-0" /> : <Sparkles size={16} className="text-indigo-400 flex-shrink-0" />}
        <input value={goal} onChange={e => setGoal(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleGenerate()}
          disabled={loading}
          className="flex-1 bg-transparent text-gray-300 placeholder-gray-600 text-sm focus:outline-none"
          placeholder='Type a goal → Gemini AI creates tasks. Try: "Build a user login system"' />
        <button onClick={handleGenerate} disabled={loading || !goal.trim()}
          className="flex-shrink-0 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-700/60 text-indigo-300 text-xs font-bold px-3 py-1.5 rounded-lg transition-all disabled:opacity-40 flex items-center gap-1.5">
          {loading ? 'Thinking…' : '✨ Generate'}
        </button>
      </div>
      {error && <p className="text-red-400 text-xs mt-2 px-1">{error}</p>}
    </div>
  );
}