import { useSelector } from 'react-redux';
import { Plus } from 'lucide-react';
import TaskCard from './TaskCard';

const cfg = {
  todo:       { label:'To Do',       dot:'bg-gray-500',   color:'text-gray-400'   },
  inprogress: { label:'In Progress', dot:'bg-blue-500',   color:'text-blue-400'   },
  review:     { label:'Review',      dot:'bg-orange-500', color:'text-orange-400' },
  completed:  { label:'Completed',   dot:'bg-green-500',  color:'text-green-400'  },
};

export default function KanbanColumn({ status, tasks, onAddTask }) {
  const { selectedTask } = useSelector((s) => s.tasks);
  const { label, dot, color } = cfg[status];
  const cols = tasks.filter(t => t.status === status);

  return (
    <div className="flex-1 min-w-[220px] max-w-[275px]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${dot}`} />
          <span className={`text-sm font-bold ${color}`}>{label}</span>
          <span className="text-xs text-gray-500 bg-gray-800 rounded-full px-1.5 py-0.5">{cols.length}</span>
        </div>
        <button onClick={() => onAddTask(status)} className="text-gray-500 hover:text-white hover:bg-gray-700 rounded-lg p-1 transition-all">
          <Plus size={14} />
        </button>
      </div>

      <div className="space-y-2.5 min-h-[40px]">
        {cols.map(task => <TaskCard key={task._id} task={task} isSelected={selectedTask?._id === task._id} />)}
      </div>

      <button onClick={() => onAddTask(status)}
        className="mt-3 w-full border border-dashed border-gray-700 hover:border-gray-500 rounded-xl text-gray-500 hover:text-white text-xs py-2 flex items-center justify-center gap-1.5 transition-all">
        <Plus size={12} /> Add Task
      </button>
    </div>
  );
}