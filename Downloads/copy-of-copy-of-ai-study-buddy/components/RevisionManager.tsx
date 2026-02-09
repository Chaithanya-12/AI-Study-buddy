
import React, { useState } from 'react';
import { Reminder } from '../types';
import { Clock, CheckCircle2, Circle, AlertCircle, Plus, Sparkles } from 'lucide-react';

const RevisionManager: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>([
    { id: '1', topic: 'Calculus: Chain Rule', dueDate: new Date(), completed: false, priority: 'high' },
    { id: '2', topic: 'French Vocabulary: Food', dueDate: new Date(), completed: true, priority: 'medium' },
    { id: '3', topic: 'React Hooks basics', dueDate: new Date(), completed: false, priority: 'medium' },
  ]);

  const [newTopic, setNewTopic] = useState('');

  const toggleComplete = (id: string) => {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, completed: !r.completed } : r));
  };

  const addReminder = () => {
    if (!newTopic.trim()) return;
    const item: Reminder = {
      id: Date.now().toString(),
      topic: newTopic,
      dueDate: new Date(),
      completed: false,
      priority: 'medium',
    };
    setReminders([item, ...reminders]);
    setNewTopic('');
  };

  const activeReminders = reminders.filter(r => !r.completed);
  const completedCount = reminders.filter(r => r.completed).length;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Daily Revision</h2>
          <p className="text-slate-500">Track your spaced repetition goals</p>
        </div>
        <div className="text-right">
          <span className="text-3xl font-bold text-indigo-600">{Math.round((completedCount / reminders.length) * 100) || 0}%</span>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Done Today</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex gap-2 mb-6">
          <input 
            type="text" 
            value={newTopic}
            onChange={(e) => setNewTopic(e.target.value)}
            placeholder="What do you need to revise?"
            className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <button 
            onClick={addReminder}
            className="bg-indigo-600 text-white p-2 rounded-xl hover:bg-indigo-700 transition-colors"
          >
            <Plus size={24} />
          </button>
        </div>

        <div className="space-y-3">
          {reminders.map((reminder) => (
            <div 
              key={reminder.id}
              onClick={() => toggleComplete(reminder.id)}
              className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer group ${
                reminder.completed 
                  ? 'bg-slate-50 border-slate-100 opacity-60' 
                  : 'bg-white border-slate-100 hover:border-indigo-200 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center gap-4">
                {reminder.completed ? (
                  <CheckCircle2 className="text-green-500" size={20} />
                ) : (
                  <Circle className="text-slate-300 group-hover:text-indigo-400" size={20} />
                )}
                <div>
                  <p className={`font-semibold text-sm ${reminder.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                    {reminder.topic}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="flex items-center gap-1 text-[10px] text-slate-400">
                      <Clock size={12} /> Today
                    </span>
                    {reminder.priority === 'high' && (
                      <span className="flex items-center gap-1 text-[10px] text-rose-500 font-bold">
                        <AlertCircle size={10} /> Priority
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {!reminder.completed && (
                <div className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-bold">
                  Revision Due
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-6 rounded-2xl text-white flex items-center justify-between overflow-hidden relative">
        <div className="relative z-10">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Sparkles size={20} />
            AI Revision Tip
          </h3>
          <p className="text-sm opacity-90 mt-2 max-w-md">
            Focus on your "High Priority" tasks first. Active recall (testing yourself) is 3x more effective than just re-reading!
          </p>
        </div>
        <div className="absolute right-[-20px] bottom-[-20px] opacity-10">
          <Sparkles size={120} />
        </div>
      </div>
    </div>
  );
};

export default RevisionManager;
