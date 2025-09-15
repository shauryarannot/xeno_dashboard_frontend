import React, { useEffect, useState } from "react";
import { 
  Users, 
  Activity, 
  TrendingUp,
  Calendar,
  RefreshCw,
  Bell,
  Filter,
  Download,
  Star
} from "lucide-react";
import StatsCards from "../components/StatsCards";
import OrdersChart from "../components/OrdersChart";
import { dummyStats, dummyOrders } from "../data/dummyData.js";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [timeRange, setTimeRange] = useState('7d');

  // Recent activity data
  const recentActivity = [
    { id: 1, type: 'order', message: 'New order #1234 from John Doe', time: '2 mins ago', amount: '$89.99', status: 'success' },
    { id: 2, type: 'customer', message: 'New customer registration: Jane Smith', time: '5 mins ago', amount: null, status: 'info' },
    { id: 3, type: 'order', message: 'Order #1233 shipped to Alice Johnson', time: '8 mins ago', amount: '$156.50', status: 'success' },
    { id: 4, type: 'refund', message: 'Refund processed for order #1230', time: '15 mins ago', amount: '-$45.00', status: 'warning' },
    { id: 5, type: 'order', message: 'New order #1235 from Bob Wilson', time: '22 mins ago', amount: '$234.75', status: 'success' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      const newSummary = {
        totalCustomers: dummyStats[0].value,
        totalOrders: dummyStats[1].value,
        totalRevenue: parseInt(dummyStats[2].value.replace(/[$,]/g, "")),
        ordersByDate: dummyOrders,
        topCustomers: [
          { name: "John Doe", totalSpent: 1200, orders: 15, lastOrder: "2 days ago" },
          { name: "Jane Smith", totalSpent: 980, orders: 12, lastOrder: "1 day ago" },
          { name: "Alice Johnson", totalSpent: 870, orders: 10, lastOrder: "3 hours ago" },
          { name: "Bob Brown", totalSpent: 760, orders: 8, lastOrder: "1 week ago" },
          { name: "Charlie Lee", totalSpent: 720, orders: 9, lastOrder: "5 days ago" },
        ],
        weeklyGrowth: 12.5,
        activeUsers: 1847,
        conversionRate: 3.2
      };
      console.log("Loaded summary:", newSummary);
      setSummary(newSummary);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your business.</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-gray-400" />
                <select 
                  value={timeRange} 
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                </select>
              </div>
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6 space-y-8">
        {/* Stats Cards */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Key Metrics</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <TrendingUp className="h-4 w-4" />
              <span>Updated 2 mins ago</span>
            </div>
          </div>
          <StatsCards summary={summary} />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Orders Chart */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Orders Overview</h2>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-50">
                  <Filter className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-50">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
            <OrdersChart data={summary.ordersByDate} />
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
              <Bell className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.status === 'success' ? 'bg-green-400' : 
                    activity.status === 'warning' ? 'bg-yellow-400' : 
                    'bg-blue-400'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 font-medium">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                  {activity.amount && (
                    <span className={`text-sm font-medium ${
                      activity.amount.startsWith('-') ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {activity.amount}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200">
              <button className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium">
                View all activity
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Customers */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Top Customers</h2>
              <Users className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {summary.topCustomers.map((customer, index) => (
                <div key={customer.name} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{customer.name}</p>
                    <p className="text-sm text-gray-500">{customer.orders} orders • Last: {customer.lastOrder}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">${customer.totalSpent.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Quick Stats</h2>
              <Activity className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Weekly Growth</p>
                  <p className="text-2xl font-bold text-green-600">+{summary.weeklyGrowth}%</p>
                </div>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Users</p>
                  <p className="text-2xl font-bold text-blue-600">{summary.activeUsers.toLocaleString()}</p>
                </div>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                  <p className="text-2xl font-bold text-purple-600">{summary.conversionRate}%</p>
                </div>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                  <Star className="h-8 w-8 text-purple-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}