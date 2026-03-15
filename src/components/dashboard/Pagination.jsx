import React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  itemsPerPage, 
  onItemsPerPageChange,
  totalItems 
}) => {
  const pages = [];
  const maxVisiblePages = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 px-2">
      <div className="flex items-center gap-4 order-2 sm:order-1">
        <span className="text-sm font-medium text-amber-900/60">
          Showing <span className="text-amber-950 font-bold">{Math.min(totalItems, (currentPage - 1) * itemsPerPage + 1)}</span> to{" "}
          <span className="text-amber-950 font-bold">{Math.min(totalItems, currentPage * itemsPerPage)}</span> of{" "}
          <span className="text-amber-950 font-bold">{totalItems}</span>
        </span>
        
        <div className="flex items-center gap-2 ml-4">
          <span className="text-sm font-medium text-amber-900/60">Per page:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="bg-white border border-amber-900/10 rounded-lg text-sm font-bold text-amber-950 px-2 py-1 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all cursor-pointer"
          >
            {[5, 10, 20, 50].map((num) => (
              <option key={num} value={num} className="bg-white">{num}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center gap-1 order-1 sm:order-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-xl border border-amber-900/10 bg-white text-amber-950 hover:bg-amber-50 disabled:opacity-30 disabled:hover:bg-white transition-all active:scale-90"
        >
          <ChevronLeft size={20} />
        </button>

        {startPage > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className={`min-w-[40px] h-10 rounded-xl font-bold transition-all active:scale-90 px-2 ${
                currentPage === 1 ? "bg-amber-950 text-white shadow-lg" : "text-amber-950 hover:bg-amber-50"
              }`}
            >
              1
            </button>
            {startPage > 2 && <MoreHorizontal size={16} className="text-amber-900/20 mx-1" />}
          </>
        )}

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`min-w-[40px] h-10 rounded-xl font-bold transition-all active:scale-90 px-2 ${
              currentPage === page ? "bg-amber-700 text-white shadow-lg shadow-amber-900/40" : "text-amber-950 hover:bg-amber-50"
            }`}
          >
            {page}
          </button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <MoreHorizontal size={16} className="text-amber-900/20 mx-1" />}
            <button
              onClick={() => onPageChange(totalPages)}
              className={`min-w-[40px] h-10 rounded-xl font-bold transition-all active:scale-90 px-2 ${
                currentPage === totalPages ? "bg-amber-950 text-white shadow-lg shadow-amber-900/40" : "text-amber-950 hover:bg-amber-50"
              }`}
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-xl border border-amber-900/10 bg-white text-amber-950 hover:bg-amber-50 disabled:opacity-30 disabled:hover:bg-white transition-all active:scale-90"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
