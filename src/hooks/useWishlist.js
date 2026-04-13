import { useState, useEffect, useCallback } from "react";
import { API_URL } from "../utils/utils";
import Swal from "sweetalert2";

export const useWishlist = (user) => {
  const [wishlistItems, setWishlistItems] = useState(new Set());

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
    fetchWishlist();
  }, [fetchWishlist]);

  const addToWishlist = async (coffee) => {
    if (!user) {
        Swal.fire({
            icon: "info",
            title: "Login Required",
            text: "Please login to add to wishlist",
            confirmButtonColor: "#451a03"
        });
        return false;
    }

    if (wishlistItems.has(coffee._id)) return true;

    const cartItem = {
      buyerId: user._id,
      coffeeId: coffee._id,
      name: coffee.name,
      price: coffee.price,
      image: coffee.image,
      sellerName: coffee.sellerName,
      sellerLocation: coffee.sellerLocation,
    };

    try {
      const res = await fetch(`${API_URL}/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cartItem),
      });

      if (res.ok) {
        setWishlistItems(prev => new Set([...prev, coffee._id]));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error adding to cart:", error);
      return false;
    }
  };

  return { wishlistItems, addToWishlist, fetchWishlist };
};
