import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Star, Send, ThumbsUp } from 'lucide-react';

export const ReviewModal: React.FC = () => {
  const {
    isReviewModalOpen,
    setIsReviewModalOpen,
    reviewTarget,
    setReviewTarget,
    addReview
  } = useApp();

  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [comment, setComment] = useState<string>('');

  if (!isReviewModalOpen || !reviewTarget) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      alert('Please add a short feedback comment.');
      return;
    }
    addReview(rating, comment);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-navy-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-float border border-slate-100 overflow-hidden animate-scale-in">
        
        {/* Top bar */}
        <div className="h-3 bg-gradient-to-r from-sunny via-tunisian to-fresh"></div>

        <button
          onClick={() => {
            setIsReviewModalOpen(false);
            setReviewTarget(null);
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-navy hover:bg-slate-200 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          <div className="text-center mb-5">
            <span className="text-[10px] font-bold tracking-wider uppercase text-fresh font-display">
              Mission Review & Rating
            </span>
            <h3 className="text-xl font-black text-navy mt-1 font-display">
              Rate {reviewTarget.toUserName}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Mission: "{reviewTarget.jobTitle}"
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Interactive Stars */}
            <div className="flex flex-col items-center justify-center py-2">
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map(star => {
                  const filled = (hoverRating !== null ? hoverRating >= star : rating >= star);
                  return (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(null)}
                      onClick={() => setRating(star)}
                      className="p-1 transition-transform hover:scale-110 focus:outline-none"
                    >
                      <Star
                        className={`w-8 h-8 transition-colors ${
                          filled ? 'text-sunny fill-sunny' : 'text-slate-300'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
              <span className="text-xs font-bold text-navy mt-2 font-display">
                {rating === 5 && 'Outstanding Performance! (5/5)'}
                {rating === 4 && 'Great Work! (4/5)'}
                {rating === 3 && 'Average / Met Requirements (3/5)'}
                {rating === 2 && 'Needs Improvement (2/5)'}
                {rating === 1 && 'Unsatisfactory (1/5)'}
              </span>
            </div>

            {/* Comment */}
            <div>
              <label className="block text-xs font-bold text-navy mb-1.5">
                Your Feedback & Recommendations
              </label>
              <textarea
                rows={4}
                required
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="Share your experience (punctuality, communication, presentation, work quality)..."
                className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-fresh/30 focus:border-fresh bg-slate-50/50 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-navy hover:bg-navy-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all duration-200 hover:scale-[1.01] flex items-center justify-center gap-2 btn-press"
            >
              <Send className="w-4 h-4 text-sunny" />
              <span>Submit Official Review</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
