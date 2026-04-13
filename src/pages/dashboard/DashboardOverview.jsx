import React from "react";
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
  Cell,
  LineChart,
  Line
} from "recharts";
import { 
  TrendingUp, 
  ShoppingBag, 
  ArrowUpRight, 
  Box,
  ChevronRight,
  Eye,
  Bell
} from "lucide-react";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useDashboard } from "../../hooks/useDashboard";
import { salesData, categoryData, activities } from "../../utils/mockData";
import { theme } from "../../utils/theme";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

const DashboardOverview = () => {
  const { user, role } = useAuth();
  const navigate = useNavigate();
  const {
    activeTab,
    setActiveTab,
    chartType,
    setChartType,
    stats,
    quickActions
  } = useDashboard(user, role);

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-amber-950 tracking-tight">
            Welcome back, {user?.displayName || user?.name || "Artisan"}
          </h1>
          <p className="text-amber-900/60 font-bold mt-1 uppercase tracking-widest text-[10px]">
            The daily grind looks good today • {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-3 bg-white rounded-2xl border border-amber-900/10 shadow-sm hover:bg-amber-50 transition-all relative">
            <Bell size={20} className="text-amber-900/60" />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-amber-600 border-2 border-white rounded-full"></span>
          </button>
          <div className="h-8 w-[1px] bg-amber-900/10 mx-2"></div>
          <div className="flex bg-white p-1.5 rounded-2xl border border-amber-900/10 shadow-sm">
            {["overview", "activity"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeTab === tab 
                  ? "bg-amber-900 text-white shadow-lg shadow-amber-900/20" 
                  : "text-amber-900/40 hover:text-amber-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {activeTab === "overview" ? (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <Card key={i} padding="p-6" className="group hover:scale-[1.02] transition-all cursor-default relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform">
                  <stat.icon className={stat.iconColor} />
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
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Interactive Chart */}
            <Card className="lg:col-span-2 overflow-hidden" rounded="rounded-[3rem]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                <div>
                  <h3 className="text-xl font-black text-amber-950">Analytics Performance</h3>
                  <p className="text-[10px] text-amber-900/40 uppercase font-black tracking-[0.2em]">Transaction Flow</p>
                </div>
                <div className="flex bg-amber-50 p-1 rounded-xl">
                  {["area", "bar", "line"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setChartType(type)}
                      className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-tighter transition-all ${
                        chartType === type 
                        ? "bg-white text-amber-900 shadow-sm" 
                        : "text-amber-900/40 hover:text-amber-900"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  {chartType === "area" ? (
                    <AreaChart data={salesData}>
                      <defs>
                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={theme.colors.primary[900]} stopOpacity={0.1}/>
                          <stop offset="95%" stopColor={theme.colors.primary[900]} stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.charts.grid} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: theme.colors.primary[800], fontSize: 10, fontWeight: 700 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: theme.colors.primary[800], fontSize: 10, fontWeight: 700 }} tickFormatter={(val) => `$${val}`} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 10px 15px -3px rgba(120, 53, 15, 0.1)', backgroundColor: theme.charts.tooltip.bg, color: theme.charts.tooltip.text }}
                        itemStyle={{ color: theme.charts.tooltip.accent, fontWeight: 900 }}
                        labelStyle={{ color: 'rgba(255,255,255,0.5)', fontWeight: 800, textTransform: 'uppercase', fontSize: '10px' }}
                      />
                      <Area type="monotone" dataKey="sales" stroke={theme.colors.primary[900]} strokeWidth={4} fillOpacity={1} fill="url(#colorSales)" />
                    </AreaChart>
                  ) : chartType === "bar" ? (
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.charts.grid} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: theme.colors.primary[800], fontSize: 10, fontWeight: 700 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: theme.colors.primary[800], fontSize: 10, fontWeight: 700 }} />
                      <Tooltip 
                        cursor={{ fill: theme.colors.primary[100], opacity: 0.4 }}
                        contentStyle={{ borderRadius: '24px', border: 'none', backgroundColor: theme.charts.tooltip.bg, color: theme.charts.tooltip.text }}
                      />
                      <Bar dataKey="sales" fill={theme.colors.primary[900]} radius={[10, 10, 0, 0]} />
                    </BarChart>
                  ) : (
                    <LineChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.charts.grid} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: theme.colors.primary[800], fontSize: 10, fontWeight: 700 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: theme.colors.primary[800], fontSize: 10, fontWeight: 700 }} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '24px', border: 'none', backgroundColor: theme.charts.tooltip.bg, color: theme.charts.tooltip.text }}
                      />
                      <Line type="monotone" dataKey="sales" stroke={theme.colors.primary[900]} strokeWidth={4} dot={{ r: 6, fill: theme.colors.primary[900], strokeWidth: 3, stroke: '#fff' }} activeDot={{ r: 8 }} />
                    </LineChart>
                  )}
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Quick Actions & Small Chart */}
            <div className="space-y-8">
              <Card variant="dark" rounded="rounded-[3rem]" className="relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/5 rounded-full scale-15 group-hover:scale-100 transition-transform duration-700"></div>
                <h3 className="text-xl font-black mb-6">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  {quickActions.map((action, i) => (
                    <button 
                      key={i} 
                      onClick={() => navigate(action.path)}
                      className="flex flex-col items-center justify-center p-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl transition-all group/btn"
                    >
                      <div className="w-10 h-10 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center mb-2 group-hover/btn:scale-110 transition-transform">
                        <action.icon size={16} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-center">{action.label}</span>
                    </button>
                  ))}
                </div>
              </Card>

              <Card rounded="rounded-[3rem]" className="overflow-hidden">
                <h3 className="text-xl font-black text-amber-950 mb-6">Roast Mix</h3>
                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryData}>
                      <XAxis dataKey="name" hide />
                      <Tooltip cursor={false} contentStyle={{ borderRadius: '20px', border: 'none', backgroundColor: theme.charts.tooltip.bg, color: theme.charts.tooltip.text }} />
                      <Bar dataKey="value" radius={[20, 20, 20, 20]}>
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
          </div>
        </>
      ) : (
        /* Activity Feed Tab */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in slide-in-from-bottom-5 duration-500">
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-2xl font-black text-amber-950 ml-2">Recent Timeline</h3>
            {activities.map((act) => (
              <div key={act.id} className="group p-6 bg-white rounded-3xl border border-amber-900/10 shadow-sm hover:shadow-md transition-all flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                    act.type === 'order' ? 'bg-emerald-50 text-emerald-600' : 
                    act.type === 'finance' ? 'bg-blue-50 text-blue-600' :
                    act.type === 'inventory' ? 'bg-amber-50 text-amber-700' : 'bg-purple-50 text-purple-600'
                  }`}>
                    {act.type === 'order' ? <ShoppingBag size={24} /> : 
                     act.type === 'finance' ? <TrendingUp size={24} /> :
                     act.type === 'inventory' ? <Box size={24} /> : <Eye size={24} />}
                  </div>
                  <div>
                    <h4 className="font-black text-amber-950 text-lg leading-tight">{act.title}</h4>
                    <span className="text-[10px] text-amber-900/40 font-bold uppercase tracking-widest">{act.time}</span>
                  </div>
                </div>
                <button className="p-3 hover:bg-amber-50 rounded-xl transition-colors text-amber-900/20 hover:text-amber-900">
                  <ChevronRight size={20} />
                </button>
              </div>
            ))}
          </div>

          <Card variant="glass" className="flex flex-col items-center justify-center text-center space-y-4 h-full min-h-[400px]">
            <Bell size={48} className="text-amber-900/20" />
            <h4 className="text-xl font-black text-amber-950">Stay Notified</h4>
            <p className="text-sm text-amber-900/40 font-medium">Configure your webhooks and alerts to never miss a batch.</p>
            <Button>Configure Alerts</Button>
          </Card>
        </div>
      )}
    </div>
  );
};

export default DashboardOverview;
