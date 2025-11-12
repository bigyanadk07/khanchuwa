import { Mail, Phone, MapPin } from 'lucide-react'
import React from 'react'

const Footer:React.FC = () => {
  return (
    <div>
        <footer className="  py-12 px-4 accent-color">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold  mb-4">Khanchuwa</div>
              <p className=" mb-4">Your ultimate companion to discover, bookmark, and review the best local food spots.</p>
            </div>
            
            <div>
              <h3 className=" font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="">Contact Us</a></li>
                <li><a href="#" className="">FAQ</a></li>
                <li><a href="#" className="">Terms of Service</a></li>
                <li><a href="#" className="">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className=" font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="">Blog</a></li>
                <li><a href="#" className="">Careers</a></li>
                <li><a href="#" className="">About Us</a></li>
                <li><a href="#" className="">Contact Us</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className=" font-semibold mb-4">Contact</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Mail size={16} />
                  <span>devs-khanchuwa@gmail.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={16} />
                  <span>+01 5557645</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin size={16} className="mt-1" />
                  <span>Lalitpur, Nepal<br/>Nakkhu 44600</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className=" text-sm mb-4 md:mb-0">
              © 2024 Khanchuwa. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer