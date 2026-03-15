import React, { useMemo } from "react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from "recharts";
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  Coffee, 
  ArrowUpRight, 
  Clock,
  Heart
} from "lucide-react";
import { useAuth } from "../../context/AuthProvider";

const DashboardOverview = () => {
  const { user, role } = useAuth();

  // Mock data for charts
  const salesData = [
    { name: "Mon", sales: 4000, products: 2400 },
    { name: "Tue", sales: 3000, products: 1398 },
    { name: "Wed", sales: 2000, products: 9800 },
    { name: "Thu", sales: 2780, products: 3908 },
    { name: "Fri", sales: 1890, products: 4800 },
    { name: "Sat", sales: 2390, products: 3800 },
    { name: "Sun", sales: 3490, products: 4300 },
  ];

  const categoryData = [
    { name: "Dark Roast", value: 400, color: "#331a15" },
    { name: "Light Roast", value: 300, color: "#78350f" },
    { name: "Decaf", value: 200, color: "#92400e" },
    { name: "Blends", value: 278, color: "#d97706" },
  ];

  const stats = useMemo(() => {
    const common = [
      { label: "Active Sessions", value: "12", icon: <Clock className="text-amber-500" /> },
    ];

    if (role === "admin") {
      return [
        { label: "Total Revenue", value: "$45,285", icon: <TrendingUp className="text-emerald-500" />, trend: "+12.5%" },
        { label: "New Customers", value: "842", icon: <Users className="text-blue-500" />, trend: "+3.2%" },
        { label: "Total Sales", value: "1,240", icon: <ShoppingBag className="text-purple-500" />, trend: "+8.1%" },
        ...common
      ];
    } else if (role === "seller") {
      return [
        { label: "Total Earned", value: "$12,840", icon: <TrendingUp className="text-emerald-500" />, trend: "+15.2%" },
        { label: "My Products", value: "24", icon: <Coffee className="text-amber-700" /> },
        { label: "Items Sold", value: "312", icon: <ShoppingBag className="text-purple-500" />, trend: "+5.4%" },
        ...common
      ];
    } else {
      return [
        { label: "Total Spent", value: "$1,245", icon: <ShoppingBag className="text-amber-700" /> },
        { label: "Wishlist Items", value: "8", icon: <Heart className="text-rose-500" /> },
        { label: "Order Count", value: "15", icon: <Coffee className="text-amber-900" /> },
        ...common
      ];
    }
  }, [role]);

  return (
    <div className="space-y-8 animate-in fade-in duration-700 h-full">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-black text-amber-950 tracking-tight">
          Welcome back, {user?.displayName || user?.name || "Artisan"}
        </h1>
        <p className="text-amber-900/60 font-bold mt-1 uppercase tracking-widest text-xs">
          Here's what's brewing in your {role} dashboard
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="group p-6 bg-white rounded-[2.5rem] border border-amber-900/10 shadow-xl shadow-amber-900/5 hover:scale-[1.02] transition-all cursor-default relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform">
                {stat.icon}
             </div>
             <p className="text-amber-900/40 text-[10px] uppercase font-black tracking-widest mb-1">{stat.label}</p>
             <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-black text-amber-950">{stat.value}</h3>
                {stat.trend && (
                  <span className="text-[10px] font-black text-emerald-500 flex items-center gap-0.5">
                    <ArrowUpRight size={10} />
                    {stat.trend}
                  </span>
                )}
             </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[3rem] border border-amber-900/10 shadow-xl shadow-amber-900/5 overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-black text-amber-950">Revenue Analytics</h3>
              <p className="text-[10px] text-amber-900/40 uppercase font-black tracking-[0.2em]">Last 7 Days Growth</p>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#78350f" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#78350f" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5e0c3" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#92400e', fontSize: 10, fontWeight: 700 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#92400e', fontSize: 10, fontWeight: 700 }}
                  tickFormatter={(val) => `$${val}`}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '24px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgba(120, 53, 15, 0.1)',
                    backgroundColor: '#331a15',
                    color: 'white'
                  }}
                  itemStyle={{ color: '#fbbf24', fontWeight: 900 }}
                  labelStyle={{ color: 'rgba(255,255,255,0.5)', fontWeight: 800, textTransform: 'uppercase', fontSize: '10px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#78350f" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorSales)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution / Bar Chart */}
        <div className="bg-white p-8 rounded-[3rem] border border-amber-900/10 shadow-xl shadow-amber-900/5 overflow-hidden">
          <div className="mb-8">
            <h3 className="text-xl font-black text-amber-950">Coffee Metrics</h3>
            <p className="text-[10px] text-amber-900/40 uppercase font-black tracking-[0.2em]">Popularity by Roast</p>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#92400e', fontSize: 8, fontWeight: 700 }}
                />
                <Tooltip 
                  cursor={{ fill: '#fef3c7', opacity: 0.4 }}
                  contentStyle={{ 
                    borderRadius: '20px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgba(120, 53, 15, 0.1)',
                    backgroundColor: '#331a15'
                  }}
                />
                <Bar dataKey="value" radius={[10, 10, 10, 10]}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
