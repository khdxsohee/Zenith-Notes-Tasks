
import React, { useState, useEffect } from 'react';
import { X, Delete } from 'lucide-react';

interface PasscodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  correctPin: string | null;
  mode: 'verify' | 'set';
  onSetPin?: (pin: string) => void;
}

const PasscodeModal: React.FC<PasscodeModalProps> = ({ 
  isOpen, 
  onClose, 
  onSuccess, 
  correctPin, 
  mode,
  onSetPin 
}) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (pin.length === 4) {
      if (mode === 'verify') {
        if (pin === correctPin) {
          onSuccess();
          setPin('');
        } else {
          setError(true);
          setPin('');
          setTimeout(() => setError(false), 500);
        }
      } else {
        onSetPin?.(pin);
        onSuccess();
        setPin('');
      }
    }
  }, [pin, mode, correctPin, onSuccess, onSetPin]);

  if (!isOpen) return null;

  const handleKeypad = (num: string) => {
    if (pin.length < 4) setPin(prev => prev + num);
  };

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1));
  };

  return (
    <div className="fixed inset-0 z-[200] flex flex-col bg-white animate-in fade-in duration-300">
      <header className="px-6 pt-12 flex justify-between items-center">
        <button onClick={onClose} className="p-2 -ml-2 text-gray-400">
          <X size={24} />
        </button>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {mode === 'set' ? 'Set Passcode' : 'Enter Passcode'}
        </h2>
        <p className="text-gray-400 mb-8">
          {mode === 'set' ? 'Choose a 4-digit PIN for locked notes' : 'Locked notes are protected'}
        </p>

        <div className={`flex gap-4 mb-12 ${error ? 'animate-bounce text-red-500' : ''}`}>
          {[0, 1, 2, 3].map((i) => (
            <div 
              key={i} 
              className={`w-4 h-4 rounded-full border-2 border-yellow-400 transition-all duration-200 ${pin.length > i ? 'bg-yellow-400 scale-110' : 'bg-transparent'}`} 
            />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6 w-full max-w-[280px]">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button 
              key={num}
              onClick={() => handleKeypad(num.toString())}
              className="w-16 h-16 rounded-full bg-gray-50 text-2xl font-semibold text-gray-800 flex items-center justify-center active:bg-yellow-100 active:scale-95 transition-all"
            >
              {num}
            </button>
          ))}
          <div />
          <button 
            onClick={() => handleKeypad('0')}
            className="w-16 h-16 rounded-full bg-gray-50 text-2xl font-semibold text-gray-800 flex items-center justify-center active:bg-yellow-100 active:scale-95 transition-all"
          >
            0
          </button>
          <button 
            onClick={handleBackspace}
            className="w-16 h-16 text-gray-400 flex items-center justify-center active:scale-90"
          >
            <Delete size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasscodeModal;
