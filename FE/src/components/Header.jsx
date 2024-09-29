import React from 'react';

const Header = () => {
  return (
    <header className="bg-primary text-black px-6 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">DopingTestApp</div>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#features">Features</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </nav>
        <a href="#register" className="bg-secondary px-4 py-2 rounded text-white">Get Started</a>
      </div>
    </header>
  );
};

export default Header;
