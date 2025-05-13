import React from "react";
import retail from "../../assets/retail.jpg";
import "./Retail.css";

const Retail = () => {
  return (
    <div className="application-detail">
      {/* Center the image and give it an appropriate size */}
      <img src={retail} alt="Retail Elevator" className="application-detail-image" />
      
      <h1 className="application-detail-title">More Time to Shop, Less Time to Wait</h1>

      <p className="application-detail-description">

      Picture a bustling weekend in the multi-story shopping center or department store you’ve recently designed. Thousands of eager shoppers fill the space, relying on your safe, fast, and dependable mobility solutions to get them where they need to go. The smoother and faster their journey, the more time they have to shop—and that’s where Gen Elevators steps in.

We provide a wide range of innovative solutions, from conventional and machine room-less elevators to robust escalators and moving walkways, all customized to meet your unique requirements. Whether you need panoramic designs, special cabin finishes, or sleek and durable systems, our products ensure smooth, efficient operation for years—no matter how many crowds or sales events you host.

Efficient movement of shoppers and goods means business thrives. To keep things running smoothly, our expert team offers end-to-end services, including consultation, maintenance, retrofitting, and modernization. At Gen Elevators, we ensure your passenger transportation systems stay in perfect shape, so your customers can focus on what matters most—enjoying their shopping experience.










      </p>
    </div>
  );
};

export default Retail;
