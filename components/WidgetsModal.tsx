
import React from 'react';
import { X, Layout, Plus, CheckCircle2, Clock, StickyNote } from 'lucide-react';
import { Note, Task } from '../types';

interface WidgetsModalProps {
  isOpen: boolean;
  onClose: () => void;
  recentNote?: Note;
  tasks: Task[];
}

const WidgetsModal: React.FC<WidgetsModalProps> = ({ isOpen, onClose, recentNote, tasks }) => {
  if (!isOpen) return null;

  const activeTasks = tasks.filter(t => !t.completed).slice(0, 3);

  return (
    <div className="fixed inset-0 z-[150] flex flex-col bg-[#f7f7f7] animate-in slide-in-from-bottom duration-300">
      <header className="px-6 pt-12 pb-4 bg-white flex items-center justify-between border-b border-gray-100">
        <button onClick={onClose} className="p-2 -ml-2 text-gray-800">
          <X size={24} />
        </button>
        <h2 className="text-xl font-bold">Zenith Snapshots</h2>
        <div className="w-10" />
      </header>

      <main className="flex-1 overflow-y-auto p-6 space-y-8">
        <div className="bg-blue-50 p-4 rounded-3xl border border-blue-100 flex gap-3 items-start">
          <div className="p-2 bg-blue-500 text-white rounded-xl">
            <Layout size={20} />
          </div>
          <div>
            <p className="text-sm font-bold text-blue-900">External Manifestation</p>
            <p className="text-xs text-blue-700 mt-0.5">To manifest Zenith on your home screen, long press an empty area, select 'Widgets' and search for 'Zenith'.</p>
          </div>
        </div>

        <section>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-2">Manifestation Gallery</h3>
          
          <div className="space-y-6">
            {/* Recent Note Widget */}
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-700 px-2">Zenith Snapshot (Small)</p>
              <div className="bg-white aspect-square w-40 rounded-[2.5rem] shadow-lg border border-gray-100 p-5 flex flex-col justify-between mx-auto overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-3 opacity-20">
                  <StickyNote size={40} className="text-yellow-500" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-yellow-500 uppercase tracking-tighter mb-1">Peak Status</p>
                  <h4 className="text-sm font-bold text-gray-900 line-clamp-2 leading-tight">
                    {recentNote?.title || 'No active entries'}
                  </h4>
                </div>
                <p className="text-[10px] text-gray-400 font-medium">
                  {recentNote?.date || 'Syncing...'}
                </p>
              </div>
            </div>

            {/* Tasks Widget */}
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-700 px-2">Zenith Task Center (Medium)</p>
              <div className="bg-white w-full h-40 rounded-[2.5rem] shadow-lg border border-gray-100 p-6 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-bold text-gray-900">Current Tasks</h4>
                  <div className="bg-yellow-100 text-yellow-600 px-2 py-0.5 rounded-full text-[10px] font-bold">
                    {activeTasks.length} Active
                  </div>
                </div>
                <div className="space-y-2.5">
                  {activeTasks.length > 0 ? activeTasks.map(task => (
                    <div key={task.id} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full border border-gray-200 flex-shrink-0" />
                      <span className="text-xs text-gray-600 truncate">{task.text}</span>
                    </div>
                  )) : (
                    <p className="text-xs text-gray-400 italic text-center py-4">All tasks ascended</p>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Actions Widget */}
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-700 px-2">Zenith Command (Wide)</p>
              <div className="bg-gray-900 w-full h-24 rounded-[2.5rem] shadow-xl border border-gray-800 p-4 flex items-center justify-around">
                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="w-10 h-10 bg-yellow-400 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-yellow-400/20 group-active:scale-90 transition-transform">
                    <Plus size={24} strokeWidth={3} />
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Entry</span>
                </div>
                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="w-10 h-10 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-active:scale-90 transition-transform">
                    <CheckCircle2 size={24} />
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Strike</span>
                </div>
                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="w-10 h-10 bg-green-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-green-500/20 group-active:scale-90 transition-transform">
                    <Clock size={24} />
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Alert</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="pb-10">
          <button 
            onClick={onClose}
            className="w-full bg-white border border-gray-200 py-4 rounded-3xl font-bold text-gray-800 shadow-sm active:bg-gray-50 transition-colors uppercase tracking-widest text-sm"
          >
            Back to Zenith
          </button>
        </div>
      </main>
    </div>
  );
};

export default WidgetsModal;
