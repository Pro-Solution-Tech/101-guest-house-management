import React, { useState, useEffect } from "react";
import {
  Wifi,
  Car,
  Coffee,
  Tv,
  Bath,
  Wind,
  Utensils,
  Star,
  MapPin,
  Phone,
  ArrowRight,
  CheckCircle,
  Calendar,
  Users,
  Bed,
  ChevronLeft,
  ChevronRight,
  Share2,
  Crown,
  Thermometer,
  Sofa,
  Refrigerator,
  WifiOff,
  ArrowLeft,
} from "lucide-react";

// WhatsApp icon component
const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488z" />
  </svg>
);

// Custom Image Gallery Component
const ImageGallery = ({
  images,
  autoSlide = false,
  interval = 4000,
  fullHeight = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (autoSlide) {
      const slideInterval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, interval);

      return () => clearInterval(slideInterval);
    }
  }, [autoSlide, interval, images.length]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div
      className={`relative w-full ${
        fullHeight ? "h-full" : "h-64 md:h-80"
      } overflow-hidden rounded-lg`}
    >
      {/* Images */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image}
              alt={`Room view ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all duration-300 z-10"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all duration-300 z-10"
          >
            <ChevronRight size={20} />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-yellow-400"
                    : "bg-white bg-opacity-50 hover:bg-opacity-70"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// Share URL function
const shareRoom = async (roomId, roomName) => {
  const url = `${window.location.origin}/rooms`;

  if (navigator.share) {
    try {
      await navigator.share({
        title: `${roomName} - 101 Guest House`,
        text: `Check out this room at 101 Guest House`,
        url: url,
      });
    } catch (error) {
      // Fallback to clipboard
      navigator.clipboard.writeText(url);
      alert("Room link copied to clipboard!");
    }
  } else {
    // Fallback to clipboard
    navigator.clipboard.writeText(url);
    alert("Room link copied to clipboard!");
  }
};

// Amenity icons mapping
const amenityIcons = {
  waterHeater: { icon: Thermometer, label: "Water Heater" },
  Tv: { icon: Tv, label: "TV" },
  DSTV: { icon: Tv, label: "DSTV" },
  AC: { icon: Wind, label: "Air Conditioning" },
  fridge: { icon: Refrigerator, label: "Refrigerator" },
  sofa: { icon: Sofa, label: "Sofa" },
};

// Room Details
const Rooms = ({ onNavigate = () => {} }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/room/get-all-rooms');
        const data = await res.json();
        if (data.success === false) {
          setError("Failed to fetch rooms");
          setLoading(false);
          return;
        }
        const availableRooms = data.filter(room => room.isAvailable);
        const sortedRooms = availableRooms.sort((a, b) => {
          const aPremium = a.regularPrice >= 400;
          const bPremium = b.regularPrice >= 400;

          if (aPremium && !bPremium) return -1;
          if (!aPremium && bPremium) return 1;
          return b.regularPrice - a.regularPrice;
        });

        setRooms(sortedRooms);
      } catch (err) {
        setError("Failed to fetch rooms");
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  // Whatsapp booking handler
  const handleBookRoom = (room) => {
    const message = `Hi! I'd like to book the ${
      room.name
    } at 101 Guest House. Price: ₵${
      room.offer ? room.discountedPrice : room.regularPrice
    }/night`;
    const whatsappUrl = `https://wa.me/233598937110?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const renderAmenities = (room) => {
    const amenities = [];

    Object.entries(amenityIcons).forEach(([key, { icon: Icon, label }]) => {
      if (room[key]) {
        amenities.push(
          <div key={key} className="flex items-center gap-2 text-sm">
            <Icon className="text-green-600" size={16} />
            <span className="text-gray-700">{label}</span>
          </div>
        );
      }
    });

    return amenities;
  };

  // Separate premium and regular rooms
  const premiumRooms = rooms.filter((room) => room.regularPrice >= 400);
  const regularRooms = rooms.filter((room) => room.regularPrice < 400);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading rooms...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Our Rooms</h1>
            <p className="text-xl md:text-2xl text-yellow-400 font-medium mb-2">
              COMFORTABILITY WITH CLASS
            </p>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              Choose from our carefully curated selection of rooms, each
              designed for your comfort and convenience.
            </p>
          </div>
        </div>
      </section>

      {/* Premium Rooms Section - Compact Layout */}
      {premiumRooms.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-yellow-50 to-orange-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Crown className="text-yellow-500" size={32} />
                <h2 className="text-3xl md:text-4xl font-bold text-green-800">
                  Premium Rooms
                </h2>
                <Crown className="text-yellow-500" size={32} />
              </div>
              <p className="text-lg text-gray-600">
                Experience luxury and exceptional comfort
              </p>
            </div>

            <div className="space-y-8">
              {premiumRooms.map((room) => {
                const amenities = renderAmenities(room);

                return (
                  <div
                    key={room._id}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-yellow-200"
                  >
                    <div className="flex flex-col lg:flex-row lg:h-[28rem]">
                      {" "}
                      {/* Reduced height */}
                      {/* Image Section */}
                      <div className="lg:w-1/2 relative h-64 lg:h-full">
                        <div className="absolute top-4 left-4 z-20 bg-yellow-400 text-green-800 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                          <Crown size={16} />
                          Premium
                        </div>
                        <ImageGallery
                          images={room.imageURLs}
                          fullHeight={true}
                        />
                      </div>
                      {/* Content Section */}
                      <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col">
                        <div className="flex-grow">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="text-2xl font-bold text-green-800">
                              {room.name}
                            </h3>
                            <button
                              onClick={() => shareRoom(room._id, room.name)}
                              className="text-gray-500 hover:text-green-600 transition-colors p-2"
                              title="Share this room"
                            >
                              <Share2 size={24} />
                            </button>
                          </div>

                          <p className="text-gray-600 mb-4 text-base leading-relaxed">
                            {room.description}
                          </p>

                          {/* Bed Type */}
                          <div className="flex items-center gap-2 mb-4">
                            <Bed className="text-green-600" size={20} />
                            <span className="text-lg text-gray-700 font-medium">
                              {room.bedType} Bed
                            </span>
                          </div>

                          {/* Amenities */}
                          <div className="grid grid-cols-2 gap-3 mb-4">
                            {amenities.map((amenity, index) => (
                              <div key={index} className="text-sm">
                                {amenity}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Pricing and Book Button */}
                        <div className="mt-auto">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                              {room.offer ? (
                                <div className="flex items-center gap-3">
                                  <span className="text-2xl font-bold text-green-600">
                                    ₵{room.discountedPrice}
                                  </span>
                                  <span className="text-lg text-gray-500 line-through">
                                    ₵{room.regularPrice}
                                  </span>
                                  <div className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-sm font-bold">
                                    {Math.round(
                                      ((room.regularPrice -
                                        room.discountedPrice) /
                                        room.regularPrice) *
                                        100
                                    )}
                                    % OFF
                                  </div>
                                </div>
                              ) : (
                                <span className="text-2xl font-bold text-green-600">
                                  ₵{room.regularPrice}
                                </span>
                              )}
                              <p className="text-gray-500 text-sm">per night</p>
                            </div>

                            <button
                              onClick={() => handleBookRoom(room)}
                              className="bg-yellow-400 text-green-800 hover:bg-yellow-300 py-3 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3"
                            >
                              Book Now
                              <ArrowRight size={20} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Divider Line */}
      {premiumRooms.length > 0 && regularRooms.length > 0 && (
        <div className="py-8">
          <div className="container mx-auto px-4">
            <div className="relative">
              <hr className="border-t-2 border-gray-300" />
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-50 px-6">
                <span className="text-gray-500 font-medium text-lg">
                  Standard Rooms
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Regular Rooms Section */}
      {regularRooms.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularRooms.map((room) => {
                const amenities = renderAmenities(room);

                return (
                  <div
                    key={room._id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105"
                  >
                    {/* Room Images */}
                    <ImageGallery images={room.imageURLs} />

                    {/* Room Details */}
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-green-800">
                          {room.name}
                        </h3>
                        <button
                          onClick={() => shareRoom(room._id, room.name)}
                          className="text-gray-500 hover:text-green-600 transition-colors"
                          title="Share this room"
                        >
                          <Share2 size={20} />
                        </button>
                      </div>

                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {room.description}
                      </p>

                      {/* Bed Type */}
                      <div className="flex items-center gap-2 mb-4">
                        <Bed className="text-green-600" size={16} />
                        <span className="text-sm text-gray-700">
                          {room.bedType} Bed
                        </span>
                      </div>

                      {/* Amenities */}
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {amenities.slice(0, 4).map((amenity, index) => (
                          <div key={index}>{amenity}</div>
                        ))}
                        {amenities.length > 4 && (
                          <div className="text-sm text-gray-500 col-span-2">
                            +{amenities.length - 4} more amenities
                          </div>
                        )}
                      </div>

                      {/* Pricing */}
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          {room.offer ? (
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-bold text-green-600">
                                ₵{room.discountedPrice}
                              </span>
                              <span className="text-sm text-gray-500 line-through">
                                ₵{room.regularPrice}
                              </span>
                            </div>
                          ) : (
                            <span className="text-2xl font-bold text-green-600">
                              ₵{room.regularPrice}
                            </span>
                          )}
                          <p className="text-sm text-gray-500">per night</p>
                        </div>
                        {room.offer && (
                          <div className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-bold">
                            {Math.round(
                              ((room.regularPrice - room.discountedPrice) /
                                room.regularPrice) *
                                100
                            )}
                            % OFF
                          </div>
                        )}
                      </div>

                      {/* Book Button */}
                      <button
                        onClick={() => handleBookRoom(room)}
                        className="w-full bg-green-600 text-white hover:bg-green-700 py-3 rounded-lg font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        Book Now
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-6">
            Need Help Choosing?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Our friendly staff is here to help you find the perfect room for
            your stay.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/233598937110"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-green-700 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <WhatsAppIcon />
              Chat on WhatsApp
            </a>
            <a
              href="tel:+233500080512"
              className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-green-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Phone size={18} />
              Call Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Rooms;
