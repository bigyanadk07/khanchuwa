import React from 'react';
import { X, Menu, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import KhanchuwaLogo from '/images/logos/khanchuwa-logo.png';

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <img 
                src={KhanchuwaLogo} 
                alt="Khanchuwa Logo" 
                className='w-12 h-12 transition-transform duration-300 group-hover:scale-105' 
              />
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Khanchuwa
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link 
              to="/" 
              className="px-4 py-2 text-gray-700 hover:text-emerald-600 transition-all duration-300 rounded-lg hover:bg-emerald-50 font-medium"
            >
              Home
            </Link>
            <div 
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button className="px-4 py-2 text-gray-700 hover:text-emerald-600 transition-all duration-300 rounded-lg hover:bg-emerald-50 font-medium flex items-center space-x-1">
                <span>Features</span>
                <ChevronDown size={16} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <Link to="/features#analytics" className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
                    Analytics
                  </Link>
                  <Link to="/features#security" className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
                    Security
                  </Link>
                  <Link to="/features#integration" className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
                    Integration
                  </Link>
                </div>
              )}
            </div>
            <Link 
              to="/contact" 
              className="px-4 py-2 text-gray-700 hover:text-emerald-600 transition-all duration-300 rounded-lg hover:bg-emerald-50 font-medium"
            >
              Contact
            </Link>
          </div>
          
          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <button className="px-6 py-2.5 text-gray-700 hover:text-emerald-600 transition-all duration-300 font-medium rounded-lg hover:bg-gray-50">
              Sign In
            </button>
            <button className="bg-orange-500 text-white px-6 py-2.5 rounded-xl font-medium hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95">
              Get Started
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
          >
            {mobileMenuOpen ? (
              <X size={24} className="text-gray-700" />
            ) : (
              <Menu size={24} className="text-gray-700" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 animate-in slide-in-from-top duration-300">
          <div className="px-4 py-4 space-y-2">
            <Link 
              to="/" 
              className="block px-4 py-3 text-gray-700 hover:text-emerald-600 transition-all duration-300 rounded-lg hover:bg-emerald-50 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/features" 
              className="block px-4 py-3 text-gray-700 hover:text-emerald-600 transition-all duration-300 rounded-lg hover:bg-emerald-50 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              to="/contact" 
              className="block px-4 py-3 text-gray-700 hover:text-emerald-600 transition-all duration-300 rounded-lg hover:bg-emerald-50 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <button 
                className="w-full text-center px-4 py-3 text-gray-700 hover:text-emerald-600 transition-all duration-300 rounded-lg hover:bg-gray-50 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </button>
              <button 
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-3 rounded-xl font-medium hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;