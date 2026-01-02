
import React, { useState } from 'react';
import { X, Send, Star, MessageSquareQuote } from 'lucide-react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || !comment.trim()) return;
    
    // Simulate API call
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setRating(0);
      setComment('');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[160] flex flex-col bg-[#f7f7f7] animate-in slide-in-from-bottom duration-300">
      <header className="px-6 pt-12 pb-4 bg-white flex items-center justify-between border-b border-gray-100">
        <button onClick={onClose} className="p-2 -ml-2 text-gray-800">
          <X size={24} />
        </button>
        <h2 className="text-xl font-bold">User Insight</h2>
        <div className="w-10" />
      </header>

      <main className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center">
        {submitted ? (
          <div className="text-center animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <Star size={40} fill="currentColor" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Ascension Complete</h3>
            <p className="text-gray-500">Your feedback drives the evolution of the Zenith ecosystem.</p>
          </div>
        ) : (
          <div className="w-full max-w-sm space-y-8 animate-in fade-in duration-500">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-50 text-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessageSquareQuote size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Experience Analysis</h3>
              <p className="text-sm text-gray-400 mt-1">Evaluate the current Zenith protocol.</p>
            </div>

            <div className="flex justify-center gap-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`transition-all ${rating >= star ? 'text-yellow-400 scale-125' : 'text-gray-200 hover:text-yellow-200'}`}
                >
                  <Star size={36} fill={rating >= star ? 'currentColor' : 'none'} strokeWidth={1.5} />
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="How can we refine the Zenith experience for your workflow?"
                className="w-full h-32 bg-white border border-gray-100 rounded-3xl p-5 text-gray-800 placeholder:text-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none shadow-sm resize-none"
              />
              <button
                type="submit"
                disabled={rating === 0 || !comment.trim()}
                className="w-full bg-yellow-400 text-white py-4 rounded-3xl font-bold shadow-lg shadow-yellow-200 disabled:opacity-50 transition-all flex items-center justify-center gap-2 active:scale-95 uppercase tracking-widest text-sm"
              >
                <Send size={18} />
                Submit Analysis
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default FeedbackModal;
