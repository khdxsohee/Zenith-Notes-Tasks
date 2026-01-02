
import React from 'react';
import { Note } from '../types';
import { Folder, Lock } from 'lucide-react';

interface NoteListProps {
  notes: Note[];
  onNoteClick: (note: Note) => void;
  isGrid?: boolean;
}

const NoteList: React.FC<NoteListProps> = ({ notes, onNoteClick, isGrid = false }) => {
  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6 opacity-40">
        <Folder size={64} className="text-gray-300 mb-4" />
        <p className="text-gray-500 font-medium">No notes found</p>
      </div>
    );
  }

  if (isGrid) {
    return (
      <div className="grid grid-cols-2 gap-4 px-6 py-4">
        {notes.map((note) => (
          <div 
            key={note.id} 
            onClick={() => onNoteClick(note)}
            className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm active:scale-95 transition-all cursor-pointer flex flex-col h-fit"
          >
            <div className="flex flex-col gap-1 text-right" dir="rtl">
              <h3 className="text-base font-bold text-gray-900 leading-tight line-clamp-2">
                {note.title}
              </h3>
              {note.content && (
                <p className="text-xs text-gray-400 leading-relaxed line-clamp-3 mt-1">
                  {note.content}
                </p>
              )}
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="text-[10px] text-gray-300 font-medium">{note.date}</span>
              {note.isLocked && <Lock size={12} className="text-yellow-400" />}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {notes.map((note) => (
        <div 
          key={note.id} 
          onClick={() => onNoteClick(note)}
          className="bg-white px-6 py-5 border-b border-gray-100 active:bg-gray-50 transition-colors cursor-pointer"
        >
          <div className="flex flex-col gap-1 text-right" dir="rtl">
            <h3 className="text-lg font-medium text-gray-900 leading-tight">
              {note.title}
            </h3>
            {note.content && (
              <p className="text-sm text-gray-400 leading-relaxed truncate">
                {note.content}
              </p>
            )}
            <div className="flex items-center gap-2 mt-1" dir="ltr">
              <span className="text-xs text-gray-400 font-medium">{note.date}</span>
              {note.isLocked && <Lock size={14} className="text-yellow-500" />}
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3">
             <Folder size={14} className="text-gray-300" />
             <span className="text-xs text-gray-400 font-medium">{note.category}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoteList;
