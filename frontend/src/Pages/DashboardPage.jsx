import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, createTask, deleteTask, selectTask } from '../JS/actions/taskActions';
import { aiDescribeAPI } from '../services/api';
import Sidebar         from '../Components/Sidebar';
import KanbanColumn    from '../Components/KanbanColumn';
import TaskDetailPanel from '../Components/TaskDetailPanel';
import AIInsightsPanel from '../Components/AIInsightsPanel';
import GoalBar         from '../Components/GoalBar';
import AIChat          from '../Components/AIChat';
import { Search, Bell, Settings, Plus, LayoutGrid, List, X, Loader2, Bot, Sparkles } from 'lucide-react';

const COLS = ['todo','inprogress','review','completed'];

export default function DashboardPage() {
  const dispatch = useDispatch();
  const { tasks, loading, selectedTask } = useSelector((s) => s.tasks);
  const { userInfo }                     = useSelector((s) => s.auth);

  const [showModal,    setShowModal]    = useState(false);
  const [modalStatus,  setModalStatus]  = useState('todo');
  const [activeView,   setActiveView]   = useState('Board');
  const [search,       setSearch]       = useState('');
  const [showChat,     setShowChat]     = useState(false);
  const [descLoading,  setDescLoading]  = useState(false);
  const [form, setForm] = useState({ title:'', priority:'Medium', tags:'', dueDate:'', description:'' });

  useEffect(() => { dispatch(fetchTasks()); }, [dispatch]);

  const openModal = (status) => {
    setModalStatus(status);
    setForm({ title:'', priority:'Medium', tags:'', dueDate:'', description:'' });
    setShowModal(true);
  };

  const handleAIFill = async () => {
    if (!form.title.trim()) return;
    setDescLoading(true);
    try {
      const { data } = await aiDescribeAPI(form.title);
      setForm(f => ({ ...f, description: data.description }));
    } catch { /* silent */ }
    setDescLoading(false);
  };

  const handleCreate = async () => {
    if (!form.title.trim()) return;
    await dispatch(createTask({
      title:       form.title,
      priority:    form.priority,
      status:      modalStatus,
      tags:        form.tags.split(',').map(t => t.trim()).filter(Boolean),
      dueDate:     form.dueDate ? new Date(form.dueDate) : undefined,
      description: form.description,
    }));
    setShowModal(false);
  };

  const filtered = tasks.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.tags?.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="flex h-screen bg-gray-950 overflow-hidden font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="bg-gray-900 border-b border-gray-800 px-6 py-3 flex items-center justify-between flex-shrink-0">
          <div className="relative flex-1 max-w-sm">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 text-gray-300 rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-blue-500 placeholder-gray-600"
              placeholder="Search tasks or tags…" />
          </div>
          <div className="flex items-center gap-3">
            {[Settings, Bell].map((Icon, i) => (
              <button key={i} className="text-gray-500 hover:text-white transition-colors"><Icon size={17} /></button>
            ))}
            <div className="flex items-center gap-2 border-l border-gray-800 pl-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-black">
                {userInfo?.name?.[0]?.toUpperCase()}
              </div>
              <div className="hidden md:block">
                <p className="text-white text-xs font-semibold">{userInfo?.name}</p>
                <p className="text-gray-500 text-xs">Product Manager</p>
              </div>
            </div>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 overflow-auto p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <h1 className="text-white text-2xl font-black tracking-tight">The Task Hub</h1>
                <p className="text-gray-400 text-sm mt-0.5">Plan, prioritize, and track with Google Gemini AI</p>
              </div>
              <button onClick={() => openModal('todo')}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl px-4 py-2.5 text-sm font-bold transition-all shadow-lg shadow-blue-500/20">
                <Plus size={15} /> New Task
              </button>
            </div>

            <GoalBar />

            {/* View tabs */}
            <div className="flex border-b border-gray-800 mb-5 gap-1">
              {[{l:'Board',i:LayoutGrid},{l:'List',i:List}].map(({ l, i: Icon }) => (
                <button key={l} onClick={() => setActiveView(l)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px transition-all ${activeView === l ? 'text-blue-400 border-blue-500' : 'text-gray-500 border-transparent hover:text-white'}`}>
                  <Icon size={14} /> {l}
                </button>
              ))}
            </div>

            {/* Board */}
            {activeView === 'Board' && (
              loading
                ? <div className="flex items-center justify-center h-48"><Loader2 size={28} className="text-blue-400 animate-spin" /></div>
                : <div className="flex gap-4 overflow-x-auto pb-4">
                    {COLS.map(s => <KanbanColumn key={s} status={s} tasks={filtered} onAddTask={openModal} />)}
                  </div>
            )}

            {/* List */}
            {activeView === 'List' && (
              <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
                <div className="grid grid-cols-[1fr_130px_100px_90px_70px] gap-4 px-4 py-3 border-b border-gray-800 text-xs text-gray-500 font-bold uppercase tracking-wider">
                  <span>Task</span><span>Status</span><span>Priority</span><span>Due</span><span>Action</span>
                </div>
                {filtered.length === 0 && (
                  <p className="text-gray-600 text-sm text-center py-8">No tasks yet — create one above!</p>
                )}
                {filtered.map(t => (
                  <div key={t._id} onClick={() => dispatch(selectTask(t))}
                    className="grid grid-cols-[1fr_130px_100px_90px_70px] gap-4 px-4 py-3 border-b border-gray-800 items-center hover:bg-gray-800 transition-colors cursor-pointer">
                    <span className="text-white text-sm font-medium truncate">{t.title}</span>
                    <span className={`text-xs font-medium capitalize px-2 py-0.5 rounded-full w-fit ${t.status === 'completed' ? 'bg-green-500/15 text-green-400' : t.status === 'inprogress' ? 'bg-blue-500/15 text-blue-400' : t.status === 'review' ? 'bg-orange-500/15 text-orange-400' : 'bg-gray-500/15 text-gray-400'}`}>
                      {t.status}
                    </span>
                    <span className="text-xs text-yellow-400 font-medium">{t.priority}</span>
                    <span className="text-xs text-gray-400">{t.dueDate ? new Date(t.dueDate).toLocaleDateString('en-US',{month:'short',day:'numeric'}) : '—'}</span>
                    <button onClick={e => { e.stopPropagation(); dispatch(deleteTask(t._id)); }}
                      className="text-xs text-red-400 hover:text-red-300 font-medium transition-colors">Del</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <AIInsightsPanel />
          {selectedTask && <TaskDetailPanel task={selectedTask} />}
        </div>
      </div>

      {/* AI Chat button */}
      {!showChat && (
        <button onClick={() => setShowChat(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-indigo-500/30 hover:scale-105 transition-transform z-40">
          <Bot size={24} />
        </button>
      )}

      {showChat && <AIChat onClose={() => setShowChat(false)} />}

      {/* Add Task Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-white font-black text-lg">New Task</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-white transition-colors"><X size={18} /></button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-xs font-bold uppercase block mb-2">Title *</label>
                <div className="flex gap-2">
                  <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                    className="flex-1 bg-gray-800 border border-gray-700 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Task title…" />
                  <button onClick={handleAIFill} disabled={descLoading || !form.title.trim()}
                    title="AI: auto-fill description from title"
                    className="flex items-center gap-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-700/60 text-indigo-300 rounded-xl px-3 py-2 text-xs font-bold disabled:opacity-40 transition-all flex-shrink-0">
                    {descLoading ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />} AI
                  </button>
                </div>
              </div>

              <div>
                <label className="text-gray-400 text-xs font-bold uppercase block mb-2">
                  Description <span className="text-gray-600 normal-case font-normal">(or click AI button above)</span>
                </label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none h-20"
                  placeholder="Describe this task…" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-400 text-xs font-bold uppercase block mb-2">Priority</label>
                  <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500">
                    {['Urgent','High','Medium','Low'].map(p => <option key={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-gray-400 text-xs font-bold uppercase block mb-2">Due Date</label>
                  <input type="date" value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500" />
                </div>
              </div>

              <div>
                <label className="text-gray-400 text-xs font-bold uppercase block mb-2">Tags <span className="text-gray-600 normal-case font-normal">(comma-separated)</span></label>
                <input value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Backend, Frontend, AI/ML…" />
              </div>

              <div className="flex gap-3 pt-1">
                <button onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-800 border border-gray-700 hover:bg-gray-700 text-gray-300 rounded-xl py-2.5 text-sm font-bold transition-all">Cancel</button>
                <button onClick={handleCreate}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl py-2.5 text-sm font-bold transition-all shadow-lg shadow-blue-500/20">
                  Create Task
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}