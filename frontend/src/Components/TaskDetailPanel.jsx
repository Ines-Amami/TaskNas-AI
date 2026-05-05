import { useDispatch } from 'react-redux';
import { selectTask, updateTask, deleteTask } from '../JS/actions/taskActions';
import { X, Calendar, ChevronRight, Trash2 } from 'lucide-react';

const STATUSES = [
  { key:'todo',       label:'To Do'       },
  { key:'inprogress', label:'In Progress' },
  { key:'review',     label:'Review'      },
  { key:'completed',  label:'Completed'   },
];

export default function TaskDetailPanel({ task }) {
  const dispatch = useDispatch();

  const toggleSubtask = (i) => {
    const updated = task.subtasks.map((s, idx) => idx === i ? { ...s, completed: !s.completed } : s);
    dispatch(updateTask(task._id, { subtasks: updated }));
  };

  return (
    <div className="w-64 bg-gray-900 border-l border-gray-800 h-full overflow-y-auto flex-shrink-0">
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <span className="text-white text-sm font-bold">Task Details</span>
        <button onClick={() => dispatch(selectTask(null))} className="text-gray-500 hover:text-white transition-colors">
          <X size={15} />
        </button>
      </div>

      <div className="p-4 space-y-4">
        <h3 className="text-white font-bold text-sm leading-snug">{task.title}</h3>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs px-2 py-1 bg-blue-500/15 text-blue-400 rounded-full border border-blue-500/25 font-medium">
            AI Priority: {task.priority}
          </span>
        </div>

        {task.dueDate && (
          <div className="flex items-center gap-2 text-gray-400 text-xs">
            <Calendar size={12} />
            <span>Due: {new Date(task.dueDate).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}</span>
          </div>
        )}

        {task.description && (
          <div>
            <p className="text-gray-500 text-xs font-bold uppercase mb-1.5">Description</p>
            <p className="text-gray-300 text-xs leading-relaxed">{task.description}</p>
          </div>
        )}

        {task.subtasks?.length > 0 && (
          <div>
            <p className="text-gray-500 text-xs font-bold uppercase mb-2">
              Subtasks ({task.subtasks.filter(s => s.completed).length}/{task.subtasks.length})
            </p>
            <div className="space-y-2">
              {task.subtasks.map((st, i) => (
                <label key={i} className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" checked={st.completed} onChange={() => toggleSubtask(i)}
                    className="w-3.5 h-3.5 accent-blue-500 cursor-pointer" />
                  <span className={`text-xs transition-colors ${st.completed ? 'line-through text-gray-600' : 'text-gray-300 group-hover:text-white'}`}>
                    {st.title}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        <div>
          <p className="text-gray-500 text-xs font-bold uppercase mb-2">Move to</p>
          <div className="flex flex-wrap gap-1.5">
            {STATUSES.filter(s => s.key !== task.status).map(s => (
              <button key={s.key} onClick={() => dispatch(updateTask(task._id, { status: s.key }))}
                className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700 rounded-lg px-2 py-1.5 transition-all flex items-center gap-1">
                {s.label}<ChevronRight size={10} />
              </button>
            ))}
          </div>
        </div>

        {task.tags?.length > 0 && (
          <div>
            <p className="text-gray-500 text-xs font-bold uppercase mb-2">Tags</p>
            <div className="flex flex-wrap gap-1">
              {task.tags.map(t => <span key={t} className="text-xs px-2 py-0.5 bg-indigo-500/15 text-indigo-400 rounded-full border border-indigo-500/25">{t}</span>)}
            </div>
          </div>
        )}

        <div className="text-gray-600 text-xs space-y-1 pt-2 border-t border-gray-800">
          <p>Created: {new Date(task.createdAt).toLocaleDateString()}</p>
          <p>Updated: {new Date(task.updatedAt).toLocaleDateString()}</p>
        </div>

        <button onClick={() => { dispatch(deleteTask(task._id)); dispatch(selectTask(null)); }}
          className="w-full flex items-center justify-center gap-2 bg-red-950 hover:bg-red-900 border border-red-900/60 text-red-400 rounded-xl py-2 text-xs font-bold transition-all">
          <Trash2 size={12} /> Delete Task
        </button>
      </div>
    </div>
  );
}