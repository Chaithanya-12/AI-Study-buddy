
import React, { useState, useEffect } from 'react';
import { View } from '../types';
import { generateDailyPlan } from '../services/geminiService';
import { 
  Trophy, 
  Calendar, 
  BookMarked, 
  ArrowRight, 
  Target, 
  BrainCircuit,
  Loader2,
  Lightbulb
} from 'lucide-react';

interface DashboardProps {
  onNavigate: (view: View) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [aiPlan, setAiPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPlan = async () => {
      setIsLoading(true);
      try {
        const plan = await generateDailyPlan(['Calculus', 'Organic Chemistry', 'Literature Summary']);
        setAiPlan(plan);
      } catch (err) {
        setAiPlan("Error generating plan. Just focus on your core modules today!");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlan();
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Welcome Header */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Welcome back, Scholar! 👋</h1>
          <p className="text-slate-500 mt-1">You have 3 revision tasks and 2 summaries to review.</p>
        </div>
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100">
          <Calendar className="text-indigo-600" size={20} />
          <span className="text-sm font-bold text-slate-700">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Study Hours', value: '42h', icon: Target, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Summaries', value: '18', icon: BookMarked, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Flashcards', value: '124', icon: BrainCircuit, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Achievements', value: '5', icon: Trophy, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-xl font-bold text-slate-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Daily Planner */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col h-full">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-indigo-50/30">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <BrainCircuit className="text-indigo-600" size={20} />
                AI Generated Daily Strategy
              </h3>
              {isLoading && <Loader2 className="animate-spin text-indigo-600" size={20} />}
            </div>
            <div className="p-6 flex-1 text-slate-700 leading-relaxed text-sm whitespace-pre-line">
              {isLoading ? (
                <div className="space-y-3 animate-pulse">
                  <div className="h-4 bg-slate-100 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-100 rounded w-5/6"></div>
                  <div className="h-4 bg-slate-100 rounded w-2/3"></div>
                </div>
              ) : (
                aiPlan
              )}
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 transition-colors">
                Regenerate Plan <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-800">Quick Actions</h3>
          
          <button 
            onClick={() => onNavigate(View.CHAT)}
            className="w-full bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 hover:border-indigo-300 transition-all text-left group"
          >
            <div className="bg-indigo-100 text-indigo-600 p-3 rounded-xl group-hover:scale-110 transition-transform">
              <BrainCircuit size={20} />
            </div>
            <div className="flex-1">
              <p className="font-bold text-slate-800">Clear a Doubt</p>
              <p className="text-xs text-slate-500">Fast explanation of any concept</p>
            </div>
            <ArrowRight className="text-slate-300" size={18} />
          </button>

          <button 
            onClick={() => onNavigate(View.SUMMARIZER)}
            className="w-full bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 hover:border-emerald-300 transition-all text-left group"
          >
            <div className="bg-emerald-100 text-emerald-600 p-3 rounded-xl group-hover:scale-110 transition-transform">
              <BookMarked size={20} />
            </div>
            <div className="flex-1">
              <p className="font-bold text-slate-800">Summarize Notes</p>
              <p className="text-xs text-slate-500">Turn lectures into flashcards</p>
            </div>
            <ArrowRight className="text-slate-300" size={18} />
          </button>

          <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100">
            <div className="flex items-center gap-2 text-amber-600 mb-2">
              <Lightbulb size={20} />
              <h4 className="font-bold">Did you know?</h4>
            </div>
            <p className="text-xs text-amber-800 leading-relaxed font-medium">
              Studying for 25 minutes followed by a 5-minute break (Pomodoro Technique) increases focus and memory retention significantly!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
