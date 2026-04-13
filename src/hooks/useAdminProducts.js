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
      setProducts(normalized.slice(start, end));
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
