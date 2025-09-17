import React from 'react';
import { Phone, Mail, MapPin, Clock, Wifi, Car, Coffee, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const quickLinks = [
    { label: 'Explore', value: 'explore' },
    { label: 'Rooms', value: 'rooms' },
    { label: 'Bookings', value: 'bookings' },
    { label: 'Contact', value: 'contact' }
  ];

  const amenities = [
    { icon: Wifi, label: 'Fast Internet' },
    { icon: Car, label: 'Parking' },
    { icon: Coffee, label: '24/7 Service' },
    { icon: Shield, label: 'Security' }
  ];
  const navigate = useNavigate();

  return (
    <footer className="bg-green-800 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <div className="text-yellow-400 font-bold text-3xl">101</div>
              <div className="ml-2">
                <div className="text-white font-bold text-lg">GUEST HOUSE</div>
                <div className="text-yellow-400 text-sm">COMFORTABILITY WITH CLASS</div>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Experience luxury and comfort at 101 Guest House. Located conveniently 50 meters from Obolo Spot 
              off the Koforidua High Way, we offer premium accommodation with world-class amenities.
            </p>
            
            {/* Amenities */}
            <div className="grid grid-cols-2 gap-3">
              {amenities.map((amenity, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <amenity.icon size={16} className="text-yellow-400" />
                  <span className="text-sm text-gray-300">{amenity.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-yellow-400 font-bold text-lg mb-4">Quick Links</h3>
            <nav className="space-y-3">
              {quickLinks.map((link) => (
                <button
                  key={link.value}
                  onClick={() => navigate("/"+link.value)}
                  className="block text-gray-300 hover:text-yellow-400 transition-colors duration-200"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-yellow-400 font-bold text-lg mb-4">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-yellow-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Akyem Kukurantumi<br />
                    50 Meters from Obolo Spot<br />
                    Off the Koforidua High Way
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-yellow-400" />
                <div className="text-sm">
                  <a href="tel:+233598937110" className="text-gray-300 hover:text-yellow-400 transition-colors block">
                    +233 598 937 110
                  </a>
                  <a href="tel:+233500080512" className="text-gray-300 hover:text-yellow-400 transition-colors block">
                    +233 500 080 512
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-yellow-400" />
                <a 
                  href="mailto:maryonezeroone@gmail.com" 
                  className="text-gray-300 hover:text-yellow-400 transition-colors text-sm"
                >
                 info@101guesthouse.com
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Clock size={18} className="text-yellow-400" />
                <span className="text-gray-300 text-sm">24/7 Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-green-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2025 101 Guest House. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <button 
                onClick={() => onNavigate('privacy')}
                className="text-gray-400 hover:text-yellow-400 transition-colors"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => onNavigate('terms')}
                className="text-gray-400 hover:text-yellow-400 transition-colors"
              >
                Terms of Service
              </button>
               <button 
                onClick={() => navigate('/admin')}
                className="text-gray-400 hover:text-yellow-400 transition-colors"
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;