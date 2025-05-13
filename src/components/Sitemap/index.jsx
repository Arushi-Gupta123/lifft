// In your Sitemap/index.jsx file
import React from "react";
import "./Sitemap.css"; // Import the CSS file for styles
import background from "../../assets/background.jpg"; // Import the background image

const Sitemap = () => {
  return (
    <div className="sitemap-container">
      {/* Background image */}
      <img 
        className="sitemap-image" 
        src={background} 
        alt="Sitemap Background" 
      />

      <div className="sitemap-text">
        Sitemap
      </div>

      <div className="sitemap-columns">
        {/* Column 1 - Home */}
        <div className="sitemap-column">
          <h3>Home</h3>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              About Company
              <ul>
                <li><a href="/about">Company</a></li>
                <li><a href="/team">Team</a></li>
                <li><a href="/career">Career</a></li>
              </ul>
            </li>
            <li>
              Services
              <ul>
                <li><a href="/service">Lift Installation</a></li>
                <li><a href="/service">Lift Maintenance</a></li>
                <li><a href="/service">Emergency Repair Services</a></li>
                <li><a href="/service">Lift Modernization</a></li>
             
              </ul>
            </li>
            <li>
              Products
              <ul>
              <li><a href="/product">Glass Elevators</a></li>
                <li><a href="/product">Apartment Lifts</a></li> 
                <li><a href="/product">Company Lifts</a></li> 
              </ul>
            </li>
          </ul>
        </div>

        {/* Column 2 - Industries */}
        <div className="sitemap-column">
          <h3>Industries</h3>
          <ul>
            <li>
              <ul>
              </ul>
            </li>
            <li><a href="/service">Manufacturing</a></li>
            <li><a href="/clients">Software Industry</a></li>
          </ul>
          
          <li>
            Resources
            <ul>
              <li><a href="/gallery">Visual Gallery</a></li>
              <li><a href="/blog">Blogs</a></li>
            </ul>
          </li>
        </div>

        {/* Column 3 - Contact  */}
        <div className="sitemap-column contact-column">
          <h3>Contact</h3>
          <ul>
            <li>
              <a href="/contact">Contact Us</a>
            </li>
            <li>
              <a href="/career">Career</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;  // Ensure this line exists to export Sitemap as default.
