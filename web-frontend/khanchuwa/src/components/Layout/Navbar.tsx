import React from 'react';
import { X, Menu } from 'lucide-react';
import {useState} from 'react'
import { Link } from 'react-router-dom';
import KhanchuwaLogo from '/images/logos/khanchuwa-logo.png';

const Navbar:React.FC = () => {

const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div>
              <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-blue-600">
                <img src={KhanchuwaLogo} alt="Logo" className='w-16 h-auto' />
              </div>
            </div>
            
            <div className="hidden md:flex space-x-8">
              <Link to ="/"className="text-gray-700 hover:text-emerald-800 transition">Home</Link>
              <Link to ="/features"className="text-gray-700 hover:text-emerald-800 transition">Features</Link>
              <Link to ="/about"className="text-gray-700 hover:text-emerald-800 transition">About</Link>
              <Link to ="/contact"className="text-gray-700 hover:text-emerald-800 transition">Contact</Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <button className="text-gray-700 hover:text-blue-600 transition">Sign In</button>
              <button className="accent-color text-white px-6 py-2 rounded-lg hover:bg-teal-600 cursor-pointer transition">Get Started</button>
            </div>
            
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-3 space-y-3">
              <Link to="/" className="block text-gray-700 hover:text-blue-600">Home</Link>
              <Link to="/features" className="block text-gray-700 hover:text-blue-600">Features</Link>
              <Link to="/about" className="block text-gray-700 hover:text-blue-600">About</Link>
              <Link to="/contact" className="block text-gray-700 hover:text-blue-600">Contact</Link>
              <button className="w-full text-left text-gray-700 hover:text-blue-600">Sign In</button>
              <button className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">Get Started</button>
            </div>
          </div>
        )}
      </nav>
    </div>
  )
}

export default Navbar