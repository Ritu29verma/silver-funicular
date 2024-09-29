import React from 'react';
import image from '../assets/p.jpg'; // Correctly import the image

const HeroSection = () => {
  return (
    <section className="hero relative h-screen text-white flex flex-col justify-center items-center">
      {/* Background Image with Blur */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${image})`, 
          filter: 'blur(2px)', // Apply blur to the background image only
          WebkitFilter: 'blur(2px)', // For Safari compatibility
          zIndex: '-1' // Ensure the background is behind the content
        }}
      ></div>
      
      {/* Content (Text and Buttons) */}
      <div className="relative z-10 text-center">
        <h1 className="text-6xl md:text-6xl font-bold mb-4 bg-white bg-clip-text text-transparent">
          Empowering Athletes with Fair Play
        </h1>
        <p className="text-lg md:text-2xl mb-6 bg-[#12372A] rounded-lg p-4">
          A comprehensive platform to manage doping tests and athlete integrity with ease.
        </p>
        <div className="flex justify-center items-center">
          <a href="#register" className="bg-secondary px-6 py-3 text-lg rounded">
            Get Started
          </a>
          <a href="#learn-more" className="bg-transparent border-2 border-white px-6 py-3 text-lg rounded ">
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
