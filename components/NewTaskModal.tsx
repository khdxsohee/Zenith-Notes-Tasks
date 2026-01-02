
import React, { useState } from 'react';
import { Clock, X } from 'lucide-react';

interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (text: string, reminder?: string) => void;
}

const NewTaskModal: React.FC<NewTaskModalProps> = ({ isOpen, onClose, onSave }) => {
  const [text, setText] = useState('');
  const [reminder, setReminder] = useState('');
  const [showReminderInput, setShowReminderInput] = useState(false);
  
  if (!isOpen) return null;

  const handleSave = () => {
    if (text.trim()) {
      onSave(text.trim(), reminder.trim() || undefined);
      setText('');
      setReminder('');
      setShowReminderInput(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">New Task</h2>
        
        <div className="space-y-4 mb-6">
          <input
            autoFocus
            type="text"
            placeholder="What needs to be done?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            className="w-full bg-gray-50 border-none rounded-2xl p-4 text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-yellow-400 outline-none"
          />

          {showReminderInput && (
            <div className="relative animate-in slide-in-from-top-2 duration-200">
              <input
                type="text"
                placeholder="e.g. Tomorrow at 10 AM"
                value={reminder}
                onChange={(e) => setReminder(e.target.value)}
                className="w-full bg-yellow-50/50 border border-yellow-100 rounded-2xl p-4 pl-11 text-gray-800 placeholder:text-yellow-300 focus:ring-2 focus:ring-yellow-400 outline-none"
              />
              <Clock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-500" />
              <button 
                onClick={() => { setReminder(''); setShowReminderInput(false); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-yellow-400"
              >
                <X size={16} />
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          {!showReminderInput ? (
            <button 
              onClick={() => setShowReminderInput(true)}
              className="flex items-center gap-2 text-gray-500 hover:text-yellow-600 transition-colors py-2 px-3 rounded-xl hover:bg-gray-50"
            >
              <Clock size={20} />
              <span className="font-medium">Add Reminder</span>
            </button>
          ) : (
            <div className="w-10" /> 
          )}
          
          <button 
            onClick={handleSave}
            disabled={!text.trim()}
            className="text-yellow-500 font-bold px-6 py-2 disabled:opacity-30 transition-all hover:bg-yellow-50 rounded-xl"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewTaskModal;
