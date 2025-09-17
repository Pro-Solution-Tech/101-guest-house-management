import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {  
  Clock, 
  Users, 
  Star, 
  Coffee,
  Wifi,
  Car,
  Shield,
  Utensils,
  Wine,
  Music,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause
} from 'lucide-react';

// Enhanced Image Gallery Component
const ImageGallery = ({ images, title, description }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, images.length]);

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
    <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-xl group">
      {/* Main Image Display */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        ))}
      </div>

      {/* Image Info Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm opacity-90">{description}</p>
      </div>

      {/* Navigation Controls */}
      <div 
        className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <button
          onClick={goToPrevious}
          className="bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-all duration-300 transform hover:scale-110"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button
          onClick={goToNext}
          className="bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-all duration-300 transform hover:scale-110"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Playback Controls */}
      <div className="absolute top-4 right-4 flex gap-2">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all duration-300 ${
            showControls || !isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-yellow-400 w-8' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Image Counter */}
      <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, description, gradient, delay = 0 }) => (
  <div 
    className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:transform hover:scale-105 group cursor-pointer`}
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className={`w-16 h-16 rounded-full ${gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
      <Icon className="text-white" size={32} />
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
      {title}
    </h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

// Testimonial Card Component
const TestimonialCard = ({ name, rating, comment, avatar, location, delay = 0 }) => (
  <div 
    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:transform hover:scale-105"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex items-center mb-4">
      <img 
        src={avatar} 
        alt={name}
        className="w-12 h-12 rounded-full object-cover mr-4"
      />
      <div>
        <h4 className="font-bold text-gray-800">{name}</h4>
        <p className="text-sm text-gray-600">{location}</p>
      </div>
    </div>
    <div className="flex items-center mb-3">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className="text-yellow-400 fill-current" size={16} />
      ))}
    </div>
    <p className="text-gray-700 italic">"{comment}"</p>
  </div>
);

