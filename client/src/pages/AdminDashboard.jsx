import React, { useState, useEffect } from "react";
import {
  Home,
  Crown,
  TrendingUp,
  DollarSign,
  Bed,
  Eye,
  Star,
  Users,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Plus,
  Edit,
  BarChart3,
  PieChart,
  Activity,
  Percent,
  MapPin,
  Phone,
  AlertCircle,
  CheckCircle,
  Clock,
  Thermometer,
  Tv,
  Wind,
  Refrigerator,
  Sofa
} from "lucide-react";

const Dashboard = ({ onNavigate = () => {} }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState("30"); // days

  // Mock rooms data - same as before
  const mockRooms = [
    {
      _id: "1",
      name: "Executive Suite",
      description: "Luxurious executive suite with premium amenities and stunning views.",
      regularPrice: 500,
      discountedPrice: 450,
      waterHeater: true,
      bedType: "Queen Size",
      offer: true,
      imageURLs: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"],
      Tv: true,
      DSTV: true,
      AC: true,
      fridge: true,
      sofa: true,
      userRef: "admin",
      createdAt: "2024-01-15T10:30:00Z",
      bookings: 24,
      revenue: 10800,
      occupancyRate: 85
    },
    {
      _id: "2",
      name: "Deluxe Room",
      description: "Spacious deluxe room featuring modern amenities.",
      regularPrice: 400,
      discountedPrice: 350,
      waterHeater: true,
      bedType: "Queen Size",
      offer: true,
      imageURLs: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"],
      Tv: true,
      DSTV: true,
      AC: true,
      fridge: true,
      sofa: true,
      userRef: "admin",
      createdAt: "2024-01-10T09:15:00Z",
      bookings: 18,
      revenue: 6300,
      occupancyRate: 72
    },
    {
      _id: "3",
      name: "Queen Room",
      description: "Comfortable queen room with essential amenities.",
      regularPrice: 350,
      discountedPrice: 320,
      waterHeater: true,
      bedType: "Queen Size",
      offer: false,
      imageURLs: ["https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"],
      Tv: true,
      DSTV: true,
      AC: true,
      fridge: true,
      sofa: false,
      userRef: "admin",
      createdAt: "2024-01-08T11:20:00Z",
      bookings: 15,
      revenue: 5250,
      occupancyRate: 68
    },
    {
      _id: "4",
      name: "Double Room",
      description: "Cozy double room with basic amenities.",
      regularPrice: 250,
      discountedPrice: 230,
      waterHeater: true,
      bedType: "Double Size",
      offer: false,
      imageURLs: ["https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"],
      Tv: true,
      DSTV: false,
      AC: true,
      fridge: true,
      sofa: false,
      userRef: "admin",
      createdAt: "2024-01-05T14:45:00Z",
      bookings: 22,
      revenue: 5500,
      occupancyRate: 78
    },
    {
      _id: "5",
      name: "Studio Room",
      description: "Compact studio room with essential facilities.",
      regularPrice: 200,
      discountedPrice: 180,
      waterHeater: false,
      bedType: "King Size",
      offer: true,
      imageURLs: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"],
      Tv: true,
      DSTV: false,
      AC: true,
      fridge: true,
      sofa: false,
      userRef: "admin",
      createdAt: "2024-01-03T08:30:00Z",
      bookings: 28,
      revenue: 5040,
      occupancyRate: 82
    }
  ];

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setRooms(mockRooms);
    } catch (err) {
      setError("Failed to fetch dashboard data");
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [timeRange]);

  // Calculate dashboard metrics
  const dashboardMetrics = React.useMemo(() => {
    if (rooms.length === 0) return null;

    const totalRooms = rooms.length;
    const premiumRooms = rooms.filter(room => room.regularPrice >= 400).length;
    const standardRooms = totalRooms - premiumRooms;
    const roomsOnOffer = rooms.filter(room => room.offer).length;
    
    const totalBookings = rooms.reduce((sum, room) => sum + (room.bookings || 0), 0);
    const totalRevenue = rooms.reduce((sum, room) => sum + (room.revenue || 0), 0);
    const avgOccupancy = rooms.reduce((sum, room) => sum + (room.occupancyRate || 0), 0) / rooms.length;
    
    const avgRoomPrice = rooms.reduce((sum, room) => sum + room.regularPrice, 0) / rooms.length;
    const totalDiscountValue = rooms
      .filter(room => room.offer)
      .reduce((sum, room) => sum + (room.regularPrice - room.discountedPrice), 0);

    const topPerformingRoom = rooms.reduce((top, room) => 
      (room.revenue || 0) > (top.revenue || 0) ? room : top
    );

    const recentlyAdded = rooms
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 3);

    return {
      totalRooms,
      premiumRooms,
      standardRooms,
      roomsOnOffer,
      totalBookings,
      totalRevenue,
      avgOccupancy,
      avgRoomPrice,
      totalDiscountValue,
      topPerformingRoom,
      recentlyAdded
    };
  }, [rooms]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin text-green-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <AlertCircle className="h-8 w-8 text-red-600 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-red-800 mb-2">Error Loading Dashboard</h3>
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={fetchDashboardData}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your rooms.</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
          </select>
          <button
            onClick={fetchDashboardData}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Rooms</p>
              <p className="text-3xl font-bold">{dashboardMetrics?.totalRooms || 0}</p>
            </div>
            <Bed className="h-8 w-8 text-blue-200" />
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-blue-100 text-sm">
              {dashboardMetrics?.premiumRooms || 0} Premium • {dashboardMetrics?.standardRooms || 0} Standard
            </span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Total Bookings</p>
              <p className="text-3xl font-bold">{dashboardMetrics?.totalBookings || 0}</p>
            </div>
            <Calendar className="h-8 w-8 text-green-200" />
          </div>
          <div className="mt-4 flex items-center gap-2">
            <ArrowUpRight className="h-4 w-4 text-green-200" />
            <span className="text-green-100 text-sm">+12% from last month</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Total Revenue</p>
              <p className="text-3xl font-bold">₵{dashboardMetrics?.totalRevenue?.toLocaleString() || 0}</p>
            </div>
            <DollarSign className="h-8 w-8 text-purple-200" />
          </div>
          <div className="mt-4 flex items-center gap-2">
            <ArrowUpRight className="h-4 w-4 text-purple-200" />
            <span className="text-purple-100 text-sm">+8% from last month</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm">Avg Occupancy</p>
              <p className="text-3xl font-bold">{Math.round(dashboardMetrics?.avgOccupancy || 0)}%</p>
            </div>
            <Activity className="h-8 w-8 text-yellow-200" />
          </div>
          <div className="mt-4 flex items-center gap-2">
            <ArrowUpRight className="h-4 w-4 text-yellow-200" />
            <span className="text-yellow-100 text-sm">+5% from last month</span>
          </div>
        </div>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Crown className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Premium Rooms</h3>
              <p className="text-sm text-gray-600">High-end accommodations</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Count</span>
              <span className="font-medium">{dashboardMetrics?.premiumRooms || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Avg Price</span>
              <span className="font-medium">₵{Math.round(dashboardMetrics?.avgRoomPrice || 0)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Percent className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Special Offers</h3>
              <p className="text-sm text-gray-600">Discounted rooms</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Rooms on Offer</span>
              <span className="font-medium">{dashboardMetrics?.roomsOnOffer || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Savings</span>
              <span className="font-medium">₵{dashboardMetrics?.totalDiscountValue || 0}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Top Performer</h3>
              <p className="text-sm text-gray-600">Highest revenue</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Room</span>
              <span className="font-medium">{dashboardMetrics?.topPerformingRoom?.name || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Revenue</span>
              <span className="font-medium">₵{dashboardMetrics?.topPerformingRoom?.revenue?.toLocaleString() || 0}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Room Performance Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Room Performance</h3>
              <p className="text-sm text-gray-600">Detailed metrics for each room</p>
            </div>
            <button
              onClick={() => onNavigate('view-rooms')}
              className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center gap-1"
            >
              View All <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Room</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Type</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Price</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Bookings</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Revenue</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Occupancy</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {rooms.map((room) => (
                <tr key={room._id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={room.imageURLs[0]}
                        alt={room.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="font-medium text-gray-900">{room.name}</span>
                          {room.regularPrice >= 400 && (
                            <Crown className="h-4 w-4 text-yellow-500" />
                          )}
                        </div>
                        <span className="text-sm text-gray-600">{room.bedType}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      room.regularPrice >= 400 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {room.regularPrice >= 400 ? 'Premium' : 'Standard'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <span className="font-medium">₵{room.offer ? room.discountedPrice : room.regularPrice}</span>
                      {room.offer && (
                        <span className="text-sm text-gray-500 line-through ml-2">₵{room.regularPrice}</span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-medium">{room.bookings || 0}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-medium">₵{(room.revenue || 0).toLocaleString()}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div className="w-12 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${room.occupancyRate || 0}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{room.occupancyRate || 0}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-1">
                      {room.offer && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          On Offer
                        </span>
                      )}
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => onNavigate('create-room')}
            className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors group"
          >
            <div className="w-10 h-10 bg-green-100 group-hover:bg-green-200 rounded-lg flex items-center justify-center">
              <Plus className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-left">
              <h4 className="font-medium text-gray-900">Add New Room</h4>
              <p className="text-sm text-gray-600">Create a new room listing</p>
            </div>
          </button>

          <button
            onClick={() => onNavigate('view-rooms')}
            className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group"
          >
            <div className="w-10 h-10 bg-blue-100 group-hover:bg-blue-200 rounded-lg flex items-center justify-center">
              <Eye className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-left">
              <h4 className="font-medium text-gray-900">Manage Rooms</h4>
              <p className="text-sm text-gray-600">View and edit existing rooms</p>
            </div>
          </button>

          <button className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors group">
            <div className="w-10 h-10 bg-purple-100 group-hover:bg-purple-200 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-purple-600" />
            </div>
            <div className="text-left">
              <h4 className="font-medium text-gray-900">View Analytics</h4>
              <p className="text-sm text-gray-600">Detailed performance reports</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;