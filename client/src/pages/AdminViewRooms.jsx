import React, { useState, useEffect } from "react";
import {
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Crown,
  Star,
  Bed,
  Users,
  RefreshCw,
  Search,
  Filter,
  MoreVertical,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Thermometer,
  Tv,
  Wind,
  Refrigerator,
  Sofa,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToast } from "../toastConfig.js";

const ViewRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);
  const [trigger, setTrigger] = useState(0);

  const navigate = useNavigate();

  // Fetch rooms function
  const fetchRooms = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/room/get-all-rooms");
      const data = await res.json();
      console.log(data);

      if (data.success === false) {
        setError("Failed to fetch rooms");
        showToast("error", "Failed to fetch rooms", { autoClose: 3000 });
        return;
      }

      const sortedRooms = data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setRooms(sortedRooms);
      showToast("success", "Rooms loaded successfully", { autoClose: 2000 });
    } catch (err) {
      setError("Failed to fetch rooms");
      showToast("error", "Failed to fetch rooms", { autoClose: 3000 });
      console.error("Error fetching rooms:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initialFetchRooms = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/room/get-all-rooms");
        const data = await res.json();
        console.log(data);
        
        if (data.success === false) {
          setError("Failed to fetch rooms");
          showToast("error", "Failed to fetch rooms", { autoClose: 3000 });
          return;
        }

        const sortedRooms = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setRooms(sortedRooms);
      } catch (err) {
        setError("Failed to fetch rooms");
        showToast("error", "Failed to fetch rooms", { autoClose: 3000 });
        console.error("Error fetching rooms:", err);
      } finally {
        setLoading(false);
      }
    };

    initialFetchRooms();
  }, [trigger]);

  // Delete room function
  const handleDeleteRoom = async (roomId) => {
    try {
      setActionLoading(roomId);
      const res = await fetch(`/api/room/delete/${roomId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (data.success === false) {
        throw new Error(data.message || "Failed to delete room");
      }
      
      setShowDeleteModal(false);
      setRoomToDelete(null);
      setTrigger((prev) => prev + 1);
      showToast("success", "Room deleted successfully", { autoClose: 3000 });
    } catch (err) {
      showToast("error", err.message || "Failed to delete room", {
        autoClose: 3000,
      });
    } finally {
      setActionLoading(null);
    }
  };

  // Update room function
  const handleUpdateRoom = (roomId) => {
    navigate(`/admin/update-room/${roomId}`);
  };

  // Toggle room availability function
  const handleViewRoom = async (room) => {
    try {
      setActionLoading(room._id);
      
      // Store the current state to show correct message
      const newAvailabilityStatus = !room.isAvailable;
      const statusMessage = newAvailabilityStatus 
        ? `Room "${room.name}" is now visible to customers` 
        : `Room "${room.name}" is now hidden from customers`;

      const res = await fetch(`/api/room/update/${room._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isAvailable: newAvailabilityStatus }),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        throw new Error(data.message || "Failed to change room availability");
      }

      // Show toast immediately after successful API call
      showToast("success", statusMessage, { autoClose: 3000 });
      
      // Delay the state update slightly to ensure toast appears first
      setTimeout(() => {
        setTrigger((prev) => prev + 1);
      }, 100);
      
      console.log("Availability updated");
    } catch (err) {
      showToast("error", err.message || "Failed to change room availability", {
        autoClose: 3000,
      });
    } finally {
      setActionLoading(null);
    }
  };

  // Filter and search logic
  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterType === "all" ||
      (filterType === "premium" && room.regularPrice >= 400) ||
      (filterType === "standard" && room.regularPrice < 400) ||
      (filterType === "offer" && room.offer);

    return matchesSearch && matchesFilter;
  });

  // Amenity icons
  const amenityIcons = {
    waterHeater: Thermometer,
    Tv: Tv,
    DSTV: Tv,
    AC: Wind,
    fridge: Refrigerator,
    sofa: Sofa,
  };

  if (loading && rooms.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin text-green-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading rooms...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">View Rooms</h1>
          <p className="text-gray-600">Manage all your room listings</p>
        </div>
        <button
          onClick={fetchRooms}
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search rooms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="sm:w-48">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:outline-none focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Rooms</option>
              <option value="premium">Premium (₵400+)</option>
              <option value="standard">Standard (&lt;₵400)</option>
              <option value="offer">On Offer</option>
            </select>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-600" />
          <span className="text-red-700">{error}</span>
        </div>
      )}

      {/* Rooms Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-sm text-gray-600">Total Rooms</div>
          <div className="text-2xl font-bold text-gray-900">{rooms.length}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-sm text-gray-600">Premium Rooms</div>
          <div className="text-2xl font-bold text-yellow-600">
            {rooms.filter((r) => r.regularPrice >= 400).length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-sm text-gray-600">On Offer</div>
          <div className="text-2xl font-bold text-green-600">
            {rooms.filter((r) => r.offer).length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-sm text-gray-600">Available</div>
          <div className="text-2xl font-bold text-blue-600">
            {rooms.filter((r) => r.isAvailable).length}
          </div>
        </div>
      </div>

      {/* Rooms Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        {filteredRooms.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Bed className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No rooms found
            </h3>
            <p className="text-gray-600">
              {searchTerm || filterType !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Start by creating your first room"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">
                    Room
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">
                    Type & Amenities
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">
                    Pricing
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">
                    Updated
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredRooms.map((room) => (
                  <tr key={room._id} className="hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          <img
                            src={room.imageURLs[0]}
                            alt={room.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-gray-900 truncate">
                              {room.name}
                            </h3>
                            {room.regularPrice >= 400 && (
                              <Crown className="h-4 w-4 text-yellow-500" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {room.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-1 text-sm">
                          <Bed className="h-4 w-4 text-gray-500" />
                          <span>{room.bedType}</span>
                        </div>
                        <div className="flex gap-1">
                          {Object.entries(amenityIcons).map(
                            ([key, Icon]) =>
                              room[key] && (
                                <Icon
                                  key={key}
                                  className={`h-4 w-4 ${
                                    room[key]
                                      ? "text-green-600"
                                      : "text-gray-300"
                                  }`}
                                  title={key}
                                />
                              )
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        {room.offer ? (
                          <>
                            <div className="text-lg font-bold text-green-600">
                              ₵{room.discountedPrice}
                            </div>
                            <div className="text-sm text-gray-500 line-through">
                              ₵{room.regularPrice}
                            </div>
                          </>
                        ) : (
                          <div className="text-lg font-bold text-gray-900">
                            ₵{room.regularPrice}
                          </div>
                        )}
                        <div className="text-xs text-gray-500">per night</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          {room.isAvailable ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Available
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              <XCircle className="h-3 w-3 mr-1" />
                              Hidden
                            </span>
                          )}
                        </div>
                        <div className="space-y-1">
                          {room.offer && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              <Star className="h-3 w-3 mr-1" />
                              On Offer
                            </span>
                          )}
                          {room.regularPrice >= 400 && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              <Crown className="h-3 w-3 mr-1" />
                              Premium
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                      {new Date(room.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleViewRoom(room)}
                          disabled={actionLoading === room._id}
                          className="text-blue-600 hover:text-blue-800 p-1 rounded disabled:opacity-50"
                          title={`${room.isAvailable ? 'Hide' : 'Show'} Room`}
                        >
                          {actionLoading === room._id ? (
                            <RefreshCw className="h-4 w-4 animate-spin" />
                          ) : room.isAvailable ? (
                            <Eye className="h-4 w-4" />
                          ) : (
                            <EyeOff className="h-4 w-4" />
                          )}
                        </button>
                        <button
                          onClick={() => handleUpdateRoom(room._id)}
                          className="text-green-600 hover:text-green-800 p-1 rounded"
                          title="Edit Room"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            setRoomToDelete(room);
                            setShowDeleteModal(true);
                          }}
                          className="text-red-600 hover:text-red-800 p-1 rounded"
                          title="Delete Room"
                          disabled={actionLoading === room._id}
                        >
                          
                            <Trash2 className="h-4 w-4" />
                          
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && roomToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Trash2 className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Delete Room
                </h3>
                <p className="text-sm text-gray-600">
                  This action cannot be undone
                </p>
              </div>
            </div>

            <p className="text-gray-700 mb-6">
              Are you sure you want to delete "
              <strong>{roomToDelete.name}</strong>"? This will permanently
              remove the room and all its data.
            </p>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setRoomToDelete(null);
                }}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                disabled={actionLoading}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteRoom(roomToDelete._id)}
                disabled={actionLoading}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center gap-2"
              >
                {actionLoading ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4" />
                    Delete Room
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default ViewRooms;