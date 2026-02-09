
import React from 'react';
import { View } from '../types';
import { 
  LayoutDashboard, 
  MessageCircle, 
  FileText, 
  Bell, 
  GraduationCap 
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeView: View;
  onViewChange: (view: View) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, onViewChange }) => {
  const navItems = [
    { id: View.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: View.CHAT, label: 'Study Chat', icon: MessageCircle },
    { id: View.SUMMARIZER, label: 'Summarizer', icon: FileText },
    { id: View.REMINDERS, label: 'Revision', icon: Bell },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex">
        <div className="p-6 flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-lg text-white">
            <GraduationCap size={24} />
          </div>
          <h1 className="text-xl font-bold text-slate-800">StudyBuddy</h1>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeView === item.id
                  ? 'bg-indigo-50 text-indigo-600 font-semibold'
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-4 rounded-2xl text-white">
            <p className="text-xs font-medium opacity-80 uppercase tracking-wider mb-1">Study Streak</p>
            <p className="text-2xl font-bold">12 Days 🔥</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Mobile Nav Top Bar */}
        <header className="md:hidden bg-white border-b border-slate-200 p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <GraduationCap className="text-indigo-600" size={24} />
            <h1 className="text-lg font-bold">StudyBuddy</h1>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </div>

        {/* Mobile Bottom Nav */}
        <nav className="md:hidden bg-white border-t border-slate-200 grid grid-cols-4 px-2 py-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`flex flex-col items-center justify-center py-2 transition-all ${
                activeView === item.id ? 'text-indigo-600' : 'text-slate-400'
              }`}
            >
              <item.icon size={20} />
              <span className="text-[10px] mt-1">{item.label}</span>
            </button>
          ))}
        </nav>
      </main>
    </div>
  );
};

export default Layout;
