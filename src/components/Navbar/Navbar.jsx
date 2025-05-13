import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { FaTimes, FaBars, FaChevronDown } from "react-icons/fa";
import liftlogo from "../../assets/liftlogo.jpeg";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const resourcesRef = useRef(null);
  const helpRef = useRef(null);

  // Toggle menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Handle sticky navbar on scroll
  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        resourcesRef.current &&
        !resourcesRef.current.contains(event.target)
      ) {
        setIsResourcesOpen(false);
      }
      if (helpRef.current && !helpRef.current.contains(event.target)) {
        setIsHelpOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { link: "Home", path: "/" },
    { link: "About Us", path: "/about" },
    { link: "Services", path: "/service" },
    { link: "Products", path: "/product" },
    {link: "Applications" , path:"/applications"},
    { link: "Team", path: "/team" },
    { link: "Clients", path: "/client" },
  ];

  const resourcesItems = [
    { link: "Gallery", path: "/gallery" },
    { link: "Blog", path: "/blog" },
  ];

  const helpItems = [
    { link: "Quotation", path: "/quotation" },
    { link: "Careers", path: "/career" },
    { link: "Contact Us", path: "/contact" },
  ];

  return (
    <header
      className={`w-full h-20 bg-white border-b border-gray-200 flex items-center px-5 z-50 ${
        isSticky ? "shadow-md fixed top-0 left-0" : "absolute"
      }`}
    >
      <nav className="container mx-auto flex justify-between items-center py-6 px-6">
        {/* Logo */}
        <div className="flex items-center">
          <NavLink to="/">
            <img
              src={liftlogo}
              alt="Logo"
              className="w-16 h-16 object-contain ml-8"
            />
            <div className="ml-2 text-xl font-bold -translate-y-2">
              <span className="text-dark-green text-3xl">G</span>
              <span className="text-dark-green text-lg mr-2">EN</span>
              <span className="text-dark-green text-3xl">E</span>
              <span className="text-dark-green text-lg">LEVATORS</span>
            </div>
          </NavLink>
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center space-x-8 flex-wrap">
          {navItems.map(({ link, path }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `text-lg font-small-bold transition-all duration-300 ${
                    isActive
                      ? "text-green-700 font-bold"
                      : "text-gray-900 hover:text-green-700"
                  }`
                }
              >
                {link}
              </NavLink>
            </li>
          ))}

          {/* Resources Dropdown */}
          <li className="relative" ref={resourcesRef}>
            <div
              onClick={() => setIsResourcesOpen(!isResourcesOpen)}
              className="flex items-center cursor-pointer text-lg font-small-bold transition-all duration-300 text-gray-900 hover:text-green-700"
            >
              Resources <FaChevronDown className="ml-1" />
            </div>
            {isResourcesOpen && (
              <ul className="absolute top-full left-0 bg-white shadow-md py-2 w-40">
                {resourcesItems.map(({ link, path }) => (
                  <li key={path}>
                    <NavLink
                      to={path}
                      className="block px-4 py-2 text-gray-900 hover:text-green-700 hover:bg-gray-100"
                      onClick={() => setIsResourcesOpen(false)}
                    >
                      {link}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* Help Dropdown */}
          <li className="relative" ref={helpRef}>
            <div
              onClick={() => setIsHelpOpen(!isHelpOpen)}
              className="flex items-center cursor-pointer text-lg font-small-bold transition-all duration-300 text-gray-900 hover:text-green-700"
            >
              Help <FaChevronDown className="ml-1" />
            </div>
            {isHelpOpen && (
              <ul className="absolute top-full left-0 bg-white shadow-md py-2 w-40">
                {helpItems.map(({ link, path }) => (
                  <li key={path}>
                    <NavLink
                      to={path}
                      className="block px-4 py-2 text-gray-900 hover:text-green-700 hover:bg-gray-100"
                      onClick={() => setIsHelpOpen(false)}
                    >
                      {link}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isMenuOpen ? (
              <FaTimes className="h-6 w-6" />
            ) : (
              <FaBars className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <ul className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center space-y-4 py-4 md:hidden">
            {navItems.map(({ link, path }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className="text-lg font-medium transition-all duration-300 text-gray-900 hover:text-green-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link}
                </NavLink>
              </li>
            ))}
            <li>
              <span className="text-lg font-medium text-gray-900">
                Resources
              </span>
              <ul>
                {resourcesItems.map(({ link, path }) => (
                  <li key={path}>
                    <NavLink
                      to={path}
                      className="block px-4 py-2 text-gray-900 hover:text-green-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <span className="text-lg font-medium text-gray-900">Help</span>
              <ul>
                {helpItems.map(({ link, path }) => (
                  <li key={path}>
                    <NavLink
                      to={path}
                      className="block px-4 py-2 text-gray-900 hover:text-green-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
