import React from 'react'

const Header:React.FC = () => {
  return (
    <div>
              <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Get in <span className="text-orange-500">Touch</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions about Khanchuwa? We're here to help and would love to hear from you.
            Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Header