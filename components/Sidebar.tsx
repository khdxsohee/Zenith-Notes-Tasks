
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { MORE_ITEMS, BOTTOM_NAV } from '../constants';
import { Folder } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeFolder: string;
  onSelectFolder: (id: string) => void;
  folders: Folder[];
  onNewFolder: () => void;
  onOpenSettings: () => void;
  onBackup: () => void;
  onShowWidgets: () => void;
  onFeedback: () => void;
  onFanGroup: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  onClose, 
  activeFolder, 
  onSelectFolder, 
  folders,
  onNewFolder,
  onOpenSettings,
  onBackup,
  onShowWidgets,
  onFeedback,
  onFanGroup
}) => {
  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/40 z-[80] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      <div className={`fixed top-0 left-0 h-full w-[85%] max-w-[340px] bg-white z-[90] transform transition-transform duration-300 rounded-r-3xl flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 flex-1 overflow-y-auto custom-scrollbar">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-gray-400 font-medium uppercase tracking-wider text-xs">Folders</h2>
            <button 
              onClick={onNewFolder}
              className="text-yellow-500 font-semibold flex items-center gap-1 hover:bg-yellow-50 px-2 py-1 rounded-lg transition-colors"
            >
              New
            </button>
          </div>

          <div className="space-y-1 mb-8">
            {folders.map((folder) => (
              <div 
                key={folder.id}
                onClick={() => { onSelectFolder(folder.id); onClose(); }}
                className={`flex items-center p-3 rounded-2xl cursor-pointer transition-colors ${activeFolder === folder.id ? 'bg-yellow-50 text-yellow-600' : 'hover:bg-gray-50'}`}
              >
                <div className={`w-10 h-10 flex items-center justify-center ${activeFolder === folder.id ? 'text-yellow-500' : 'text-gray-600'}`}>
                  {folder.icon}
                </div>
                <span className="flex-1 font-medium ml-2 truncate">{folder.name}</span>
                <span className={`text-sm mr-2 ${activeFolder === folder.id ? 'text-yellow-400' : 'text-gray-400'}`}>
                  {folder.count}
                </span>
                <ChevronRight size={18} className={activeFolder === folder.id ? 'text-yellow-300' : 'text-gray-200'} />
              </div>
            ))}
          </div>

          <div className="h-[1px] bg-gray-100 mb-8" />

          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-400 font-medium uppercase tracking-wider text-xs">More</h2>
          </div>

          <div className="space-y-1">
            {MORE_ITEMS.map((item) => (
              <button 
                key={item.id} 
                onClick={() => {
                  if (item.id === 'widgets') onShowWidgets();
                  if (item.id === 'backups') onBackup();
                  onClose();
                }}
                className="w-full flex items-center p-3 rounded-2xl cursor-pointer hover:bg-gray-50 transition-colors bg-transparent border-none text-left"
              >
                <div className="w-10 h-10 flex items-center justify-center text-gray-600">
                  {item.icon}
                </div>
                <span className="flex-1 font-medium text-gray-800 ml-2">{item.name}</span>
                {item.hasNotification && (
                  <div className="w-2 h-2 rounded-full bg-red-500 mr-3" />
                )}
                <ChevronRight size={18} className="text-gray-300" />
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 flex justify-around">
          {BOTTOM_NAV.map((item) => (
            <button 
              key={item.id} 
              onClick={() => {
                if (item.id === 'settings') onOpenSettings();
                if (item.id === 'feedback') onFeedback();
                if (item.id === 'fan') onFanGroup();
                onClose();
              }}
              className="flex flex-col items-center gap-2 cursor-pointer relative group bg-transparent border-none outline-none"
            >
              <div className="text-gray-600 group-hover:text-yellow-500 transition-colors">
                {item.icon}
                {item.hasNotification && (
                  <div className="absolute top-0 right-1/4 w-2 h-2 rounded-full bg-red-500 border-2 border-white" />
                )}
              </div>
              <span className="text-[10px] text-gray-500 font-medium">{item.name}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
