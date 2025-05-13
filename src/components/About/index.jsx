import React, { useRef } from "react";
import "./About.css";
import about from "../../assets/about.jpg";
import mission_img from '../../assets/mission_img.jpg';
import values_img from '../../assets/values_img.jpg';
import vision_img from '../../assets/vision_img.jpg';
import { FaCheckCircle } from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const container = useRef(null);

  useGSAP(() => {
    

  })
  return (
    <section id="about" ref={container}>
      <div className="about__container">
        <div className="about__photo">
          <img src={about} alt="Lift Solutions" />
        </div>
        <div className="about__content">
          <h1 className="about__title">About Us</h1>
          <p className="about__description">
          <span className="text-dark-green text-3xl font-bold">G</span>
              <span className="text-dark-green text-lg font-bold mr-2">EN</span>
              <span className="text-dark-green text-3xl font-bold">E</span>
              <span className="text-dark-green text-lg font-bold mr-2">LEVATORS,</span> 
              we are dedicated to redefining vertical mobility with innovative, efficient, and sustainable lift solutions. With years of expertise in the elevator industry, we specialize in designing and installing state-of-the-art elevators that blend seamlessly with modern architecture. Our focus on safety, energy efficiency, and user experience ensures that every lift we build meets the highest standards of reliability and performance. Whether for residential, commercial, or industrial spaces, we provide customized solutions that enhance convenience
               and accessibility, making every journey smooth and secure.</p>
          <div className="about__features">
            <div className="feature">
              <FaCheckCircle />
              <p>High-Quality Materials</p>
            </div>
            <div className="feature">
              <FaCheckCircle />
              <p>Customizable Designs</p>
            </div>
            <div className="feature">
              <FaCheckCircle />
              <p>24/7 Customer Support</p>
            </div>
          </div>
        </div>
      </div>
      <div className="values__section">
        <h2 className="section__title">Our Core Values</h2>
        <div className="values__container">
          <div className="values__box">
            <img src={mission_img} alt="Mission" />
            <h3>Mission</h3>
            <p>
              To provide safe and reliable lift solutions with a focus on innovation and customer satisfaction.
            </p>
          </div>
          <div className="values__box">
            <img src={vision_img} alt="Vision" />
            <h3>Vision</h3>
            <p>
              To revolutionize vertical transportation with sustainable and smart technologies.
            </p>
          </div>
          <div className="values__box">
            <img src={values_img} alt="Values" />
            <h3>Values</h3>
            <p>
              Safety, reliability, and customer-centric solutions form the core of our operations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
