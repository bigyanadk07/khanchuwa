import React from 'react'

const Header:React.FC = () => {
  return (
    <div>
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 Cinzel">
              Welcome to <span className="text-orange-500">Khanchuwa</span>
            </h1>
            <div className="flex justify-center space-x-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105">
                Get Started Free
              </button>
              <button className="border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-8 rounded-lg transition-all duration-200">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Header