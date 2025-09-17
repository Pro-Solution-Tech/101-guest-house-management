import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import {Link,useNavigate} from 'react-router-dom';

const Header = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  
  const navigationItems = [
    { label: 'Home', value: 'Home', icon: '🏠' },
    { label: 'Explore', value: 'explore', icon: '✨' },
    { label: 'Rooms', value: 'rooms', icon: '🛏️' },
    // { label: 'Laundry', value: 'laundry', icon: '👕' },
    { label: 'Contact', value: 'contact', icon: '📞' },
    
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (page) => {
    navigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Main Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-green-800/95 backdrop-blur-lg shadow-2xl border-b border-green-600/30' 
            : 'bg-gradient-to-r from-green-700 via-green-600 to-green-700 shadow-lg'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            
            {/* Enhanced Logo */}
            <div
              className="flex items-center cursor-pointer group transition-all duration-300 hover:scale-105 p-3 rounded-xl hover:bg-white/10"
              onClick={() => handleNavigation('/')}
            >
              <div className="relative">
                <div className="text-yellow-400 font-black text-4xl md:text-5xl leading-none transform group-hover:scale-110 transition-transform duration-300">
                  101
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
              <div className="ml-3">

                <div className="text-white font-bold text-lg md:text-xl leading-tight group-hover:text-yellow-100 transition-colors">
                  GUEST HOUSE
                </div>
                <div className="text-yellow-400 text-xs md:text-sm leading-tight font-medium">
                  COMFORTABILITY WITH CLASS
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-2">
              {navigationItems.map((item, index) => (
                <div key={item.value} className="relative group">
                  <button
                    onClick={() => handleNavigation(item.value)}
                    className={`
                      relative px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 overflow-hidden
                      ${currentPage === item.value
                        ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-green-800 shadow-lg shadow-yellow-400/30 transform scale-105'
                        : 'text-white hover:text-yellow-400 hover:bg-white/10 hover:scale-105'
                      }
                    `}
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    {/* Background animation */}
                    <div className={`
                      absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                      transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700
                      ${currentPage === item.value ? 'opacity-0' : 'opacity-100'}
                    `}></div>
                    
                    {/* Active indicator */}
                    {currentPage === item.value && (
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 animate-pulse opacity-20 rounded-full"></div>
                    )}
                    
                    {/* Content */}
                    <span className="relative z-10 flex items-center gap-2">
                      <span className="text-base">{item.icon}</span>
                      {item.label}
                    </span>
                    
                    {/* Active dot indicator */}
                    {currentPage === item.value && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green-800 rounded-full"></div>
                    )}
                    
                    {/* Hover underline */}
                    <div className={`
                      absolute bottom-0 left-0 h-0.5 bg-yellow-400 transition-all duration-300
                      ${currentPage === item.value ? 'w-full' : 'w-0 group-hover:w-full'}
                    `}></div>
                  </button>
                </div>
              ))}
            </nav>

            {/* Enhanced Mobile Menu Button */}
            <button
              className="md:hidden relative p-3 rounded-xl hover:bg-white/10 transition-all duration-300 group"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <div className="relative w-6 h-6">
                <Menu 
                  size={24} 
                  className={`absolute inset-0 transition-all duration-300 ${
                    mobileMenuOpen ? 'rotate-180 opacity-0' : 'rotate-0 opacity-100'
                  }`}
                />
                <X 
                  size={24} 
                  className={`absolute inset-0 transition-all duration-300 ${
                    mobileMenuOpen ? 'rotate-0 opacity-100' : 'rotate-180 opacity-0'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Enhanced Mobile Menu */}
      <div className={`
        fixed inset-0 z-40 md:hidden transition-all duration-300
        ${mobileMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'}
      `}>
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            mobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileMenuOpen(false)}
        ></div>
        
        {/* Menu Panel */}
        <div className={`
          absolute top-20 right-0 w-80 max-w-[90vw] h-[calc(100vh-5rem)] 
          bg-gradient-to-b from-green-700 to-green-800 
          shadow-2xl transition-transform duration-300 overflow-hidden
          ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}>
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-yellow-500"></div>
        
     
          {/* Navigation Items */}
          <nav className="p-4 space-y-2">
            {navigationItems.map((item, index) => (
              <div
                key={item.value}
                className={`transform transition-all duration-300 ${
                  mobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100 + 150}ms` }}
              >
                <button
                  onClick={() => handleNavigation(item.value)}
                  className={`
                    w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 group
                    ${currentPage === item.value
                      ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-green-800 shadow-lg transform scale-105'
                      : 'text-white hover:bg-white/10 hover:transform hover:translate-x-2'
                    }
                  `}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{item.icon}</span>
                    <div className="text-left">
                      <div className={`font-semibold text-lg ${
                        currentPage === item.value ? 'text-green-800' : 'text-white'
                      }`}>
                        {item.label}
                      </div>
                      <div className={`text-sm ${
                        currentPage === item.value ? 'text-green-700' : 'text-green-200'
                      }`}>
                        {item.value === 'explore' && 'Discover our services'}
                        {item.value === 'rooms' && 'View accommodations'}
                        {item.value === 'bookings' && 'Make a reservation'}
                        {item.value === 'contact' && 'Get in touch'}
                      </div>
                    </div>
                  </div>
                  <ChevronRight 
                    size={20} 
                    className={`transition-transform duration-300 group-hover:translate-x-1 ${
                      currentPage === item.value ? 'text-green-800' : 'text-green-300'
                    }`}
                  />
                </button>
              </div>
            ))}
          </nav>
          
          {/* Menu Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-green-800/50 backdrop-blur-sm">
            <div className="text-center">
              <div className="text-yellow-400 font-bold text-lg mb-1">101 Guest House</div>
              <div className="text-green-200 text-sm">Comfortability with Class</div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content jumping */}
      <div className="h-20"></div>
    </>
  );
};

export default Header;