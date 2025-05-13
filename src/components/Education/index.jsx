import React from "react";
import school from "../../assets/school.jpg";
import "./Education.css";

const Education = () => {
  return (
    <div className="application-detail">
      {/* Center the image and give it an appropriate size */}
      <img src={school} alt="Education Elevator" className="application-detail-image" />
      
      <h1 className="application-detail-title">Ensuring Timely and Reliable Transportation</h1>

      <p className="application-detail-description">
      Picture a bustling college or university, filled with students rushing to make it to class on time. Whether it’s a library, dormitory, auditorium, or lecture hall, we have the perfect elevators, escalators, moving walkways, and accessibility lifts to meet your needs. The same applies to daycares, elementary and high schools, as well as places of worship.

      At Gen Elevators, our barrier-free mobility solutions are built to withstand heavy usage while 
      providing the reliability, speed, and functionality you need to keep people moving efficiently. Designed to complement your building's architecture, our systems ensure everyone reaches their destination safely, comfortably, and with complete peace of mind. Our dedicated service professionals work tirelessly to keep your system operating at peak performance.

      For older systems, our customizable modernization packages allow for seamless upgrades. With minimal disruption and maximum results, we help you enhance your transportation infrastructure while staying within your budget.        
      </p>
    </div>
  );
};

export default Education;
