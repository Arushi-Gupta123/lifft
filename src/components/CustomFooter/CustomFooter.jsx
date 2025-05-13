import React from 'react';
import { BsFacebook, BsLinkedin, BsInstagram, BsYoutube, BsEnvelope } from "react-icons/bs";
import './CustomFooter.css';
import twitterr from '../../assets/twitterr.png';
import { Link as RouterLink } from 'react-router-dom'; // import Link from react-router-dom
import liftlogo from '../../assets/liftlogo.jpeg';

const CustomFooter = () => {
  // Navigation Items
  const navItems = [
    { link: "Home", path: "/" },
    { link: "Services", path: "/service" },
    { link: "Blog", path: "/blog" },
    { link: "Applications", path: "/applications" },
    { link: "Careers", path: "/career" },
    { link: "Contact Us", path: "/contact" },
  ];

  return (
    <footer className="custom-footer">
      {/* Logo Section */}
      <div className="footer-logo-section">
      <img src={liftlogo} alt="Lift Logo" className="footer-logo" />
        <h1 className="footer-title">
          <div className="ml-2 text-xl font-bold -translate-y-2">
            <span className="text-dark-green text-3xl">G</span>
            <span className="text-dark-green text-lg mr-2">EN</span>
            <span className="text-dark-green text-3xl">E</span>
            <span className="text-dark-green text-lg">LEVATORS</span> 
          </div>
        </h1>
      </div>

      {/* Social Icons Section */}
      <div className="footer-icons-horizontal">
        {/* Twitter */}
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="icon-circle">
          <img src={twitterr} alt="Twitter" className="social-icon" />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="icon-circle">
          <BsFacebook />
        </a>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="icon-circle">
          <BsLinkedin />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="icon-circle">
          <BsInstagram />
        </a>
        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="icon-circle">
          <BsYoutube />
        </a>
        <a href="mailto:info@genelevators.com" className="icon-circle">
          <BsEnvelope />
        </a>
      </div>

      {/* Navigation Section */}
      <div className="footer-nav-horizontal">
        {navItems.map((item) => (
          <RouterLink key={item.path} to={item.path} className="footer-link">
            {item.link} <span className="arrow">↑</span>
          </RouterLink>
        ))}
      </div>

      {/* Footer Bottom Section */}
      <div className="footer-bottom">
        <p className="footer-copyright">
          © 2025 GEN ELEVATORS, All Rights Reserved.
        </p>

        <div className="footer-links-below">
  <RouterLink to="/privacy-policy">Privacy Policy</RouterLink>  
  <span className="divider">|</span>
  <RouterLink to="/sitemap">Sitemap</RouterLink>
</div>

      </div>
    </footer>
  );
};

export default CustomFooter;
