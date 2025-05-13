import React from "react";
import hospital from "../../assets/hospital.jpeg";
import "./Hospital.css";

const Hospital = () => {
  return (
    <div className="application-detail">
      {/* Center the image and give it an appropriate size */}
      <img src={hospital} alt="Hospital Elevator" className="application-detail-image" />
      
      <h1 className="application-detail-title">Efficient, Reliable, and Built to Last</h1>

      <p className="application-detail-description">
      Imagine you’ve just completed the design of a cutting-edge healthcare facility in a bustling city. Now it’s time to ensure seamless movement for patients, staff, and visitors with efficient, durable hospital lifts designed to handle high demands and withstand daily wear and tear. At Gen Elevators, we offer robust solutions tailored for healthcare environments, including elevators, escalators, and platform lifts that accommodate stretchers, food carts, and passengers while maintaining smooth, reliable operation.

     Our elevators are equipped with features for sight- and hearing-impaired passengers, ensuring compliance with safety and accessibility regulations. Precision floor leveling ensures smooth and safe transitions for patients and staff, reducing risks in critical moments.

    In a healthcare setting, where every second matters, our passenger, bed, and service elevators deliver optimized performance, high throughput, and uncompromising reliability. With durable components designed to withstand the challenges of busy hospitals, you can trust our systems to perform under pressure while ensuring a comfortable experience.

    For older facilities, our customizable modernization packages allow you to improve security, capacity, comfort, speed, aesthetics, and energy efficiency. Upgrades can be tailored to your timeline and budget, providing maximum benefit with minimal disruption. Supported by industry-leading service, we ensure your mobility solutions remain at their best, ready to meet the demands of healthcare environments




      </p>
    </div>
  );
};

export default Hospital;
