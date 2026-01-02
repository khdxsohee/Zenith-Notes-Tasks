
import React from 'react';
import { X, Users, Heart, ExternalLink, MessageCircle, Share2 } from 'lucide-react';

interface CommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CommunityModal: React.FC<CommunityModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const members = [
    { name: 'Sarah J.', role: 'Peak Master', avatar: 'SJ' },
    { name: 'Mike Ross', role: 'Workflow Disciple', avatar: 'MR' },
    { name: 'Emily Chen', role: 'Ascended Strategist', avatar: 'EC' },
  ];

  const announcements = [
    { title: 'Zenith Ascended v3', date: '2 days ago', description: 'Experience the new peak of encryption and cross-protocol sync.' },
    { title: 'Cultivation Goals', date: '1 week ago', description: 'New guidelines for attaining maximum output within the Zenith system.' },
  ];

  return (
    <div className="fixed inset-0 z-[170] flex flex-col bg-[#f7f7f7] animate-in slide-in-from-right duration-300">
      <header className="px-6 pt-12 pb-4 bg-white flex items-center justify-between border-b border-gray-100">
        <button onClick={onClose} className="p-2 -ml-2 text-gray-800">
          <X size={24} />
        </button>
        <h2 className="text-xl font-bold">Zenith Peak Network</h2>
        <div className="w-10" />
      </header>

      <main className="flex-1 overflow-y-auto p-6 space-y-8">
        <section className="bg-gradient-to-br from-gray-900 to-black rounded-[3rem] p-8 text-white shadow-xl shadow-gray-200 border border-gray-800">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10">
              <Users size={28} strokeWidth={2.5} className="text-yellow-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Zenith Elite</h3>
              <p className="text-white/60 text-sm">Peak Access</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed mb-6 text-white/80">Connect with fellow Peak Masters, exchange advanced templates, and influence the future of Zenith.</p>
          <button className="w-full bg-yellow-400 text-gray-900 font-bold py-3 rounded-2xl flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform uppercase tracking-widest text-sm">
            Ascend to Network <ExternalLink size={16} />
          </button>
        </section>

        <section>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-2">Top Cultivators</h3>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {members.map((m, i) => (
              <div key={i} className="flex-shrink-0 bg-white p-4 rounded-3xl border border-gray-100 shadow-sm w-32 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 font-bold text-lg mb-2">
                  {m.avatar}
                </div>
                <p className="text-sm font-bold text-gray-800 truncate w-full">{m.name}</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-tighter">{m.role}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-2">Sect Announcements</h3>
          <div className="space-y-4">
            {announcements.map((a, i) => (
              <div key={i} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-yellow-400" />
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-gray-800">{a.title}</h4>
                  <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">{a.date}</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{a.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex gap-3 px-2">
          <button className="flex-1 bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center gap-2 group">
            <Heart size={20} className="text-gray-300 group-active:text-red-400 transition-colors" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Endorse</span>
          </button>
          <button className="flex-1 bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center gap-2 group">
            <Share2 size={20} className="text-gray-300 group-active:text-blue-400 transition-colors" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Transmit</span>
          </button>
          <button className="flex-1 bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center gap-2 group">
            <MessageCircle size={20} className="text-gray-300 group-active:text-green-400 transition-colors" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Dispatch</span>
          </button>
        </section>

        <div className="pb-10 text-center">
          <p className="text-[10px] text-gray-300 font-bold uppercase tracking-[0.5em]">ZENITH PROPRIETARY SUITE</p>
        </div>
      </main>
    </div>
  );
};

export default CommunityModal;
