import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { aiInsightsAPI } from '../services/api';
import { RefreshCw, Brain, TrendingUp, AlertTriangle } from 'lucide-react';

export default function AIInsightsPanel() {
  const { tasks = [] } = useSelector((s) => s.tasks || {});

  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔹 reusable function for button (outside useEffect)
  const handleRefresh = async () => {
    if (!tasks?.length) return;

    setLoading(true);
    try {
      const { data } = await aiInsightsAPI(tasks);
      setInsights(data);
    } catch {
      setInsights({
        sentiment: 'Calm',
        sentimentEmoji: '😌',
        productivityTrend: '+0%',
        tip: 'Keep up the great work!',
        riskAlert: 'No major risks detected.',
        summary: 'Workload looks manageable.',
      });
    }
    setLoading(false);
  };

  // 🔹 NO ESLint warning here anymore
  useEffect(() => {
    const loadInsights = async () => {
      if (!tasks?.length) return;

      setLoading(true);
      try {
        const { data } = await aiInsightsAPI(tasks);
        setInsights(data);
      } catch {
        setInsights({
          sentiment: 'Calm',
          sentimentEmoji: '😌',
          productivityTrend: '+0%',
          tip: 'Keep up the great work!',
          riskAlert: 'No major risks detected.',
          summary: 'Workload looks manageable.',
        });
      }
      setLoading(false);
    };

    loadInsights();
  }, [tasks]);

  const counts = ['todo', 'inprogress', 'review', 'completed'].map((s) => ({
    s,
    n: tasks.filter((t) => t.status === s).length,
  }));

  const labels = {
    todo: 'To Do',
    inprogress: 'In Progress',
    review: 'Review',
    completed: 'Completed',
  };

  const dots = {
    todo: 'bg-gray-500',
    inprogress: 'bg-blue-500',
    review: 'bg-orange-500',
    completed: 'bg-green-500',
  };

  return (
    <div className="w-56 bg-gray-900 border-l border-gray-800 h-full overflow-y-auto flex-shrink-0 p-4">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-white text-sm font-bold">AI Insights</span>
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="text-gray-500 hover:text-white transition-colors"
        >
          <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="bg-gray-800 rounded-xl p-3 animate-pulse h-16"
            />
          ))}
          <p className="text-gray-600 text-xs text-center">
            Gemini analyzing…
          </p>
        </div>
      )}

      {/* Insights */}
      {!loading && insights && (
        <>
          <div className="bg-gray-800 rounded-xl p-3 mb-3">
            <p className="text-gray-500 text-xs font-bold uppercase mb-2">
              Workload
            </p>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{insights.sentimentEmoji}</span>
              <div>
                <p className="text-white text-sm font-bold">
                  {insights.sentiment}
                </p>
                <p className="text-gray-400 text-xs line-clamp-1">
                  {insights.summary}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-3 mb-3">
            <p className="text-gray-500 text-xs font-bold uppercase mb-2">
              Productivity
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-400 text-xl font-black">
                  {insights.productivityTrend}
                </p>
                <p className="text-gray-500 text-xs">vs last week</p>
              </div>
              <TrendingUp size={24} className="text-green-400" />
            </div>
          </div>

          <div className="bg-indigo-950 border border-indigo-800/50 rounded-xl p-3 mb-3">
            <p className="text-indigo-400 text-xs font-bold uppercase mb-1.5 flex items-center gap-1">
              <Brain size={11} /> Gemini Tip
            </p>
            <p className="text-indigo-200 text-xs leading-relaxed">
              {insights.tip}
            </p>
          </div>

          <div className="bg-red-950 border border-red-900/50 rounded-xl p-3 mb-4">
            <p className="text-red-400 text-xs font-bold uppercase mb-1.5 flex items-center gap-1">
              <AlertTriangle size={11} /> Risk Alert
            </p>
            <p className="text-red-200 text-xs leading-relaxed">
              {insights.riskAlert}
            </p>
          </div>
        </>
      )}

      {/* Task Breakdown */}
      <p className="text-gray-600 text-xs font-bold uppercase mb-3">
        Task Breakdown
      </p>

      {counts.map(({ s, n }) => (
        <div key={s} className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${dots[s]}`} />
            <span className="text-gray-400 text-xs">{labels[s]}</span>
          </div>
          <span className="text-white text-xs font-bold">{n}</span>
        </div>
      ))}
    </div>
  );
}