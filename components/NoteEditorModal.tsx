
import React, { useState, useEffect } from 'react';
import { X, Check, Trash2, Lock, Unlock, RotateCcw, ChevronDown, Folder as FolderIcon } from 'lucide-react';
import { Note, Folder } from '../types';

interface NoteEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: Partial<Note>) => void;
  onDelete?: (id: string) => void;
  onRestore?: (id: string) => void;
  onPermanentDelete?: (id: string) => void;
  editingNote?: Note | null;
  folders: Folder[];
}

const NoteEditorModal: React.FC<NoteEditorModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  onDelete,
  onRestore,
  onPermanentDelete,
  editingNote,
  folders
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLocked, setIsLocked] = useState(false);
  const [category, setCategory] = useState('Uncategorized');
  const [showFolderPicker, setShowFolderPicker] = useState(false);

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
      setIsLocked(!!editingNote.isLocked);
      setCategory(editingNote.category);
    } else {
      setTitle('');
      setContent('');
      setIsLocked(false);
      setCategory('Uncategorized');
    }
  }, [editingNote, isOpen]);

  if (!isOpen) return null;

  const isDeleted = editingNote?.isDeleted;

  const handleSave = () => {
    if (title.trim()) {
      onSave({
        title,
        content,
        isLocked,
        category,
        date: new Date().toLocaleDateString(),
        id: editingNote?.id
      });
      onClose();
    }
  };

  // Only show non-system folders for selection (or Uncategorized)
  const pickableFolders = folders.filter(f => f.id !== 'all' && f.id !== 'deleted' && f.id !== 'locked');

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-white animate-in slide-in-from-bottom duration-300">
      <header className="px-6 pt-12 pb-4 flex items-center justify-between border-b border-gray-50">
        <button onClick={onClose} className="p-2 -ml-2 text-gray-400 hover:bg-gray-50 rounded-full">
          <X size={24} />
        </button>
        
        <div className="flex items-center gap-1">
          {isDeleted ? (
            <>
              <button 
                onClick={() => { onRestore?.(editingNote!.id); onClose(); }}
                className="p-2 text-blue-500 flex items-center gap-1 font-medium"
              >
                <RotateCcw size={20} />
                <span>Restore</span>
              </button>
              <button 
                onClick={() => { if(confirm('Permanently delete?')) { onPermanentDelete?.(editingNote!.id); onClose(); } }}
                className="p-2 text-red-500"
              >
                <Trash2 size={20} />
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => setIsLocked(!isLocked)}
                className={`p-2 rounded-full transition-colors ${isLocked ? 'text-yellow-500 bg-yellow-50' : 'text-gray-300'}`}
              >
                {isLocked ? <Lock size={22} /> : <Unlock size={22} />}
              </button>
              {editingNote && onDelete && (
                <button 
                  onClick={() => { onDelete(editingNote.id); onClose(); }}
                  className="p-2 text-gray-300 hover:text-red-400"
                >
                  <Trash2 size={20} />
                </button>
              )}
              <button 
                onClick={handleSave}
                disabled={!title.trim()}
                className="p-2 text-yellow-500 disabled:opacity-30"
              >
                <Check size={28} />
              </button>
            </>
          )}
        </div>
      </header>
      
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="relative mb-6">
          <button 
            disabled={isDeleted}
            onClick={() => setShowFolderPicker(!showFolderPicker)}
            className="flex items-center gap-2 text-xs font-bold text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full hover:bg-gray-100 transition-colors uppercase tracking-wider"
          >
            <FolderIcon size={12} />
            <span>{category}</span>
            {!isDeleted && <ChevronDown size={12} />}
          </button>
          
          {showFolderPicker && (
            <div className="absolute top-10 left-0 bg-white border border-gray-100 rounded-2xl shadow-xl z-10 py-2 w-48 animate-in fade-in zoom-in-95 duration-200">
              {pickableFolders.map(f => (
                <button
                  key={f.id}
                  onClick={() => { setCategory(f.name); setShowFolderPicker(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center gap-2 ${category === f.name ? 'bg-yellow-50 text-yellow-600 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${category === f.name ? 'bg-yellow-400' : 'bg-gray-200'}`} />
                  {f.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <input
          autoFocus={!isDeleted}
          readOnly={isDeleted}
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full text-2xl font-bold border-none outline-none mb-4 placeholder:text-gray-300 text-gray-900 ${isDeleted ? 'opacity-50' : ''}`}
          dir="auto"
        />
        <textarea
          readOnly={isDeleted}
          placeholder="Start writing..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={`w-full h-[70vh] text-lg border-none outline-none resize-none placeholder:text-gray-300 text-gray-700 leading-relaxed ${isDeleted ? 'opacity-50' : ''}`}
          dir="auto"
        />
      </main>
      
      {isDeleted && (
        <div className="p-4 bg-gray-50 text-center text-sm text-gray-400 italic">
          Note is in Recently Deleted. Restore it to make changes.
        </div>
      )}
    </div>
  );
};

export default NoteEditorModal;
