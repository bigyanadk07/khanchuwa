import React from 'react'

const CTA:React.FC = () => {
  return (
    <div>
    <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join hundreds of users already using Khanchuwa.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-orange-600 hover:bg-orange-600 cursor-pointer text-white font-semibold py-4 px-12 rounded-lg transition-all duration-200 transform hover:scale-105">
              Get Started
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CTA