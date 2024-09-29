import React from 'react';
import img3 from '../assets/3.jpg'
const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 bg-light-gray text-center">
      <h2 className="text-3xl font-bold mb-8">Why Choose DopingTestApp?</h2>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <img src={img3} alt="Real-time Tracking" className="w-20 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Real-time Test Results Tracking</h3>
          <p>Track all doping test results instantly with real-time analytics and reports.</p>
        </div>
        <div>
          <img src={img3} alt="Doping Control" className="w-20 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Doping Control & Compliance</h3>
          <p>Ensure compliance and safety for all athletes with automated reporting.</p>
        </div>
        <div>
          <img src={img3} alt="Bio Passport Integration" className="w-20 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Bio Passport Integration</h3>
          <p>Integrate bio-passport data seamlessly into the testing workflow.</p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
