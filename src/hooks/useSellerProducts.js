import { useState, useEffect, useCallback } from "react";
import { API_URL } from "../utils/utils";

export const useSellerProducts = (user, activeCategory, currentPage, itemsPerPage) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);

  const fetchMine = useCallback(async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/products`);
      const data = await res.json();

      const filtered = data.filter((p) => {
        const matchesSeller = p.sellerEmail === user?.email;
        const matchesCategory = activeCategory === "All" || (p.category || "Coffee") === activeCategory;
        return matchesSeller && matchesCategory;
      });
      setTotalItems(filtered.length);

      const productsWithReviews = await Promise.all(
        filtered.map(async (p) => {
          try {
            const revRes = await fetch(`${API_URL}/reviews/${p._id}`);
            const reviews = await revRes.json();
            return { 
                ...p, 
                reviews: reviews.map(r => ({
                    ...r,
                    rating: r.rating?.$numberInt ? Number(r.rating.$numberInt) : r.rating,
                    createdAt: r.createdAt?.$date?.$numberLong ? new Date(Number(r.createdAt.$date.$numberLong)) : r.createdAt
                })) 
            };
          } catch (e) {
            return { ...p, reviews: [] };
          }
        })
      );

      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      setProducts(productsWithReviews.slice(start, end));
    } catch (error) {
      console.error("Failed to fetch seller products:", error);
    } finally {
      setLoading(false);
    }
  }, [user?.email, currentPage, itemsPerPage, activeCategory]);

  useEffect(() => {
    fetchMine();
  }, [fetchMine]);

  return { products, loading, totalItems, fetchMine };
};
