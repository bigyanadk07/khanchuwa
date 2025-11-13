import React from "react";
import { FaAppStore } from "react-icons/fa";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { motion } from "framer-motion";

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden main-color to-indigo-900 text-white py-32 mx-40 my-20 rounded-2xl">
      {/* Background glow effect */}
      <div className="absolute inset-0 opacity-90 blur-xs homeImage" />

      <div className="relative max-w-6xl mx-auto text-center z-10 text-white">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight"
        >
          Discover Your Next <br className="hidden sm:block" /> Favorite Place to Eat 🍜
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-lg md:text-xl mb-10 max-w-2xl mx-auto"
        >
          The ultimate app to explore, bookmark, and review the best food spots near you —
          all in one place.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button className="flex bg-orange-500 text-white cursor-pointer items-center justify-center px-4 py-4 rounded-2xl text-lg font-semibold hover:bg-white hover:text-blue-700 transition transform hover:scale-105 shadow-lg">
            <FaAppStore className="mr-2 text-2xl" />AppStore
          </button>
          <button className="flex cursor-pointer items-center justify-center bg-white text-black px-2 py-4 rounded-2xl text-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105 shadow-lg">
            <IoLogoGooglePlaystore className="mr-2 text-2xl" />GooglePlay
          </button>

        </motion.div>
      </div>

      {/* Decorative blurred circles */}  
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-40"></div>
      <div className="absolute -top-16 -left-16 w-72 h-72 bg-indigo-400 rounded-full mix-blend-screen filter blur-3xl opacity-30"></div>
    </section>
  );
};

export default Hero;
