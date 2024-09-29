import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#12372A] text-white py-8">
      <div className="container mx-auto text-center">
        <div className="mb-4">
          <a href="#about" className="text-white mx-4">About Us</a>
          <a href="#contact" className="text-white mx-4">Contact Us</a>
          <a href="#privacy" className="text-white mx-4">Privacy Policy</a>
        </div>
        <p>© 2024 DopingTestApp. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
