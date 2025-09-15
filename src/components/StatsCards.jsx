import React, { useEffect, useState } from "react";
import { 
  Users, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Award,
  Calendar,
  Star,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

export default function StatsCards({ summary }) {
  const [animatedValues, setAnimatedValues] = useState({
    totalCustomers: 0,
    totalOrders: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    if (!summary) return;
    const duration = 1500;
    const steps = 60;
    const stepDuration = duration / steps;
    let step = 0;
    
    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      const easeOut = 1 - Math.pow(1 - progress, 4);
      
      setAnimatedValues({
        totalCustomers: Math.floor(summary.totalCustomers * easeOut),
        totalOrders: Math.floor(summary.totalOrders * easeOut),
        totalRevenue: Math.floor(summary.totalRevenue * easeOut)
      });
      
      if (progress === 1) clearInterval(timer);
    }, stepDuration);
    
    return () => clearInterval(timer);
  }, [summary]);

  const formatNumber = (num) => new Intl.NumberFormat().format(num);
  const formatCurrency = (num) =>
    new Intl.NumberFormat("en-US", { 
      style: "currency", 
      currency: "USD", 
      minimumFractionDigits: 0 
    }).format(num);

  const stats = [
    { 
      title: "Total Customers", 
      value: animatedValues.totalCustomers, 
      formatter: formatNumber, 
      icon: Users, 
      change: "+12%", 
      isPositive: true,
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-blue-100",
      description: "Active customers this month"
    },
    { 
      title: "Total Orders", 
      value: animatedValues.totalOrders, 
      formatter: formatNumber, 
      icon: ShoppingCart, 
      change: "+8%", 
      isPositive: true,
      gradient: "from-emerald-500 to-emerald-600",
      bgGradient: "from-emerald-50 to-emerald-100",
      description: "Orders completed this month"
    },
    { 
      title: "Total Revenue", 
      value: animatedValues.totalRevenue, 
      formatter: formatCurrency, 
      icon: DollarSign, 
      change: "+15%", 
      isPositive: true,
      gradient: "from-violet-500 to-violet-600",
      bgGradient: "from-violet-50 to-violet-100",
      description: "Revenue generated this month"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          const TrendIcon = stat.isPositive ? TrendingUp : TrendingDown;
          const ArrowIcon = stat.isPositive ? ArrowUpRight : ArrowDownRight;
          
          return (
            <div 
              key={i} 
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative overflow-hidden hover:shadow-md transition-all duration-300 group"
            >
              {/* Background Pattern */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.gradient} rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`flex items-center space-x-1 text-xs font-semibold px-2 py-1 rounded-full ${
                    stat.isPositive 
                      ? "text-green-700 bg-green-100" 
                      : "text-red-700 bg-red-100"
                  }`}>
                    <ArrowIcon className="w-3 h-3" />
                    <span>{stat.change}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-sm font-medium text-gray-600 mb-1 uppercase tracking-wide">
                  {stat.title}
                </h3>
                
                {/* Value */}
                <div className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
                  {stat.formatter(stat.value)}
                </div>
                
                {/* Description */}
                <p className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors">
                  {stat.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Top Customers Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Top 5 Customers</h3>
              <p className="text-sm text-gray-500">Highest spending customers this month</p>
            </div>
          </div>
          <div className="text-xs text-gray-400 flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>This month</span>
          </div>
        </div>

        <div className="space-y-3">
          {summary?.topCustomers?.map((customer, idx) => (
            <div 
              key={idx} 
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
            >
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                    idx === 0 ? 'bg-yellow-100 text-yellow-700' :
                    idx === 1 ? 'bg-gray-100 text-gray-700' :
                    idx === 2 ? 'bg-orange-100 text-orange-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {idx + 1}
                  </div>
                  {idx < 3 && (
                    <div className="absolute -top-1 -right-1">
                      <Star className={`w-4 h-4 ${
                        idx === 0 ? 'text-yellow-500' :
                        idx === 1 ? 'text-gray-500' :
                        'text-orange-500'
                      }`} fill="currentColor" />
                    </div>
                  )}
                </div>
                
                <div>
                  <p className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    {customer.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {customer.orders ? `${customer.orders} orders` : 'Premium customer'}
                    {customer.lastOrder && ` • Last order: ${customer.lastOrder}`}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-bold text-gray-900 text-lg">
                  {formatCurrency(customer.totalSpent)}
                </p>
                <div className="flex items-center justify-end mt-1">
                  <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                  <span className="text-xs text-green-600 font-medium">Active</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <button className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium py-2 hover:bg-blue-50 rounded-lg transition-colors duration-200">
            View All Customers →
          </button>
        </div>
      </div>
    </div>
  );
}