const Explore = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('reception');
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isVisible, setIsVisible] = useState({});
  
    useEffect(() => {
    // This runs when the component mounts
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    // Calculate the approximate position of your section navigation bar
    // Adjust this value based on your layout (in pixels)
    const sectionNavPosition = 600; // Example value - adjust as needed
    if (!isInitialLoad){
       window.scrollTo({
      top: sectionNavPosition,
      behavior: 'instant' // Immediate jump without animation
    });
    }
   
  }, [activeSection]);


  // Reception area images
  const receptionImages = [
    {
      src: 'https://res.cloudinary.com/dcmcrc4v3/image/upload/v1754485686/xuo3isagdidlrkam2b6h.jpg',
      alt: 'Modern reception desk with professional staff'
    },
    {
      src: 'https://res.cloudinary.com/dcmcrc4v3/image/upload/v1754486350/ixjiz708dsajejt18jpo.jpg',
      alt: 'Comfortable reception lobby with seating area'
    },
    {
      src: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      alt: 'Reception area with modern amenities'
    },
    {
      src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      alt: 'Professional reception service'
    }
  ];
  // Bar area images
  const barImages = [
    {
      src: 'https://res.cloudinary.com/dcmcrc4v3/image/upload/v1754485344/uxms4si9osveqen0zgti.jpg',
      alt: 'Modern bar with premium beverages'
    },
    {
      src: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80',
      alt: 'Bar atmosphere during evening hours'
    }
  ];

  // Environment images
  const environmentImages = [
    {
      src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      alt: 'Beautiful exterior grounds and landscaping'
    },
    {
      src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      alt: 'Peaceful garden areas for relaxation'
    },
    {
      src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      alt: 'Outdoor seating and entertainment areas'
    },
    {
      src: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      alt: 'Swimming pool and recreational facilities'
    },
    {
      src: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      alt: 'Evening ambiance around the property'
    }
  ];

  const facilities = [
    {
      icon: Shield,
      title: '24/7 Security',
      description: 'Professional security personnel and CCTV ensuring your safety around the clock.',
      gradient: 'bg-gradient-to-br from-blue-500 to-blue-600'
    },
    {
      icon: Wifi,
      title: 'High-Speed Internet',
      description: 'Complimentary Wi-Fi throughout the property for seamless connectivity.',
      gradient: 'bg-gradient-to-br from-purple-500 to-purple-600'
    },
    {
      icon: Car,
      title: 'Secure Parking',
      description: 'Ample parking space with 24/7 security monitoring for your vehicle.',
      gradient: 'bg-gradient-to-br from-green-500 to-green-600'
    },
    {
      icon: Coffee,
      title: 'Room Service',
      description: 'Round-the-clock room service to cater to all your needs.',
      gradient: 'bg-gradient-to-br from-orange-500 to-orange-600'
    },
    {
      icon: Wine,
      title: 'Premium Bar',
      description: 'Fully stocked bar with premium beverages and cocktails.',
      gradient: 'bg-gradient-to-br from-red-500 to-red-600'
    },
    {
      icon: Utensils,
      title: 'Restaurant',
      description: 'Exquisite dining experience with local and international cuisine.',
      gradient: 'bg-gradient-to-br from-yellow-500 to-yellow-600'
    }
  ];

  const experienceHighlights = [
    {
      icon: Sun,
      title: 'Day Experience',
      description: 'Start your day with our complimentary breakfast and enjoy the serene morning atmosphere.',
      time: '6:00 AM - 6:00 PM',
      features: ['Breakfast Service', 'Pool Access', 'Business Center', 'Concierge']
    },
    {
      icon: Moon,
      title: 'Evening Experience',
      description: 'Unwind with our evening services, bar, and peaceful night ambiance.',
      time: '6:00 PM - 6:00 AM',
      features: ['Bar Service', 'Room Service', 'Security', 'Night Reception']
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      rating: 5,
      comment: 'The reception staff was incredibly welcoming and professional. The bar area has a great ambiance for evening relaxation.',
      avatar: 'https://res.cloudinary.com/dcmcrc4v3/image/upload/v1754483996/ront5mns3tzscrcnuolu.jpg',
      location: 'Business Traveler, Accra'
    },
    {
      name: 'Michael Asante',
      rating: 5,
      comment: 'Beautiful environment and well-maintained facilities. The outdoor areas are perfect for relaxation.',
      avatar: 'https://res.cloudinary.com/dcmcrc4v3/image/upload/v1754484024/enzy0ef87miexgowv8o9.jpg',
      location: 'Local Resident, Tema'
    },
    {
      name: 'Grace Osei',
      rating: 5,
      comment: 'Exceptional service from check-in to check-out. The bar serves excellent drinks and the environment is so peaceful.',
      avatar: 'https://res.cloudinary.com/dcmcrc4v3/image/upload/v1754484081/eqrd8siuyqijikm6tzwd.jpg',
      location: 'Weekend Visitor, Kumasi'
    }
  ];

  const sections = [
    { id: 'reception', title: 'Reception', icon: '🏨' },
    { id: 'bar', title: 'Bar & Lounge', icon: '🍷' },
    { id: 'environment', title: 'Environment', icon: '🌿' }
  ];

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Video/Image */}
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
              alt="101 Guest House Overview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gray-900/60"></div>
          </div>
        </div>

        {/* Floating particles effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fade-in">
              <span className="text-yellow-400">Explore</span> Our World
            </h1>
            <p className="text-xl md:text-2xl mb-6 text-green-100">
              Discover the perfect blend of comfort, luxury, and hospitality
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
              <span className="bg-green-700/50 px-4 py-2 rounded-full backdrop-blur-sm">
                🏨 Premium Reception
              </span>
              <span className="bg-green-700/50 px-4 py-2 rounded-full backdrop-blur-sm">
                🍷 Modern Bar
              </span>
              <span className="bg-green-700/50 px-4 py-2 rounded-full backdrop-blur-sm">
                🌿 Beautiful Environment
              </span>
            </div>
          </div>     
        </div>
      </section>

      {/* Section Navigations */}
      <section className="py-4 bg-white sticky top-20 z-30 shadow-md ">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
                  activeSection === section.id
                    ? 'bg-green-600 text-white shadow-lg transform scale-105'
                    : 'bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-600'
                }`}
              >
                <span className="text-lg">{section.icon}</span>
                {section.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Reception section */}
      {activeSection === 'reception' && (
        <section className="py-16 bg-white" id="reception" data-animate>
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">
                🏨 Reception & Front Desk
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our professional reception team ensures a warm welcome and seamless check-in experience 24/7
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="order-1 lg:order-1">
                <ImageGallery 
                  images={receptionImages}
                  title="Professional Reception Services"
                  description="Modern reception area with professional staff ready to assist you"
                />
              </div>
              <div className="order-2 lg:order-2">
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-green-800 mb-6">Reception Services</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                        <Clock className="text-white" size={24} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">24/7 Front Desk</h4>
                        <p className="text-gray-600">Round-the-clock assistance for all your needs</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                        <Users className="text-white" size={24} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Concierge Services</h4>
                        <p className="text-gray-600">Local recommendations and booking assistance</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                        <Shield className="text-white" size={24} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Secure Check-in</h4>
                        <p className="text-gray-600">Safe and efficient registration process</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Bar  Section */}
      {activeSection === 'bar' && (
        <section className="py-16 bg-gray-900 text-white" id="bar" data-animate>
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                🍷 <span className="text-yellow-400">Bar & Lounge</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Unwind in our sophisticated bar with premium beverages and a relaxing atmosphere
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <ImageGallery 
                  images={barImages}
                  title="Premium Bar Experience"
                  description="Sophisticated bar area with premium beverages and ambient lighting"
                />
              </div>
              <div>
                <div className="bg-gradient-to-br from-yellow-900/30 to-yellow-800/30 rounded-2xl p-8 backdrop-blur-sm">
                  <h3 className="text-2xl font-bold text-yellow-400 mb-6">Bar Features</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                        <Wine className="text-white" size={24} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">Premium Beverages</h4>
                        <p className="text-gray-300">Extensive selection of wines, spirits, and cocktails</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                        <Music className="text-white" size={24} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">Live Entertainment</h4>
                        <p className="text-gray-300">Ambient music and occasional live performances</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                        <Utensils className="text-white" size={24} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">Bar Snacks</h4>
                        <p className="text-gray-300">Light meals and appetizers available</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                    <h4 className="font-semibold text-yellow-400 mb-2">Bar Hours</h4>
                    <p className="text-gray-300">Monday - Sunday: 5:00 PM - 2:00 AM</p>
                    <p className="text-gray-300">Happy Hour: 5:00 PM - 7:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Environment Section */}
      {activeSection === 'environment' && (
        <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50" id="environment" data-animate>
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">
                🌿 Beautiful Environment
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Immerse yourself in our carefully maintained grounds and peaceful surroundings
              </p>
            </div>

            <div className="mb-12">
              <ImageGallery 
                images={environmentImages}
                title="Serene Environment"
                description="Beautiful landscaping and peaceful outdoor spaces for relaxation"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {experienceHighlights.map((highlight, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                      <highlight.icon className="text-white" size={32} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-green-800">{highlight.title}</h3>
                      <p className="text-green-600 font-semibold">{highlight.time}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6">{highlight.description}</p>
                  <div className="grid grid-cols-2 gap-4">
                    {highlight.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Facilities overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              Complete Facilities
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need for a perfect stay
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility, index) => (
              <FeatureCard 
                key={index}
                icon={facility.icon}
                title={facility.title}
                description={facility.description}
                gradient={facility.gradient}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Guest Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              Guest Experiences
            </h2>
            <p className="text-xl text-gray-600">
              What our guests say about their stay
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={index}
                name={testimonial.name}
                rating={testimonial.rating}
                comment={testimonial.comment}
                avatar={testimonial.avatar}
                location={testimonial.location}
                delay={index * 150}
              />
            ))}
          </div>
        </div>
      </section>
     
    </div>
  );
};

export default Explore;

  