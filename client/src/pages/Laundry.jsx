import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shirt, 
  Clock, 
  Star, 
  Phone, 
  MapPin, 
  CheckCircle, 
  Calendar,
  User,
  Mail,
  MessageSquare,
  Package,
  Droplets,
  Shield,
  Sparkles,
  Wind,
  ChevronLeft,
  ChevronRight,
  Send,
  TrendingUp,
  Award,
  Users
} from 'lucide-react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

// Custom Image Slider Component
const ImageSlider = ({ images, autoSlide = true, interval = 4000 }) => {
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
    <div className="relative w-full h-full overflow-hidden">
      {/* Images */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 hidden sm:block transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all duration-300 z-10"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 hidden sm:block transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all duration-300 z-10"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-yellow-400' 
                : 'bg-white bg-opacity-50 hover:bg-opacity-70'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const LaundryPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    serviceType: '',
    pickupDate: '',
    pickupTime: '',
    deliveryPreference: '',
    specialInstructions: '',
    estimatedWeight: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Laundry service images
  const laundryImages = [
    {
      src: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      alt: 'Professional laundry washing machines'
    },
    {
      src: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      alt: 'Fresh clean folded clothes'
    },

    {
      src: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2350&q=80',
      alt: 'Quality fabric care and cleaning'
    }
  ];

  const services = [
    {
      icon: Shirt,
      title: 'Wash & Fold',
      description: 'Professional washing, drying, and folding service',
      price: '₵15/kg',
      features: ['Premium detergents', 'Fabric softener', 'Fresh scent', '24-48 hour turnaround']
    },
    {
      icon: Sparkles,
      title: 'Wash & Iron',
      description: 'Complete service with professional pressing',
      price: '₵20/kg',
      features: ['Expert pressing', 'Starch options', 'Hanger service', 'Wrinkle-free guarantee']
    },
    {
      icon: Shield,
      title: 'Dry Cleaning',
      description: 'Specialized care for delicate garments',
      price: '₵25/item',
      features: ['Delicate fabrics', 'Stain removal', 'Professional care', 'Quality guarantee']
    },
    {
      icon: Wind,
      title: 'Express Service',
      description: 'Same-day service for urgent needs',
      price: '₵30/kg',
      features: ['4-6 hour service', 'Priority handling', 'Emergency care', 'Premium quality']
    }
  ];

  const features = [
    {
      icon: Clock,
      title: 'Quick Turnaround',
      description: 'Most orders completed within 24-48 hours'
    },
    {
      icon: Shield,
      title: 'Care Guarantee',
      description: 'We guarantee the safety and quality of your garments'
    },
    {
      icon: Droplets,
      title: 'Premium Products',
      description: 'High-quality detergents and fabric care products'
    },
    {
      icon: Package,
      title: 'Free Pickup & Delivery',
      description: 'Convenient pickup and delivery within 10km radius'
    },
    {
      icon: Users,
      title: 'Experienced Staff',
      description: 'Trained professionals with years of experience'
    },
    {
      icon: Award,
      title: 'Quality Assurance',
      description: 'Every item inspected before delivery'
    }
  ];

  const testimonials = [
    {
      name: 'Kwame Asante',
      rating: 5,
      comment: 'Excellent service! My clothes came back cleaner than I expected. The pickup and delivery was very convenient.',
      location: 'Kukurantumi'
    },
    {
      name: 'Akosua Mensah',
      rating: 5,
      comment: 'Professional and reliable. They handled my delicate dresses with great care. Highly recommended!',
      location: 'Koforidua'
    },
    {
      name: 'David Osei',
      rating: 5,
      comment: 'Been using their service for months now. Always consistent quality and on-time delivery. Great value!',
      location: 'Suhum'
    },
    {
      name: 'Grace Boateng',
      rating: 5,
      comment: 'The express service saved my day! Got my formal wear ready for an important meeting in just 4 hours.',
      location: 'Tafo'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call - replace with your actual API endpoint
      const response = await fetch('/api/laundry-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          phone: '',
          email: '',
          address: '',
          serviceType: '',
          pickupDate: '',
          pickupTime: '',
          deliveryPreference: '',
          specialInstructions: '',
          estimatedWeight: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Image Slider */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center">
        {/* Background Image Slider */}
        <div className="absolute inset-0">
          <ImageSlider images={laundryImages} autoSlide={true} interval={4000} />
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gray-900/70">
          {/* Hero Content */}
          <div className="relative z-10 mt-15 text-center text-white px-4 max-w-4xl mx-auto">
            <div className="mb-6">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-yellow-400 p-4 rounded-full">
                  <Shirt className="text-green-800" size={48} />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
                Premium <span className="text-yellow-400">Laundry</span> Services
              </h1>
              <p className="text-xl md:text-2xl text-yellow-400 font-medium mb-4">
                Professional Care for Your Garments
              </p>
              <p className="text-lg text-gray-200">
                Open to everyone
              </p>
            </div>

            <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Experience professional laundry services with pickup and delivery. Quality care for all your garments 
              with eco-friendly products and expert handling.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => document.getElementById('booking-form').scrollIntoView({ behavior: 'smooth' })}
                className="bg-yellow-400 text-green-800 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                Book Service Now
                <Calendar size={20} />
              </button>
              <button
                onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-yellow-400 text-yellow-400 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 hover:text-green-800 transition-all duration-300"
              >
                View Services
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              Our Laundry Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional care for all your garments with transparent pricing
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-lg p-6 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 border border-gray-100">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <service.icon className="text-green-600" size={32} />
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-2 text-center">{service.title}</h3>
                <p className="text-gray-600 text-sm text-center mb-4">{service.description}</p>
                <div className="text-center mb-4">
                  <span className="text-2xl font-bold text-yellow-600">{service.price}</span>
                </div>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="text-green-600" size={14} />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              Why Choose Our Laundry Service?
            </h2>
            <p className="text-xl text-gray-600">
              Professional care with convenience and quality guarantee
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg hover:bg-gray-50 transition-all duration-300">
                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="text-yellow-600" size={32} />
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section id="booking-form" className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
                Book Your Laundry Service
              </h2>
              <p className="text-xl text-gray-600">
                Fill out the form below and we'll contact you to arrange pickup
              </p>
            </div>

            {submitStatus && (
              <div className={`mb-6 p-4 rounded-lg ${
                submitStatus === 'success' 
                  ? 'bg-green-100 border border-green-400 text-green-700' 
                  : 'bg-red-100 border border-red-400 text-red-700'
              }`}>
                <div className="flex items-center gap-2">
                  {submitStatus === 'success' ? (
                    <CheckCircle size={20} />
                  ) : (
                    <MessageSquare size={20} />
                  )}
                  <span>
                    {submitStatus === 'success' 
                      ? 'Booking submitted successfully! We\'ll contact you soon.' 
                      : 'There was an error submitting your booking. Please try again.'}
                  </span>
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl shadow-lg p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 text-gray-400" size={20} />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-2">
                      Service Type *
                    </label>
                    <select
                      id="serviceType"
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select a service</option>
                      <option value="wash-fold">Wash & Fold - ₵15/kg</option>
                      <option value="wash-iron">Wash & Iron - ₵20/kg</option>
                      <option value="dry-cleaning">Dry Cleaning - ₵25/item</option>
                      <option value="express">Express Service - ₵30/kg</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                    Pickup Address *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter your full address with landmarks"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="pickupDate" className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Pickup Date *
                    </label>
                    <input
                      type="date"
                      id="pickupDate"
                      name="pickupDate"
                      value={formData.pickupDate}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="pickupTime" className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Time
                    </label>
                    <select
                      id="pickupTime"
                      name="pickupTime"
                      value={formData.pickupTime}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Any time</option>
                      <option value="morning">Morning (8am-12pm)</option>
                      <option value="afternoon">Afternoon (12pm-4pm)</option>
                      <option value="evening">Evening (4pm-8pm)</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="estimatedWeight" className="block text-sm font-medium text-gray-700 mb-2">
                      Estimated Weight
                    </label>
                    <select
                      id="estimatedWeight"
                      name="estimatedWeight"
                      value={formData.estimatedWeight}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Select weight</option>
                      <option value="1-3kg">1-3 kg</option>
                      <option value="4-7kg">4-7 kg</option>
                      <option value="8-15kg">8-15 kg</option>
                      <option value="15kg+">More than 15 kg</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="deliveryPreference" className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Preference
                  </label>
                  <select
                    id="deliveryPreference"
                    name="deliveryPreference"
                    value={formData.deliveryPreference}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Standard delivery (Same pickup address)</option>
                    <option value="same-address">Same address as pickup</option>
                    <option value="different-address">Different delivery address</option>
                    <option value="pickup-at-store">I'll pickup at laundry facility</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="specialInstructions" className="block text-sm font-medium text-gray-700 mb-2">
                    Special Instructions
                  </label>
                  <textarea
                    id="specialInstructions"
                    name="specialInstructions"
                    value={formData.specialInstructions}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Any special care instructions, stain details, or other notes..."
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Book Service'}
                    <Send size={20} />
                  </button>
                  <div className="flex gap-2">
                    <a
                      href="tel:+233598937110"
                      className="bg-yellow-400 text-green-800 px-6 py-4 rounded-lg font-bold hover:bg-yellow-300 transition-all duration-300 flex items-center gap-2"
                    >
                      <Phone size={18} />
                      Call
                    </a>
                    <a
                      href="https://wa.me/233598937110"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-500 text-white px-6 py-4 rounded-lg font-bold hover:bg-green-600 transition-all duration-300 flex items-center gap-2"
                    >
                      <WhatsAppIcon fontSize="small" />
                      WhatsApp
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Real reviews from satisfied customers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current" size={18} />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 text-sm italic">"{testimonial.comment}"</p>
                <div>
                  <p className="font-bold text-green-800">{testimonial.name}</p>
                  <p className="text-gray-500 text-xs">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Operating Hours & Service Area Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
                Service Information
              </h2>
              <p className="text-xl text-gray-600">
                Everything you need to know about our laundry service
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="text-green-600" size={32} />
                  <h3 className="text-2xl font-bold text-green-800">Operating Hours</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Monday - Friday:</span>
                    <span className="font-medium text-green-600">7:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Saturday:</span>
                    <span className="font-medium text-green-600">7:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Sunday:</span>
                    <span className="font-medium text-green-600">9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="pt-3 border-t">
                    <p className="text-sm text-gray-600">
                      <strong>Emergency Service:</strong> Available 24/7 for hotel guests
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <TrendingUp className="text-green-600" size={32} />
                  <h3 className="text-2xl font-bold text-green-800">Service Coverage</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-green-600 mt-1" size={20} />
                    <div>
                      <p className="font-medium text-gray-800">Free Pickup & Delivery</p>
                      <p className="text-sm text-gray-600">Within 10km radius of our facility</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-green-600 mt-1" size={20} />
                    <div>
                      <p className="font-medium text-gray-800">Extended Coverage</p>
                      <p className="text-sm text-gray-600">Delivery available up to 20km (additional charges apply)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-green-600 mt-1" size={20} />
                    <div>
                      <p className="font-medium text-gray-800">Same-Day Service</p>
                      <p className="text-sm text-gray-600">Available for orders placed before 10:00 AM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience Professional Laundry Care?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join hundreds of satisfied customers who trust us with their laundry needs. 
            Book today and enjoy convenient pickup and delivery service.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">500+</div>
              <div className="text-green-200">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">24-48h</div>
              <div className="text-green-200">Turnaround Time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">99%</div>
              <div className="text-green-200">Satisfaction Rate</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => document.getElementById('booking-form').scrollIntoView({ behavior: 'smooth' })}
              className="bg-yellow-400 text-green-800 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              Book Your Service
              <Calendar size={20} />
            </button>
            <button 
              onClick={() => navigate('/contact')}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-green-800 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Contact Us
              <MessageSquare size={20} />
            </button>
            <a
              href="https://wa.me/233598937110?text=Hi%20I%27m%20interested%20in%20your%20laundry%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-400 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <WhatsAppIcon />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LaundryPage;