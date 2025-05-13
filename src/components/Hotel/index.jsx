import React from "react";
import hotel from "../../assets/hotel.png";
import "./Hotel.css";

const Hotel = () => {
  return (
    <div className="application-detail">
      {/* Center the image and give it an appropriate size */}
      <img src={hotel} alt="Hotel Elevator" className="application-detail-image" />
      
      <h1 className="application-detail-title">Elegant and Customizable Solutions for Your Hotel’s Unique Style</h1>

      <p className="application-detail-description">
      As the manager of a five-star hotel, you aim to offer your guests a seamless, luxurious experience—including their elevator rides. At Gen Elevators, we provide a portfolio of fast, smooth, spacious, and reliable mobility solutions designed to meet the unique needs of hotels and restaurants.

No matter your building’s architectural style, our elevators, escalators, and service lifts strike the perfect balance of form, function, and aesthetics. We customize systems to complement your design, creating a cohesive and elegant experience for guests.

From soft starting and braking to exquisite materials, multilingual announcements, and LiftScreen displays, our advanced features enhance both comfort and convenience. State-of-the-art controllers ensure minimal wait times, enabling your guests to move quickly and effortlessly throughout your property.

When it’s time to modernize, we offer tailored solutions completed swiftly and efficiently to keep disruptions to an absolute minimum. With Gen Elevators, your mobility systems stay in impeccable condition, elevating the guest experience and reinforcing your establishment’s commitment to excellence.




      </p>
    </div>
  );
};

export default Hotel;
