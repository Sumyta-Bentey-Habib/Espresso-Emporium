import { useState, useEffect, useCallback } from "react";
import { API_URL } from "../utils/utils";

export const useProducts = (search, limit, category) => {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const url = search
        ? `${API_URL}/products?search=${encodeURIComponent(search)}`
        : `${API_URL}/products`;

      const res = await fetch(url);
      const data = await res.json();

      let filteredData = data;
      if (category) {
        filteredData = data.filter(p => (p.category || "Coffee") === category);
      }

      setProducts(limit ? filteredData.slice(0, limit) : filteredData);

      // Fetch reviews for each product
      const reviewsData = await Promise.all(
        filteredData.map(async (p) => {
          try {
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
          } catch (e) {
            return [p._id, []];
          }
        })
      );

      setReviews(Object.fromEntries(reviewsData));
    } catch (error) {
      console.error("Failed to fetch products or reviews:", error);
    } finally {
      setIsLoading(false);
    }
  }, [search, limit, category]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const refreshReviews = async (coffeeId) => {
    try {
      const r = await fetch(`${API_URL}/reviews/${coffeeId}`);
      const rdataRaw = await r.json();
      const rdata = rdataRaw.map((rev) => ({
        ...rev,
        _id: rev._id?.$oid || rev._id,
        rating: rev.rating?.$numberInt ? Number(rev.rating.$numberInt) : rev.rating,
        createdAt: rev.createdAt?.$date?.$numberLong
          ? new Date(Number(rev.createdAt.$date.$numberLong))
          : rev.createdAt,
      }));

      setReviews((prev) => ({ ...prev, [coffeeId]: rdata }));
    } catch (error) {
       console.error("Error refreshing reviews:", error);
    }
  };

  return { products, reviews, isLoading, fetchProducts, refreshReviews };
};
