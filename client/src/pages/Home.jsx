import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { 
  Wifi, 
  Car, 
  Coffee, 
  Shield, 
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
  Pill,
  Zap,
  Shirt
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

const Home = ({ onNavigate = () => {} }) => {
  const facilities = [
    { icon: Wifi, title: 'High-Speed Internet', description: 'Stay connected with complimentary internet access' },
    { icon: Car, title: 'Free Parking', description: 'Secure parking space for all guests' },
    { icon: Coffee, title: '24/7 Room Service', description: 'Round-the-clock service for your convenience' },
    { icon: Shield, title: 'Security', description: 'Professional security personnel on-site and 24/7 all round CCTV' },
    { icon: Tv, title: 'Smart TV & DSTV', description: 'Premium entertainment in premium rooms' },
    { icon: Bath, title: 'Private Bathroom', description: 'Modern ensuite bathrooms with hot water' },
    { icon: Wind, title: 'Air Conditioning', description: 'Climate-controlled comfort' },
    { icon: Utensils, title: 'Breakfast',description: 'Basic cooking facilities available' },
    { 
  icon: Pill, 
  title: 'Medicine Over the Counter', 
  description: 'Basic over-the-counter medicines available for your comfort and peace of mind.' 
},
{ 
  icon: Zap, 
  title: '24/7 Power Plant', 
  description: 'Enjoy uninterrupted electricity throughout your stay.' 
},
{ 
  icon: Shirt, 
  title: 'Laundry Service', 
  description: 'Convenient laundry service to keep your clothes fresh and clean during your stay.' 
}


  ];
  const navigate = useNavigate();

  const features = [
    'Modern and stylish interior design',
    'Prime location near major highways',
    'Comfortable bedding with premium linens',
    'Professional housekeeping service',
    'Quiet and peaceful environment',
    'Easy access to local attractions'
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      rating: 5,
      comment: 'Exceptional service and beautiful rooms. The location is perfect for business travelers.'
    },
    {
      name: 'Michael Asante',
      rating: 5,
      comment: 'Clean, comfortable, and affordable. The staff went above and beyond to make our stay memorable.'
    },
    {
      name: 'Grace Osei',
      rating: 5,
      comment: 'Highly recommend! Great value for money and excellent amenities.'
    }
  ];

  const roomTypes = [
    {
      title: 'Studio Room',
      icon: Bed,
      features: ['Half Bed', 'Private Bathroom', 'AC & Fridge','TV'],
      price: '₵200/night'
    },
     {
      title: 'Double Bed Room',
      icon: Users,
      features: ['Double Size Bed', 'Private Bathroom', 'AC & Fridge','Water Heater','TV'],
      price: 'From ₵250 to ₵350/night'
    },
     {
      title: 'Queen Room',
      icon: Users,
      features: ['Queen Size Bed','Private Bathroom', 'AC & Fridge','Water Heater','TV & DSTV' ],
      price: 'From ₵300 to ₵400/night'
    },
    {
      title: 'Deluxe Room',
      icon: Users,
      features: ['Queen Size Bed','Private Bathroom', 'AC & Fridge','Water Heater','TV & DSTV','Sofa'],
      price: '₵400/night'
    },
    {
      title: 'Executive Room',
      icon: Users,
      features: ['Queen Size Bed','Private Bathroom', 'AC & Fridge','Water Heater','TV & DSTV','Sofa' ],
      price: '₵500/night'
    }
  ];

  // Automatic slider images - high-quality guest house photos -updated
  const sliderImages = [
    {
      src: 'https://res.cloudinary.com/dcmcrc4v3/image/upload/v1754481989/vhttd8mhhvxfg9ytjln8.jpg',
      alt: 'Luxury guest house exterior with modern architecture'
    },
    {
      src: 'https://res.cloudinary.com/dcmcrc4v3/image/upload/v1754483476/nz1eve4lez17nwev3xjj.jpg',
      alt: 'Elegant hotel room with premium furnishing'
    },
    {
      src: 'https://res.cloudinary.com/dcmcrc4v3/image/upload/v1754485344/uxms4si9osveqen0zgti.jpg',
      alt: 'Beautiful swimming pool and relaxation area'
    },
    {
      src: 'https://res.cloudinary.com/dcmcrc4v3/image/upload/v1754481949/cv6x129aew7dqwbahqnl.jpg',
      alt: 'Modern bathroom with luxury amenities'
    },
    {
      src: 'https://res.cloudinary.com/dcmcrc4v3/image/upload/v1754485245/nlievo3viieqhzvndwex.jpg',
      alt: 'Hotel dining area and restaurant'
    },
    {
      src: 'https://res.cloudinary.com/dcmcrc4v3/image/upload/v1754483514/udvvkrbmp53kqvmvza8s.jpg',
      alt: 'Executive suite with premium accommodations'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Custom Image Slider */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center">
        {/* Background Image Slider */}
        <div className="absolute inset-0">
          <ImageSlider images={sliderImages} autoSlide={true} interval={4000} />
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gray-900/60">

        {/* Hero Content */}
        <div className="relative z-10 mt-15 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-yellow-400 mb-2">
              101
            </h1>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
              GUEST HOUSE
            </h2>
            <p className="text-xl md:text-2xl text-yellow-400 font-medium">
              COMFORTABILITY WITH CLASS
            </p>
          </div>

          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            Experience luxury accommodation with world-class amenities in the heart of Ghana's hospitality scene.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/rooms')}
              className="bg-yellow-400 text-green-800 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              Book Your Stay
              <ArrowRight size={20} />
            </button>
            <button
              onClick={() => navigate('/explore')}
              className="border-2 border-yellow-400 text-yellow-400 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 hover:text-green-800 transition-all duration-300"
            >
              Explore
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="border-2 border-yellow-400 text-yellow-400 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 hover:text-green-800 transition-all duration-300"
            >
              Contact Us
            </button>
          </div>
        </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-6">
                Prime Location
              </h2>
              <div className="flex items-start gap-3 mb-6">
                <MapPin className="text-yellow-500 mt-1" size={24} />
                <div>
                  <p className="text-lg text-gray-700 mb-2">
                    <strong>50 Meters from Obolo Spot</strong>
                  </p>
                  <p className="text-gray-600">
                    Off the Koforidua High Way
                  </p>
                  <p className='text-gray-800 font-meduim'> Akyem Kukurantumi</p>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                Strategically located for easy access to major business districts, shopping centers, and tourist attractions. 
                Our prime location ensures you're never far from where you need to be.
              </p>
              <div className="flex items-center gap-4">
                
                <div>
                  <p className="font-medium gap-2 text-gray-800">Call or whatsApp us for directions:</p>
                  <div className='flex gap-2 hover:underline my-2' onClick={() => window.location.href = 'tel:+233598937110'}>
                  <WhatsAppIcon className="text-green-600" size={20} />
                  <p className="text-green-600 font-bold">+233 598 937 110</p></div>
                  <div className='flex gap-2 hover:underline' onClick={() => window.location.href = 'tel:+233500080512'}>
                  <Phone className="text-green-600" size={20} />
                  <p className="text-green-600 font-bold">+233 500 080 512</p></div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-green-100 rounded-lg p-8 text-center">
  <div className="text-6xl">📍</div>
  <h3 className="text-xl font-bold text-green-800 mb-4">Easy to Find!. Tap on the map to find us</h3>
  {/* Responsive Google Maps iframe */}
  <div className="relative overflow-hidden pb-[56.25%] rounded-lg shadow-md"> {/* 16:9 aspect ratio container */}
    <iframe 
      src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3966.485851141675!2d-0.3650445250098053!3d6.199451893788258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNsKwMTEnNTguMCJOIDDCsDIxJzQ0LjkiVw!5e0!3m2!1sen!2sgh!4v1750457129150!5m2!1sen!2sgh" 
      className="absolute top-0 left-0 w-full h-full border-0"
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="101 Guest House Location"
    ></iframe>
  </div>
</div>
            </div>
          </div>
        </div>
      </section>

      {/* Room Types Preview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              Our Room Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our carefully designed accommodations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {roomTypes.map((room, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <room.icon className="text-green-600" size={32} />
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-4 text-center">{room.title}</h3>
                <ul className="space-y-2 mb-6">
                  {room.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className="text-green-600" size={16} />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="text-center">
                  <p className="text-green-600 font-bold text-lg mb-4">{room.price}</p>
                  <button 
                    onClick={() => navigate('/rooms')}
                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <button 
              onClick={() => navigate('/rooms')}
              className="bg-yellow-400 text-green-800 px-8 py-3 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-all duration-300 flex items-center gap-2 mx-auto"
            >
              View All Rooms
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              World-Class Facilities
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Every amenity you need for a comfortable and memorable stay
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {facilities.map((facility, index) => (
              <div key={index} className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <facility.icon className="text-green-600" size={32} />
                </div>
                <h3 className="text-lg font-bold text-green-800 mb-2">{facility.title}</h3>
                <p className="text-gray-600 text-sm">{facility.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-6">
                Why Choose 101 Guest House?
              </h2>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="text-green-600 mt-1 flex-shrink-0" size={20} />
                    <p className="text-gray-700">{feature}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <button 
                  onClick={() => navigate('/rooms')}
                  className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors duration-300 flex items-center gap-2"
                >
                  Book Now
                  <Calendar size={18} />
                </button>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-4">🏆</div>
                  <h3 className="text-2xl font-bold text-green-800">Premium Quality</h3>
                </div>
                <p className="text-gray-600 text-center leading-relaxed">
                  We pride ourselves on delivering exceptional hospitality services that exceed our guests' expectations. 
                  From the moment you arrive until your departure, every detail is carefully crafted for your comfort.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              What Our Guests Say
            </h2>
            <p className="text-xl text-gray-600">
              Don't just take our word for it
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current" size={20} />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.comment}"</p>
                <p className="font-bold text-green-800">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience Comfort with Class?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Book your stay today and discover why 101 Guest House is the preferred choice for discerning travelers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/rooms')}
              className="bg-yellow-400 text-green-800 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105"
            >
              Make a Reservation
            </button>
            <button 
              onClick={() => navigate('/contact')}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-green-800 transition-all duration-300"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;