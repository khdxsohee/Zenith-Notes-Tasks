
import React from 'react';
import { X, Shield, Trash2, Smartphone, Info, ChevronRight, Database, Layout, EyeOff, Eye, LogOut } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  hasPasscode: boolean;
  onSetPasscode: () => void;
  onResetApp: () => void;
  onBackup: () => void;
  onShowWidgets: () => void;
  onLogout: () => void;
  isLockedHidden: boolean;
  onToggleLockedHidden: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ 
  isOpen, 
  onClose, 
  hasPasscode, 
  onSetPasscode,
  onResetApp,
  onBackup,
  onShowWidgets,
  onLogout,
  isLockedHidden,
  onToggleLockedHidden
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex flex-col bg-[#f7f7f7] animate-in slide-in-from-right duration-300">
      <header className="px-6 pt-12 pb-4 bg-white flex items-center justify-between border-b border-gray-100">
        <button onClick={onClose} className="p-2 -ml-2 text-gray-800">
          <X size={24} />
        </button>
        <h2 className="text-xl font-bold">Zenith Protocol</h2>
        <div className="w-10" />
      </header>

      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        <section>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">Encryption & Security</h3>
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 divide-y divide-gray-50">
            <button 
              onClick={onSetPasscode}
              className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center">
                <Shield size={20} />
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-gray-800">{hasPasscode ? 'Modify Passcode' : 'Initialize Passcode'}</p>
                <p className="text-xs text-gray-400">Zenith Vault protection</p>
              </div>
              <ChevronRight size={18} className="text-gray-300" />
            </button>
            <button 
              onClick={onToggleLockedHidden}
              className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
            >
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${isLockedHidden ? 'bg-orange-50 text-orange-500' : 'bg-green-50 text-green-500'}`}>
                {isLockedHidden ? <Eye size={20} /> : <EyeOff size={20} />}
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-gray-800">{isLockedHidden ? 'Reveal Vault' : 'Cloak Vault'}</p>
                <p className="text-xs text-gray-400">Toggle hidden folder state</p>
              </div>
            </button>
            {hasPasscode && (
              <button 
                onClick={onLogout}
                className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors text-orange-600"
              >
                <div className="w-10 h-10 rounded-2xl bg-orange-50 flex items-center justify-center">
                  <LogOut size={20} />
                </div>
                <div className="flex-1 text-left font-semibold">Seal Session</div>
              </button>
            )}
          </div>
        </section>

        <section>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">Data Integrity</h3>
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 divide-y divide-gray-50">
            <button onClick={onBackup} className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
              <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-500 flex items-center justify-center">
                <Database size={20} />
              </div>
              <div className="flex-1 text-left font-semibold">Peak Data Export</div>
              <ChevronRight size={18} className="text-gray-300" />
            </button>
            <button onClick={onShowWidgets} className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
              <div className="w-10 h-10 rounded-2xl bg-green-50 text-green-500 flex items-center justify-center">
                <Layout size={20} />
              </div>
              <div className="flex-1 text-left font-semibold">Zenith Snapshot Widgets</div>
              <ChevronRight size={18} className="text-gray-300" />
            </button>
          </div>
        </section>

        <section>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">System Purge</h3>
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
            <button 
              onClick={onResetApp}
              className="w-full flex items-center gap-4 p-4 hover:bg-red-50 transition-colors"
            >
              <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center">
                <Trash2 size={20} />
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-red-600">Total System Wipe</p>
                <p className="text-xs text-gray-400">Irreversible erasure of all entries</p>
              </div>
            </button>
          </div>
        </section>

        <section>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">Release Info</h3>
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 divide-y divide-gray-50">
            <div className="flex items-center gap-4 p-4">
              <div className="w-10 h-10 rounded-2xl bg-gray-50 text-gray-600 flex items-center justify-center">
                <Smartphone size={20} />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">Zenith Version</p>
                <p className="text-xs text-gray-400">v3.0.0-Zenith (Ascended Edition)</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4">
              <div className="w-10 h-10 rounded-2xl bg-yellow-50 text-yellow-500 flex items-center justify-center">
                <Info size={20} />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">Peak Support</p>
                <p className="text-xs text-gray-400">peak@zenith-labs.io</p>
              </div>
            </div>
          </div>
        </section>

        <div className="text-center py-6 opacity-30">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-gray-600">Zenith Core</p>
          <p className="text-[10px] mt-1 font-medium tracking-[0.5em]">REACH THE PEAK</p>
        </div>
      </main>
    </div>
  );
};

export default SettingsModal;
