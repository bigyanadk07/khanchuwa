// FoodTrailSplitSection.tsx
import React from 'react';

// Image imports
import FoodImage from '/images/screen/split-1.png';

const FoodTrailSplitSection: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="mx-40 w-full overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Text Content Section */}
          <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
              Your Culinary Companion
            </h1>
            
            <div className="space-y-4 text-gray-600">
              <p className="text-lg leading-relaxed">
                FoodTrail was born from a simple passion: connecting people with
                unforgettable food experiences. We believe that every meal is a
                story waiting to be told, a new adventure just around the corner.
              </p>
              
              <p className="text-lg leading-relaxed">
                Tired of endlessly scrolling through generic reviews and unreliable
                recommendations, our team of foodies and tech enthusiasts set
                out to create a smarter, more personal way to discover the
                culinary world.
              </p>
              
              <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                Our Mission
              </h2>
              
              <p className="text-lg leading-relaxed">
                Our mission is to empower you to build your own food map, a trail
                of delicious memories and future favorites. Whether you're a
                seasoned globetrotter or a local explorer, FoodTrail helps you cut
                through the noise and find the places that truly resonate with your
                palate.
              </p>
              
              <p className="text-lg leading-relaxed font-medium text-gray-800 mt-6">
                Join our community and start your most delicious journey yet.
              </p>
            </div>
            
            <button className="mt-8 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 w-fit">
              Start Your Journey
            </button>
          </div>
          
          {/* Image Section */}
          <div className="lg:w-1/2 flex items-center justify-center p-8 min-h-[500px]">
            {/* <div className="w-full h-full  flex flex-col items-center justify-center text-gray-500">
              <p className="text-lg font-medium">Food Experience Image</p>
              <p className="text-sm mt-2">Visual representation of culinary journey</p>
            </div> */}
            <div>
              <img src={FoodImage}alt="Split Section" className='w-72 h-auto rounded-xl' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodTrailSplitSection;