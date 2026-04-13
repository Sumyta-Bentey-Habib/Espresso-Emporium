import { useState, useEffect, useCallback } from "react";
import { API_URL } from "../utils/utils";

export const useUsers = (search, currentPage, itemsPerPage) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const url = search
        ? `${API_URL}/users?search=${encodeURIComponent(search)}`
        : `${API_URL}/users`;
      
      const res = await fetch(url);
      const data = await res.json();
      
      setTotalItems(data.length);
      
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      setUsers(data.slice(start, end));
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  }, [search, currentPage, itemsPerPage]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, loading, totalItems, fetchUsers };
};
