import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../JS/actions/authActions';
import { Zap, Sun, Flag, Calendar, LayoutGrid, AlignLeft, Sparkles, FolderOpen, Users, BarChart2, LogOut, Plus } from 'lucide-react';

const Item = ({ icon, label, active, badge }) => (
  <div className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer text-sm transition-all ${active ? 'bg-blue-600/15 text-blue-400 font-semibold' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
    <div className="flex items-center gap-2.5">{icon}<span>{label}</span></div>
    {badge != null && <span className="text-xs bg-gray-700 text-gray-300 rounded-full px-1.5 py-0.5">{badge}</span>}
  </div>
);

export default function Sidebar() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((s) => s.auth);
  const { tasks }    = useSelector((s) => s.tasks);

  return (
    <aside className="w-52 bg-gray-900 border-r border-gray-800 h-screen flex flex-col flex-shrink-0 overflow-y-auto">
      <div className="flex items-center gap-2.5 px-4 py-4 border-b border-gray-800">
        <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <Zap size={14} className="text-white" />
        </div>
        <span className="text-white font-black text-sm tracking-tight">TaskNas AI</span>
      </div>

      <div className="px-4 py-3 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-blue-700 rounded-lg flex items-center justify-center text-white text-xs font-black flex-shrink-0">T</div>
          <div>
            <p className="text-white text-xs font-bold">EDROH TEAM</p>
            <p className="text-gray-500 text-xs">🔒 Private</p>
          </div>
        </div>
      </div>

      <div className="flex-1 px-2 py-2 space-y-0.5 overflow-y-auto">
        <Item icon={<Sun size={13} />}                                          label="My Day" />
        <Item icon={<Flag size={13} className="text-red-400" />}                label="High Priority" active />
        <Item icon={<Calendar size={13} />}                                     label="Upcoming" />

        <p className="text-gray-600 text-xs font-bold uppercase tracking-wider px-3 pt-4 pb-1">My Work</p>
        <Item icon={<LayoutGrid size={13} />}  label="Task Hub" />
        <Item icon={<AlignLeft size={13} />}   label="Timeline" />
        <Item icon={<LayoutGrid size={13} />}  label="Board" badge={tasks.length} />
        <Item icon={<Calendar size={13} />}    label="Calendar" />
        <Item icon={<Sparkles size={13} className="text-indigo-400" />} label="AI Insights" />

        <div className="flex items-center justify-between px-3 pt-4 pb-1">
          <p className="text-gray-600 text-xs font-bold uppercase tracking-wider">Projects</p>
          <Plus size={12} className="text-gray-600 cursor-pointer hover:text-white transition-colors" />
        </div>
        {['Full-Stack Project','QA Certification','Mobile App Redesign','Website Revamp'].map(p => (
          <div key={p} className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer text-xs text-gray-400 hover:bg-gray-800 hover:text-white transition-all">
            <FolderOpen size={12} /><span className="truncate">{p}</span>
          </div>
        ))}

        <p className="text-gray-600 text-xs font-bold uppercase tracking-wider px-3 pt-4 pb-1">Teams</p>
        {[{icon:<Users size={12}/>,l:'Team Members'},{icon:<BarChart2 size={12}/>,l:'Workload'},{icon:<AlignLeft size={12}/>,l:'Reports'}].map(({icon,l})=>(
          <div key={l} className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer text-xs text-gray-400 hover:bg-gray-800 hover:text-white transition-all">
            {icon}<span>{l}</span>
          </div>
        ))}

        <p className="text-gray-600 text-xs font-bold uppercase tracking-wider px-3 pt-4 pb-1">Priority</p>
        {[['Urgent','bg-red-500'],['High','bg-orange-500'],['Medium','bg-yellow-500'],['Low','bg-green-500'],['Backlog','bg-gray-500']].map(([l,c])=>(
          <div key={l} className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer text-xs text-gray-400 hover:bg-gray-800 hover:text-white transition-all">
            <span className={`w-2 h-2 rounded-full ${c} flex-shrink-0`} /><span>{l}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-black flex-shrink-0">
            {userInfo?.name?.[0]?.toUpperCase()}
          </div>
          <div>
            <p className="text-white text-xs font-semibold truncate max-w-[80px]">{userInfo?.name}</p>
            <p className="text-gray-500 text-xs">Product Manager</p>
          </div>
        </div>
        <button onClick={() => dispatch(logout())} className="text-gray-500 hover:text-red-400 transition-colors p-1">
          <LogOut size={14} />
        </button>
      </div>
    </aside>
  );
}