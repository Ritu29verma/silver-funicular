import React from 'react'
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import HowItWorksSection from '../components/HowItWorksSection';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

function LandingPage() {

  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/investigator-form');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegisterAthlete = () => {
    navigate('/athlete-form');
  };

  return (
    <div>
       <Header />
      <HeroSection />
      <section className="py-16 bg-white text-center">
      <h2 className="text-3xl font-bold mb-8 ">Register as Investigator or Athlete</h2>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 border bg-slate-100 rounded-2xl shadow-md">
          <h3 className="text-2xl font-semibold mb-4 ">Register as Investigator</h3>
          <p>Track and manage doping tests with ease.</p>
          {/* <a href="#register-investigator" className="bg-primary text-black px-6 py-3 rounded mt-4 inline-block"></a> */}
         <div className='space-x-4'>
         <button onClick={handleRegister} className="bg-[#12372A] text-white px-4 py-2 mt-4 rounded">
          Register As Investigator
          </button>
          <button onClick={handleLogin} className="bg-[#12372A] text-white px-4 py-2 mt-4 rounded">
          Login As Investigator
          </button>
         </div>
        </div>
        <div className="p-8 border bg-slate-100 rounded-2xl shadow-md">
          <h3 className="text-2xl font-semibold mb-4">Register as Athlete</h3>
          <p>Ensure compliance and monitor your test results.</p>
          {/* <a href="#register-athlete" className="bg-primary text-white px-6 py-3 rounded mt-4 inline-block">Register Now</a> */}
          <button  onClick={handleRegisterAthlete} className="bg-[#12372A] text-white px-4 py-2 mt-4 rounded">
          Register As Athlete

          </button>
        </div>
      </div>
    </section>
      {/* <FeaturesSection /> */}
      <HowItWorksSection />
     <div>
     <section id="register" className="py-16 bg-primary text-black text-center">
      <h2 className="text-3xl font-bold mb-6">Ready to Keep Sports Clean?</h2>
      <p className="text-lg mb-8">Join thousands of athletes and sports professionals ensuring integrity and fairness in sports.</p>
    </section>
     </div>
      <Footer />
    </div>
  )
}

export default LandingPage
