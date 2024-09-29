import React from 'react';
import img1 from '../assets/1.jpg'
import img2 from '../assets/2.jpg'
import img3 from '../assets/3.jpg'
const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-16 text-center bg-[#d6d6c8]">
      <h2 className="text-4xl font-bold mb-12 text-[#12372A]">How It Works</h2>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Step 1 */}
        <div className="flex flex-col items-center">
          <img 
            src={img2}
            alt="Register" 
            className="w-60 h-60 object-cover rounded-full mb-4"
          />
          <h3 className="text-2xl font-semibold mb-2 text-[#12372A]">Step 1: Register & Submit Info</h3>
          <p className="text-[#12372A]">
            Athletes register and submit their information for testing.
          </p>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center">
          <img 
            src={img1}
            alt="Testing" 
            className="w-60 h-60 object-cover rounded-full mb-4"
          />
          <h3 className="text-2xl font-semibold mb-2 text-[#12372A]">Step 2: Testing Conducted</h3>
          <p className="text-[#12372A]">
            Doping tests are performed and results uploaded to the system.
          </p>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center">
          <img 
            src={img3}
            alt="Track Results" 
            className="w-60 h-60 object-cover rounded-full mb-4"
          />
          <h3 className="text-2xl font-semibold mb-2 text-[#12372A]">Step 3: Track Results</h3>
          <p className="text-[#12372A]">
            Both athletes and authorities can track results and ensure compliance.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
