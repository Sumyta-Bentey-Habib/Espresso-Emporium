import { useState, useEffect, useCallback } from "react";
import { API_URL } from "../utils/utils";

export const useAdminProducts = (search, currentPage, itemsPerPage) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      let url = `${API_URL}/products`;
      if (search) {
        url += `?search=${encodeURIComponent(search)}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      setTotalItems(data.length);
      
      const normalized = data.map((p) => ({
        ...p,
        _id: p._id?.$oid || p._id,
        price: p.price?.$numberInt ? Number(p.price.$numberInt) : p.price,
      }));

      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const pagedProducts = normalized.slice(start, end);

      const productsWithReviews = await Promise.all(
        pagedProducts.map(async (p) => {
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

      setProducts(productsWithReviews);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [search, currentPage, itemsPerPage]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, totalItems, fetchProducts };
};
