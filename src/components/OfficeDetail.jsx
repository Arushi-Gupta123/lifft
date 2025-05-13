import React from "react";
import office from "../assets/office.jpg";
import "./OfficeDetail.css";

const OfficeDetail = () => {
  return (
    <div className="application-detail">
      {/* Center the image and give it an appropriate size */}
      <img src={office} alt="Office Elevator" className="application-detail-image" />
      
      <h1 className="application-detail-title">Effective & Robust Office Elevators</h1>

      <p className="application-detail-description">
      At 8:55 a.m., the hustle and bustle of rush hour is at its peak. A stressed office worker hurries in, worried about missing a
       critical 9 a.m. meeting with their boss. With Gen Elevators' advanced office elevator solutions, such worries become a thing of the past. Designed with cutting-edge technology, our elevators adapt to traffic patterns, seamlessly managing busy periods and conserving energy during quieter times. Whether for mid-rise or high-rise buildings, our expertly engineered elevators ensure safe, comfortable, and stylish transportation. Beyond functionality, our systems elevate the aesthetic appeal of your office foyer. We work closely with you to ensure that your elevators leave a lasting impression on employees, 
      clients, and business partners alike, making every journey stress-free and on time.
        
      </p>
    </div>
  );
};

export default OfficeDetail;
