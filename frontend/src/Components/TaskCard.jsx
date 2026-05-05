import { useDispatch } from 'react-redux';
import { selectTask } from '../JS/actions/taskActions';
import { Calendar, MessageSquare } from 'lucide-react';

const pStyle = { High:'bg-red-500/15 text-red-400 border border-red-500/25', Medium:'bg-yellow-500/15 text-yellow-400 border border-yellow-500/25', Low:'bg-green-500/15 text-green-400 border border-green-500/25', Urgent:'bg-red-600/20 text-red-300 border border-red-600/30' };
const tStyle = { Backend:'bg-blue-500/15 text-blue-400', Frontend:'bg-purple-500/15 text-purple-400', Research:'bg-cyan-500/15 text-cyan-400', Setup:'bg-gray-500/15 text-gray-400', 'AI/ML':'bg-emerald-500/15 text-emerald-400', Review:'bg-orange-500/15 text-orange-400', Security:'bg-red-500/15 text-red-400', Docs:'bg-indigo-500/15 text-indigo-400', Testing:'bg-violet-500/15 text-violet-400', DevOps:'bg-teal-500/15 text-teal-400' };

export default function TaskCard({ task, isSelected }) {
  const dispatch = useDispatch();
  return (
    <div onClick={() => dispatch(selectTask(task))}
      className={`rounded-xl p-3 cursor-pointer transition-all border ${isSelected ? 'bg-blue-950 border-blue-500 shadow-lg shadow-blue-500/10' : 'bg-gray-800 border-gray-700 hover:border-gray-600'}`}>
      <div className="flex flex-wrap gap-1 mb-2">
        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${pStyle[task.priority] || pStyle.Medium}`}>{task.priority}</span>
        {task.tags?.map(t => <span key={t} className={`text-xs px-2 py-0.5 rounded-full font-medium ${tStyle[t] || 'bg-gray-600/20 text-gray-400'}`}>{t}</span>)}
      </div>
      <h3 className="text-white text-sm font-semibold mb-3 leading-snug">{task.title}</h3>
      <div className="flex items-center justify-between text-gray-500">
        <span className="flex items-center gap-1 text-xs">
          <Calendar size={11} />
          {task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-US',{month:'short',day:'numeric'}) : 'No date'}
        </span>
        {task.comments?.length > 0 && (
          <span className="flex items-center gap-1 text-xs"><MessageSquare size={11} />{task.comments.length}</span>
        )}
      </div>
    </div>
  );
}