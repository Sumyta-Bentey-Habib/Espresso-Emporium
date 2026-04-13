import React from "react";
import { MessageSquare, Heart, MapPin, BadgeDollarSign } from "lucide-react";
import StartChatButton from "./chat/StartChatButton";

const CoffeeCard = ({ coffee, onViewReviews, onAddToWishlist, onAddReview, user, isInWishlist }) => {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-amber-900/10 flex flex-col h-full">
      <div className="relative h-64 overflow-hidden">
        <img
          src={coffee.image || "/more/coffee-splash.jpg"}
          alt={coffee.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {coffee.description && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
            <p className="text-white text-sm line-clamp-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              {coffee.description}
            </p>
          </div>
        )}
        {coffee.availability === "Available" && (
          <div className="absolute top-4 left-4 bg-emerald-500/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
            Fresh Brew
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-4">
          <div className="min-w-0 flex-1">
            <h3 className="text-xl font-black text-amber-950 group-hover:text-amber-800 transition-colors truncate">
              {coffee.name}
            </h3>
            {coffee.sellerLocation && (
              <div className="flex items-center text-amber-900/60 text-[10px] mt-1 font-black uppercase tracking-widest">
                <MapPin size={12} className="mr-1" />
                {coffee.sellerLocation}
              </div>
            )}
          </div>
          <div className="bg-amber-100/10 text-amber-600 px-3 py-1.5 rounded-2xl font-black text-sm shadow-inner border border-amber-500/10 shrink-0 ml-4">
            ${coffee.price}
          </div>
        </div>

        <div className="text-[10px] text-amber-900/40 mb-6 flex-1 font-bold uppercase tracking-widest">
          Sourced by <span className="text-amber-950">{coffee.sellerName || "Unknown Seller"}</span>
        </div>

        {}
        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-amber-900/10">
          <button
            onClick={() => onViewReviews(coffee)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50/50 text-amber-950 font-bold hover:bg-amber-950 hover:text-white transition-all active:scale-95 group/btn"
          >
            <MessageSquare size={18} className="group-hover/btn:rotate-12 transition-transform" />
            Reviews
          </button>
          
          {user ? (
            <button
              onClick={() => onAddToWishlist(coffee)}
              disabled={isInWishlist}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold transition-all shadow-lg active:scale-95 group/btn ${
                isInWishlist 
                ? "bg-green-600 text-white cursor-default shadow-green-900/20" 
                : "bg-amber-900 text-white hover:bg-black shadow-amber-900/20"
              }`}
            >
              <Heart size={18} className={`transition-transform ${isInWishlist ? "fill-white scale-110" : "group-hover/btn:scale-125"}`} />
              {isInWishlist ? "In Wishlist" : "Wishlist"}
            </button>
          ) : (
            <div className="text-[10px] text-amber-900/60/40 flex items-center justify-center text-center px-2 uppercase font-black tracking-widest">
              Login to wishlist
            </div>
          )}
        </div>
        
        {user && (
          <div className="flex flex-col gap-2 mt-3">
            <StartChatButton 
              targetUser={{ 
                uid: coffee.sellerEmail || coffee.sellerId || coffee.sellerUid, 
                name: coffee.sellerName || "Seller",
                role: "seller"
              }} 
              autoMessage={`Hi ${coffee.sellerName || "Seller"}! I'm interested in your ${coffee.name}.`}
              buttonText="Say Hi & Chat"
              className="w-full !py-2 !text-xs"
            />
            <button
              onClick={() => onAddReview(coffee)}
              className="w-full text-xs font-bold text-amber-700 hover:text-amber-900 transition-colors uppercase tracking-widest py-1 underline-offset-4 hover:underline"
            >
              Write a Review
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoffeeCard;
