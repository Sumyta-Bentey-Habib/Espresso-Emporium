import React from "react";
import { X, Star, Calendar, User, Quote, MessageSquare } from "lucide-react";
import StartChatButton from "./chat/StartChatButton";

const CommentModal = ({ isOpen, onClose, reviews, coffeeName, user }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div 
        className="bg-white w-full max-w-2xl max-h-[85vh] rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-300 border border-amber-900/10"
        onClick={(e) => e.stopPropagation()}
      >
        {}
        <div className="p-8 border-b border-amber-900/10 flex justify-between items-center bg-gradient-to-r from-amber-50/5 to-transparent">
          <div>
            <h2 className="text-2xl font-bold text-amber-950 flex items-center gap-2">
              <Quote className="text-amber-600 opacity-20" size={32} />
              Reviews for {coffeeName}
            </h2>
            <p className="text-amber-900/60 text-sm mt-1">What our community says about this brew</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-amber-50/50 rounded-full transition-colors text-amber-900/60 hover:text-amber-950"
          >
            <X size={24} />
          </button>
        </div>

        {}
        <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
          {reviews && reviews.length > 0 ? (
            reviews.map((rev, index) => (
              <div 
                key={rev._id || index} 
                className="group relative bg-amber-50/50 p-6 rounded-3xl border border-transparent hover:border-amber-900/10 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-950 text-white flex items-center justify-center font-bold text-lg">
                      {rev.buyerName ? rev.buyerName[0].toUpperCase() : 'A'}
                    </div>
                    <div>
                      <div className="font-bold text-amber-950 flex items-center gap-2">
                        {rev.buyerName || "Anonymous Taster"}
                        <span className="text-[10px] bg-amber-100/10 text-amber-600 px-2 py-0.5 rounded-full uppercase tracking-tighter border border-amber-500/10">Verified</span>
                      </div>
                      <div className="flex items-center text-xs text-amber-900/60 mt-0.5 font-medium uppercase tracking-widest">
                        <Calendar size={12} className="mr-1" />
                        {rev.createdAt ? new Date(rev.createdAt).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }) : "Recently"}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center bg-white px-3 py-1 rounded-2xl shadow-sm border border-amber-900/10 gap-2">
                    {user && (rev.buyerEmail || rev.buyerId) && user.email !== (rev.buyerEmail || rev.buyerId) && user.uid !== (rev.buyerEmail || rev.buyerId) && (
                      <StartChatButton 
                        targetUser={{ 
                          uid: rev.buyerEmail || rev.buyerId, 
                          name: rev.buyerName || "User",
                          role: "buyer"
                        }}
                        buttonText="Say Hi"
                        autoMessage={`Hi ${rev.buyerName}! I saw your review on ${coffeeName}.`}
                        className="!p-1.5 !bg-amber-100 !text-amber-800 hover:!bg-amber-200 !shadow-none !rounded-xl !transform-none"
                      />
                    )}
                    <div className="flex items-center">
                      <Star size={14} className="text-amber-500 fill-amber-500 mr-1" />
                      <span className="text-sm font-bold text-amber-950">{rev.rating}/5</span>
                    </div>
                  </div>
                </div>
                <p className="text-amber-900/60 leading-relaxed italic relative z-10">
                  "{rev.feedback}"
                </p>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 opacity-50">
              <div className="w-20 h-20 bg-amber-50/50 rounded-full flex items-center justify-center">
                <MessageSquare size={40} className="text-amber-900/60/30" />
              </div>
              <div>
                <p className="text-xl font-bold text-amber-950">No reviews yet</p>
                <p className="text-amber-900/60 max-w-xs mx-auto">Be the first to share your experience with this coffee and help the community!</p>
              </div>
            </div>
          )}
        </div>

        {}
        <div className="p-8 border-t border-amber-900/10 flex justify-center bg-amber-50/50/20">
          <button
            onClick={onClose}
            className="px-8 py-3 rounded-2xl bg-amber-950 text-white font-bold hover:bg-black transition-all shadow-lg active:scale-95"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
