import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import Swal from "sweetalert2";
import CoffeeCard from "./CoffeeCard";
import CommentModal from "./CommentModal";
import { Coffee as CoffeeIcon } from "lucide-react";
import { API_URL } from "../utils/utils";
import { useCallback } from "react";

const AllCoffee = ({ limit, search }) => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState({});
  const [wishlistItems, setWishlistItems] = useState(new Set());
  const [selectedCoffeeForReview, setSelectedCoffeeForReview] = useState(null);
  const [selectedCoffeeForComments, setSelectedCoffeeForComments] = useState(null);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [ratingInput, setRatingInput] = useState("");
  const [feedbackInput, setFeedbackInput] = useState("");

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });

  // Fetch products and their reviews
  const fetchProducts = useCallback(async () => {
    try {
      const url = search
        ? `${API_URL}/products?search=${encodeURIComponent(search)}`
        : `${API_URL}/products`;

      const res = await fetch(url);
      const data = await res.json();

      setProducts(limit ? data.slice(0, limit) : data);

      // Fetch and normalize reviews for all products
      const reviewsData = await Promise.all(
        data.map(async (p) => {
          const r = await fetch(`${API_URL}/reviews/${p._id}`);
          const rdataRaw = await r.json();

          const rdata = rdataRaw.map((rev) => ({
            ...rev,
            _id: rev._id?.$oid || rev._id,
            rating: rev.rating?.$numberInt ? Number(rev.rating.$numberInt) : rev.rating,
            createdAt: rev.createdAt?.$date?.$numberLong
              ? new Date(Number(rev.createdAt.$date.$numberLong))
              : rev.createdAt,
          }));

          return [p._id, rdata];
        })
      );

      setReviews(Object.fromEntries(reviewsData));
    } catch (error) {
      console.error("Failed to fetch products or reviews:", error);
    }
  }, [search, limit]);

  const fetchWishlist = useCallback(async () => {
    if (!user?._id) return;
    try {
      const res = await fetch(`${API_URL}/cart/${user._id}`);
      const data = await res.json();
      setWishlistItems(new Set(data.map(item => item.coffeeId)));
    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
    }
  }, [user]);

  useEffect(() => {
    fetchProducts();
    fetchWishlist();
  }, [search, limit, fetchProducts, fetchWishlist]);

  // Add to wishlist/cart
  const handleAddToCart = async (coffee) => {
    if (!user) return Swal.fire("Login required", "Please login to add to wishlist", "info");

    if (wishlistItems.has(coffee._id)) {
      return Toast.fire({
        icon: 'info',
        title: 'Already in your wishlist'
      });
    }

    const cartItem = {
      buyerId: user._id,
      coffeeId: coffee._id,
      name: coffee.name,
      price: coffee.price,
      image: coffee.image,
      sellerName: coffee.sellerName,
      sellerLocation: coffee.sellerLocation,
    };

    const res = await fetch(`${API_URL}/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cartItem),
    });

    if (res.ok) {
      setWishlistItems(prev => new Set([...prev, coffee._id]));
      Toast.fire({
        icon: 'success',
        title: `${coffee.name} added to wishlist`
      });
    } else {
      Swal.fire("Error", "Failed to add coffee", "error");
    }
  };

  // Submit review
  const submitReview = async () => {
    if (!ratingInput || !feedbackInput)
      return Swal.fire("Error", "Please enter rating and feedback", "warning");

    const review = {
      coffeeId: selectedCoffeeForReview._id,
      buyerId: user._id,
      buyerName: user.name,
      rating: Number(ratingInput),
      feedback: feedbackInput,
    };

    const res = await fetch(`${API_URL}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    });

    if (res.ok) {
      Swal.fire("Thank you!", "Review submitted successfully", "success");
      setRatingInput("");
      setFeedbackInput("");
      setSelectedCoffeeForReview(null);

      const r = await fetch(`${API_URL}/reviews/${review.coffeeId}`);
      const rdataRaw = await r.json();
      const rdata = rdataRaw.map((rev) => ({
        ...rev,
        _id: rev._id?.$oid || rev._id,
        rating: rev.rating?.$numberInt ? Number(rev.rating.$numberInt) : rev.rating,
        createdAt: rev.createdAt?.$date?.$numberLong
          ? new Date(Number(rev.createdAt.$date.$numberLong))
          : rev.createdAt,
      }));

      setReviews((prev) => ({ ...prev, [review.coffeeId]: rdata }));
    } else Swal.fire("Error", "Failed to submit review", "error");
  };

  const handleViewReviews = (coffee) => {
    setSelectedCoffeeForComments(coffee);
    setIsCommentModalOpen(true);
  };

  return (
    <div className="section-container py-20 px-4 md:px-8">
      {!limit && (
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50/10 text-amber-600 font-bold text-sm tracking-widest uppercase border border-amber-500/10">
            <CoffeeIcon size={16} />
            Pure Bliss in a Cup
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-amber-950 tracking-tight">
            The Coffee <span className="text-amber-700 italic">Selection</span>
          </h1>
          <p className="max-w-xl mx-auto text-amber-900/60 text-lg">
            Explore our hand-picked collection of premium blends, curated from the world's most passionate roasters.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-12">
        {products.map((p) => (
          <CoffeeCard
            key={p._id}
            coffee={p}
            user={user}
            isInWishlist={wishlistItems.has(p._id)}
            onViewReviews={handleViewReviews}
            onAddToWishlist={handleAddToCart}
            onAddReview={setSelectedCoffeeForReview}
          />
        ))}
      </div>

      {!products.length && (
        <div className="flex flex-col items-center justify-center py-32 space-y-6 opacity-30">
          <CoffeeIcon size={80} strokeWidth={1} className="text-amber-950" />
          <p className="text-2xl font-bold text-amber-950">No coffees found in our cellar.</p>
        </div>
      )}

      {/* Review Formulation Modal (Write Review) */}
      {selectedCoffeeForReview && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center z-[110] p-4"
          onClick={() => setSelectedCoffeeForReview(null)}
        >
          <div
            className="bg-white border border-amber-900/10 rounded-[2.5rem] p-8 md:p-12 w-full max-w-lg relative text-amber-950 shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50/5 rounded-bl-full -z-10"></div>
            
            <h2 className="text-3xl font-black mb-2 text-amber-950">Write a Review</h2>
            <p className="text-amber-900/60 mb-8 uppercase tracking-widest text-[10px] font-bold">Sharing experience for <span className="text-amber-600 italic font-black">{selectedCoffeeForReview.name}</span></p>
            
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-amber-900/60 mb-2 ml-1">Rating</label>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    min="1"
                    max="5"
                    placeholder="5"
                    value={ratingInput}
                    onChange={(e) => setRatingInput(e.target.value)}
                    className="bg-amber-50/50 border border-amber-900/10 rounded-2xl p-4 w-24 text-2xl font-black focus:ring-4 focus:ring-amber-500/10 transition-all outline-none text-amber-950"
                  />
                  <div className="flex text-amber-400 gap-1">
                    {[1,2,3,4,5].map(s => <CoffeeIcon key={s} size={20} className={s <= Number(ratingInput) ? "fill-amber-400" : ""} />)}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-amber-900/60 mb-2 ml-1">Feedback</label>
                <textarea
                  placeholder="Describe the aroma, taste, and experience..."
                  value={feedbackInput}
                  onChange={(e) => setFeedbackInput(e.target.value)}
                  className="bg-amber-50/50 border border-amber-900/10 rounded-2xl p-6 w-full min-h-[150px] focus:ring-4 focus:ring-amber-500/10 transition-all outline-none resize-none text-amber-950"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setSelectedCoffeeForReview(null)}
                  className="flex-1 px-8 py-4 rounded-2xl bg-amber-50/50 text-amber-950 font-bold hover:bg-amber-950 hover:text-white transition-all active:scale-95"
                >
                  Discard
                </button>
                <button
                  onClick={submitReview}
                  className="flex-1 px-8 py-4 rounded-2xl bg-amber-950 text-white font-bold hover:bg-black transition-all shadow-xl shadow-amber-900/20 active:scale-95"
                >
                  Share Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comment/Review Viewer Modal */}
      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={() => {
          setIsCommentModalOpen(false);
          setSelectedCoffeeForComments(null);
        }}
        reviews={selectedCoffeeForComments ? reviews[selectedCoffeeForComments._id] : []}
        coffeeName={selectedCoffeeForComments?.name}
      />
    </div>
  );
};

export default AllCoffee;
