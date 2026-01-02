
import React, { useState, useEffect, useRef } from 'react';
import { Menu, LayoutGrid, List, Search, Plus, Edit2, Folder as FolderIcon, Lock, Trash2, Layers, X as CloseIcon } from 'lucide-react';
import Sidebar from './components/Sidebar';
import NoteList from './components/NoteList';
import TaskList from './components/TaskList';
import NewTaskModal from './components/NewTaskModal';
import NoteEditorModal from './components/NoteEditorModal';
import NewFolderModal from './components/NewFolderModal';
import SettingsModal from './components/SettingsModal';
import PasscodeModal from './components/PasscodeModal';
import WidgetsModal from './components/WidgetsModal';
import FeedbackModal from './components/FeedbackModal';
import CommunityModal from './components/CommunityModal';
import { INITIAL_NOTES } from './constants';
import { AppTab, Note, Task, Folder } from './types';

const INITIAL_FOLDERS: Folder[] = [
  { id: 'all', name: 'All', icon: <FolderIcon size={20} />, count: 0, isSystem: true },
  { id: 'uncategorized', name: 'Uncategorized', icon: <Layers size={20} />, count: 0, isSystem: true },
  { id: 'locked', name: 'Locked', icon: <Lock size={20} />, count: 0, isSystem: true },
  { id: 'deleted', name: 'Recently Deleted', icon: <Trash2 size={20} />, count: 0, isSystem: true },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>('Notes');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isTaskModalOpen, setTaskModalOpen] = useState(false);
  const [isNoteModalOpen, setNoteModalOpen] = useState(false);
  const [isFolderModalOpen, setFolderModalOpen] = useState(false);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [isWidgetsModalOpen, setWidgetsModalOpen] = useState(false);
  const [isFeedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [isCommunityModalOpen, setCommunityModalOpen] = useState(false);
  const isResetting = useRef(false);
  
  // App Settings State - Zenith branding keys
  const [isGridView, setIsGridView] = useState(() => localStorage.getItem('zenith-view') === 'grid');
  const [isLockedHidden, setIsLockedHidden] = useState(() => localStorage.getItem('zenith-hide-locked') === 'true');

  // Passcode State
  const [passcode, setPasscode] = useState<string | null>(() => localStorage.getItem('zenith-pin'));
  const [isPasscodeModalOpen, setPasscodeModalOpen] = useState(false);
  const [passcodeMode, setPasscodeMode] = useState<'verify' | 'set'>('verify');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pendingAction, setPendingAction] = useState<{ type: 'folder' | 'note', id: string } | null>(null);

  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [selectedFolderId, setSelectedFolderId] = useState('all');
  
  const [notes, setNotes] = useState<Note[]>(() => {
    // Migration logic across all iterations
    const saved = localStorage.getItem('zenith-notes') || localStorage.getItem('nexus-notes') || localStorage.getItem('amber-notes') || localStorage.getItem('lyrical-notes');
    return saved ? JSON.parse(saved) : INITIAL_NOTES;
  });
  
  const [customFolders, setCustomFolders] = useState<string[]>(() => {
    const saved = localStorage.getItem('zenith-folders') || localStorage.getItem('nexus-folders') || localStorage.getItem('amber-folders') || localStorage.getItem('lyrical-folders');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('zenith-tasks') || localStorage.getItem('nexus-tasks') || localStorage.getItem('amber-tasks') || localStorage.getItem('lyrical-tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [searchQuery, setSearchQuery] = useState('');

  // Persistence logic - Zenith keys
  useEffect(() => { 
    if (!isResetting.current) {
      localStorage.setItem('zenith-notes', JSON.stringify(notes)); 
    }
  }, [notes]);

  useEffect(() => { 
    if (!isResetting.current) {
      localStorage.setItem('zenith-tasks', JSON.stringify(tasks)); 
    }
  }, [tasks]);

  useEffect(() => { 
    if (!isResetting.current) {
      localStorage.setItem('zenith-folders', JSON.stringify(customFolders)); 
    }
  }, [customFolders]);

  useEffect(() => { 
    if (!isResetting.current) {
      localStorage.setItem('zenith-view', isGridView ? 'grid' : 'list'); 
    }
  }, [isGridView]);

  useEffect(() => { 
    if (!isResetting.current) {
      localStorage.setItem('zenith-hide-locked', String(isLockedHidden)); 
    }
  }, [isLockedHidden]);

  useEffect(() => { 
    if (!isResetting.current) {
      if (passcode) localStorage.setItem('zenith-pin', passcode);
      else localStorage.removeItem('zenith-pin');
    }
  }, [passcode]);

  // Derived folders list
  const folders: Folder[] = [
    ...INITIAL_FOLDERS,
    ...customFolders.map(name => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name: name,
      icon: <FolderIcon size={20} />,
      count: notes.filter(n => !n.isDeleted && n.category === name).length
    }))
  ].filter(f => {
    if (f.id === 'locked' && isLockedHidden) return false;
    return true;
  }).map(f => {
    if (f.id === 'all') f.count = notes.filter(n => !n.isDeleted).length;
    if (f.id === 'uncategorized') f.count = notes.filter(n => !n.isDeleted && n.category === 'Uncategorized').length;
    if (f.id === 'locked') f.count = notes.filter(n => !n.isDeleted && n.isLocked).length;
    if (f.id === 'deleted') f.count = notes.filter(n => n.isDeleted).length;
    return f;
  });

  // Security Logic
  const handleSelectFolder = (id: string) => {
    if (id === 'locked') {
      if (!passcode) {
        alert('Encryption requires a passcode. Configure the Zenith Vault in Settings.');
        return;
      }
      if (!isUnlocked) {
        setPendingAction({ type: 'folder', id });
        setPasscodeMode('verify');
        setPasscodeModalOpen(true);
        return;
      }
    }
    setSelectedFolderId(id);
  };

  const handleOpenNote = (note: Note) => {
    if (note.isLocked) {
      if (!passcode) {
        alert('Configure a passcode in Settings to access the Zenith Vault.');
        return;
      }
      if (!isUnlocked) {
        setPendingAction({ type: 'note', id: note.id });
        setPasscodeMode('verify');
        setPasscodeModalOpen(true);
        return;
      }
    }
    setEditingNote(note);
    setNoteModalOpen(true);
  };

  const onPasscodeSuccess = () => {
    setIsUnlocked(true);
    setPasscodeModalOpen(false);
    if (pendingAction) {
      if (pendingAction.type === 'folder') setSelectedFolderId(pendingAction.id);
      if (pendingAction.type === 'note') {
        const note = notes.find(n => n.id === pendingAction.id);
        if (note) {
          setEditingNote(note);
          setNoteModalOpen(true);
        }
      }
      setPendingAction(null);
    }
  };

  const handleBackup = () => {
    const data = { notes, tasks, customFolders };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `zenith-peak-backup.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleLogout = () => {
    setIsUnlocked(false);
    if (selectedFolderId === 'locked') setSelectedFolderId('all');
    alert('Zenith session secured.');
  };

  const resetApp = () => {
    const confirmed = window.confirm('WARNING: Full system purge. All Zenith data will be erased. Proceed?');
    if (!confirmed) return;
    
    isResetting.current = true;
    localStorage.clear();
    window.location.reload();
  };

  const saveNote = (noteData: Partial<Note>) => {
    if (noteData.isLocked && !passcode) {
      alert('Vault encryption requires a passcode. Configure one in Settings.');
      noteData.isLocked = false;
    }
    if (noteData.id) {
      setNotes(prev => prev.map(n => n.id === noteData.id ? { ...n, ...noteData } as Note : n));
    } else {
      const newNote: Note = {
        id: Date.now().toString(),
        title: noteData.title || 'Ascended Entry',
        content: noteData.content || '',
        category: noteData.category || 'Uncategorized',
        isLocked: noteData.isLocked || false,
        isDeleted: false,
        date: new Date().toLocaleDateString(),
      };
      setNotes([newNote, ...notes]);
    }
  };

  const saveTask = (text: string, reminder?: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      completed: false,
      reminder
    };
    setTasks([newTask, ...tasks]);
  };

  const filteredNotes = notes.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          n.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedFolderId === 'deleted') return n.isDeleted && matchesSearch;
    if (n.isDeleted) return false;

    if (isLockedHidden && n.isLocked && (selectedFolderId === 'all' || selectedFolderId === 'uncategorized')) return false;

    if (selectedFolderId === 'all') return matchesSearch;
    if (selectedFolderId === 'locked') return n.isLocked && matchesSearch;
    if (selectedFolderId === 'uncategorized') return n.category === 'Uncategorized' && matchesSearch;
    
    const targetFolder = folders.find(f => f.id === selectedFolderId);
    if (targetFolder && !targetFolder.isSystem) return n.category === targetFolder.name && matchesSearch;
    
    return matchesSearch;
  });

  const filteredTasks = tasks.filter(t => 
    t.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f7f7f7] flex flex-col max-w-md mx-auto relative overflow-hidden shadow-2xl">
      <header className="px-6 pt-12 pb-4 bg-white/80 backdrop-blur-md sticky top-0 z-30 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => setSidebarOpen(true)} className="w-10 h-10 flex items-center justify-center text-gray-800 hover:bg-gray-100 rounded-full transition-colors">
            <Menu size={24} />
          </button>
          <div className="flex bg-gray-100 p-1 rounded-full w-48">
            <button onClick={() => setActiveTab('Notes')} className={`flex-1 py-1 px-4 rounded-full text-sm font-semibold transition-all ${activeTab === 'Notes' ? 'bg-yellow-400 text-white shadow-sm' : 'text-gray-500'}`}>Notes</button>
            <button onClick={() => setActiveTab('Tasks')} className={`flex-1 py-1 px-4 rounded-full text-sm font-semibold transition-all ${activeTab === 'Tasks' ? 'bg-yellow-400 text-white shadow-sm' : 'text-gray-500'}`}>Tasks</button>
          </div>
          <button onClick={() => setIsGridView(!isGridView)} className="w-10 h-10 flex items-center justify-center text-gray-800 hover:bg-gray-100 rounded-full transition-colors">
            {isGridView ? <List size={24} /> : <LayoutGrid size={24} />}
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto custom-scrollbar pb-32">
        {activeTab === 'Notes' ? (
          <>
            <div className="px-6 pt-6 pb-2">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">
                  {searchQuery ? `Zenith Search` : (folders.find(f => f.id === selectedFolderId)?.name || 'Notes')}
                </h1>
                {selectedFolderId === 'locked' && isUnlocked && (
                  <button onClick={handleLogout} className="text-xs font-bold text-orange-500 bg-orange-50 px-3 py-1 rounded-full">LOCK VAULT</button>
                )}
              </div>
              {searchQuery && (
                <p className="text-xs text-gray-400 mt-1">Filtering results for "{searchQuery}"</p>
              )}
            </div>
            <NoteList notes={filteredNotes} onNoteClick={handleOpenNote} isGrid={isGridView} />
          </>
        ) : (
          <TaskList 
            tasks={filteredTasks} 
            onToggle={(id) => setTasks(prev => prev.map(t => t.id === id ? {...t, completed: !t.completed} : t))} 
            onDelete={(id) => setTasks(prev => prev.filter(t => t.id !== id))} 
            searchQuery={searchQuery}
          />
        )}
      </main>

      <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none z-40">
        <div className="flex items-center gap-4 max-w-full">
          <div className="flex-1 bg-white/90 backdrop-blur-xl rounded-full shadow-lg border border-gray-100 px-5 py-3 flex items-center gap-3 pointer-events-auto group">
            <Search size={20} className="text-gray-400 group-focus-within:text-yellow-500 transition-colors" />
            <input 
              type="text" 
              placeholder={`Search Zenith...`} 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              className="bg-transparent border-none outline-none w-full text-gray-700 placeholder:text-gray-400" 
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-all"
              >
                <CloseIcon size={16} />
              </button>
            )}
          </div>
          <button onClick={() => activeTab === 'Notes' ? (setEditingNote(null), setNoteModalOpen(true)) : setTaskModalOpen(true)} className="w-14 h-14 bg-white rounded-full shadow-xl flex items-center justify-center text-gray-800 border border-gray-100 pointer-events-auto active:scale-90 hover:shadow-2xl transition-all ml-auto">
            {activeTab === 'Notes' ? <Edit2 size={24} /> : <Plus size={24} />}
          </button>
        </div>
      </div>

      <Sidebar 
        isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} 
        activeFolder={selectedFolderId} onSelectFolder={handleSelectFolder}
        folders={folders} onNewFolder={() => setFolderModalOpen(true)}
        onOpenSettings={() => setSettingsOpen(true)}
        onBackup={handleBackup}
        onShowWidgets={() => setWidgetsModalOpen(true)}
        onFeedback={() => setFeedbackModalOpen(true)}
        onFanGroup={() => setCommunityModalOpen(true)}
      />
      
      <NewTaskModal isOpen={isTaskModalOpen} onClose={() => setTaskModalOpen(false)} onSave={saveTask} />
      <NewFolderModal isOpen={isFolderModalOpen} onClose={() => setFolderModalOpen(false)} onSave={(name) => setCustomFolders([...customFolders, name])} />
      <NoteEditorModal
        isOpen={isNoteModalOpen} onClose={() => { setNoteModalOpen(false); setEditingNote(null); }}
        onSave={saveNote} onDelete={(id) => setNotes(prev => prev.map(n => n.id === id ? {...n, isDeleted: true} : n))}
        onRestore={(id) => setNotes(prev => prev.map(n => n.id === id ? {...n, isDeleted: false} : n))}
        onPermanentDelete={(id) => setNotes(prev => prev.filter(n => n.id !== id))}
        editingNote={editingNote} folders={folders}
      />
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setSettingsOpen(false)}
        hasPasscode={!!passcode}
        onSetPasscode={() => { setPasscodeMode('set'); setPasscodeModalOpen(true); }}
        onResetApp={resetApp}
        onBackup={handleBackup}
        onShowWidgets={() => setWidgetsModalOpen(true)}
        onLogout={handleLogout}
        isLockedHidden={isLockedHidden}
        onToggleLockedHidden={() => setIsLockedHidden(!isLockedHidden)}
      />
      <PasscodeModal 
        isOpen={isPasscodeModalOpen} 
        onClose={() => { setPasscodeModalOpen(false); setPendingAction(null); }}
        correctPin={passcode}
        mode={passcodeMode}
        onSuccess={onPasscodeSuccess}
        onSetPin={(pin) => { setPasscode(pin); }}
      />
      <WidgetsModal 
        isOpen={isWidgetsModalOpen} 
        onClose={() => setWidgetsModalOpen(false)} 
        recentNote={notes.length > 0 ? notes[0] : undefined}
        tasks={tasks}
      />
      <FeedbackModal 
        isOpen={isFeedbackModalOpen} 
        onClose={() => setFeedbackModalOpen(false)} 
      />
      <CommunityModal 
        isOpen={isCommunityModalOpen} 
        onClose={() => setCommunityModalOpen(false)} 
      />
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-300 rounded-full opacity-30" />
    </div>
  );
};

export default App;
