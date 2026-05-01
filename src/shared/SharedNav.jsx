import ThemeToggle from "../components/ThemeToggle";

const SharedNav = () => {
  return (
    <div
      style={{
        backgroundImage: "url('/more/15.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="py-6 md:py-8 border-b border-white/10 relative"
    >
      <div className="flex items-center justify-center gap-3 text-white font-outfit font-black text-2xl md:text-3xl tracking-tighter">
        <img src="/more/logo1.png" alt="Logo" className="h-10 md:h-12 w-auto drop-shadow-lg" />
        <span className="drop-shadow-md">Espresso <span className="text-amber-400">Emporium</span></span>
      </div>
      
      <div className="absolute right-4 top-1/2 -translate-y-1/2 md:right-8">
        <ThemeToggle />
      </div>
    </div>
  );
};
export default SharedNav;
