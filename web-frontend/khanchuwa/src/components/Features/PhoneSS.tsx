import React from 'react'

// Screenshots import 


const screenshots = [
    // '/images/screen/screen-1.png',
    '/images/screen/screen-2.png',
    '/images/screen/screen-3.png',
    '/images/screen/screen-4.png',
    '/images/screen/screen-5.png',
  ];


const PhoneSS:React.FC = () => {
  return (
    <div>
              <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Beautiful Interface
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the clean, intuitive design that makes Khanchuwa a joy to use
            </p>
          </div>

          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl">
              {screenshots.map((screenshot, index) => (
                <div
                  key={index}
                  className="relative group"
                >
                    <div className="rounded-2xl h-96 w-full flex items-center justify-center">
                        <img
                            src={screenshot}
                            alt="phone-screenshot-mockup"
                            className="w-full h-full object-contain"
                            />

                  </div>
                  <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PhoneSS