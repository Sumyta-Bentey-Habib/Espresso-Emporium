import React from "react";
import { MessageSquare, Heart, MapPin } from "lucide-react";
import StartChatButton from "./chat/StartChatButton";
import Card from "./ui/Card";
import Button from "./ui/Button";

const CoffeeCard = ({ coffee, onViewReviews, onAddToWishlist, onAddReview, user, isInWishlist }) => {
  return (
    <Card 
      className="group overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
      padding="p-0"
      rounded="rounded-3xl"
    >
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
          <div className="bg-amber-100 text-amber-900 px-3 py-1.5 rounded-2xl font-black text-sm shadow-inner border border-amber-900/10 shrink-0 ml-4">
            ${coffee.price}
          </div>
        </div>

        <div className="text-[10px] text-amber-900/40 mb-6 flex-1 font-bold uppercase tracking-widest">
          Sourced by <span className="text-amber-950 font-black">{coffee.sellerName || "Unknown Seller"}</span>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-amber-900/10">
          <Button
            variant="secondary"
            onClick={() => onViewReviews(coffee)}
            icon={MessageSquare}
            size="sm"
            className="w-full"
          >
            Reviews
          </Button>
          
          {user ? (
            <Button
              variant={isInWishlist ? "success" : "primary"}
              onClick={() => onAddToWishlist(coffee)}
              disabled={isInWishlist}
              icon={Heart}
              size="sm"
              className="w-full"
            >
              {isInWishlist ? "In Wishlist" : "Wishlist"}
            </Button>
          ) : (
            <div className="text-[9px] text-amber-900/40 flex items-center justify-center text-center px-1 uppercase font-black tracking-widest">
              Login for Wishlist
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
              className="w-full"
            />
            <button
              onClick={() => onAddReview(coffee)}
              className="w-full text-xs font-black text-amber-700/60 hover:text-amber-950 transition-colors uppercase tracking-[0.2em] py-1 underline-offset-4 hover:underline"
            >
              Write a Review
            </button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default CoffeeCard;
