
import React, { useState } from 'react';
import { FolderPlus } from 'lucide-react';

interface NewFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
}

const NewFolderModal: React.FC<NewFolderModalProps> = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    if (name.trim()) {
      onSave(name.trim());
      setName('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-yellow-50 text-yellow-500 rounded-2xl flex items-center justify-center">
            <FolderPlus size={28} />
          </div>
          <h2 className="text-xl font-bold text-gray-900">New Folder</h2>
        </div>
        
        <input
          autoFocus
          type="text"
          placeholder="Folder name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          className="w-full bg-gray-50 border-none rounded-2xl p-4 text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-yellow-400 outline-none mb-6"
        />

        <div className="flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-2xl font-semibold text-gray-400 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            disabled={!name.trim()}
            className="flex-1 py-3 px-4 rounded-2xl font-semibold bg-yellow-400 text-white shadow-lg shadow-yellow-200 disabled:opacity-50 transition-all active:scale-95"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewFolderModal;
