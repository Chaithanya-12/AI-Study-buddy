
import React, { useState } from 'react';
import { summarizeNotes } from '../services/geminiService';
import { Summary } from '../types';
import { FileText, Sparkles, BookOpen, Layers, CheckCircle, Loader2 } from 'lucide-react';

const Summarizer: React.FC = () => {
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<Summary | null>(null);

  const handleSummarize = async () => {
    if (!notes.trim() || isLoading) return;
    setIsLoading(true);
    try {
      const summary = await summarizeNotes(notes);
      setResult(summary);
    } catch (error) {
      console.error(error);
      alert("Failed to summarize. Check your content and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setNotes(text);
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Input Side */}
        <div className="flex-1 space-y-4">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <FileText className="text-indigo-600" size={20} />
              Drop Your Notes
            </h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Paste your lecture notes, textbook passages, or rough thoughts here..."
              className="w-full h-64 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none transition-all mb-4"
            />
            <div className="flex items-center justify-between">
              <label className="cursor-pointer text-sm font-medium text-indigo-600 hover:text-indigo-700">
                <input type="file" accept=".txt,.md" className="hidden" onChange={handleFileUpload} />
                Upload .txt file
              </label>
              <button
                onClick={handleSummarize}
                disabled={isLoading || !notes.trim()}
                className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-md shadow-indigo-100"
              >
                {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={18} />}
                Summarize & Simplify
              </button>
            </div>
          </div>
        </div>

        {/* Output Side */}
        <div className="flex-1">
          {!result && !isLoading ? (
            <div className="h-full min-h-[400px] border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 p-8 text-center">
              <div className="bg-slate-100 p-4 rounded-full mb-4">
                <BookOpen size={40} />
              </div>
              <p className="font-medium text-lg text-slate-600">No summary yet</p>
              <p className="text-sm max-w-xs">Enter your notes on the left to get a structured AI summary with flashcards.</p>
            </div>
          ) : isLoading ? (
            <div className="h-full min-h-[400px] bg-white rounded-2xl border border-slate-200 flex flex-col items-center justify-center p-8">
              <Loader2 className="animate-spin text-indigo-600 mb-4" size={48} />
              <p className="font-bold text-slate-800">Analyzing your notes...</p>
              <p className="text-sm text-slate-500 mt-2">I'm extracting key concepts and creating flashcards.</p>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
              <div>
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">AI Summary</span>
                <h2 className="text-2xl font-bold text-slate-800">{result?.title}</h2>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-500 flex items-center gap-2">
                  <Layers size={16} /> Key Takeaways
                </h4>
                <ul className="space-y-2">
                  {result?.mainPoints.map((point, idx) => (
                    <li key={idx} className="flex gap-3 text-sm text-slate-700">
                      <CheckCircle className="text-green-500 shrink-0" size={16} />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                <h4 className="text-xs font-bold text-indigo-700 uppercase mb-2">The Simple Explanation</h4>
                <p className="text-sm text-indigo-900 leading-relaxed italic">
                  "{result?.simplifiedExplanation}"
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-500 mb-3">Flashcards</h4>
                <div className="space-y-2">
                  {result?.flashcards.map((card, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-100 hover:border-indigo-200 transition-colors">
                      <p className="text-xs font-bold text-slate-400 mb-1">Q: {card.question}</p>
                      <p className="text-sm font-medium text-slate-800">A: {card.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Summarizer;
