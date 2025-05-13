import React from "react";
import res from "../../assets/res.png";
import "./Residential.css";

const Residential = () => {
  return (
    <div className="application-detail">
      {/* Center the image and give it an appropriate size */}
      <img src={res} alt="Residential Elevator" className="application-detail-image" />
      
      <h1 className="application-detail-title">Creating a Welcoming Experience</h1>

      <p className="application-detail-description">
      Imagine parents who have picked up the kids from school, shopping bags in hand, arriving home to their recently completed condo building. A building you helped make happen. They’ve put their trust in you to choose a comfortable, safe and reliable elevator system to get them home. At TK Elevator, we can help you earn and keep their trust.

    From elevators to stair lifts, our systems make people feel at home. They help you enhance the quality of life in your building while also saving energy and reducing costs. With their excellent sound insulation, high reliability and superior ease of use, our elevators make for pleasant and quiet neighbours. From exclusive villas to apartment complexes, we have the right system to take people home, safely, comfortably and stylishly.

    When you’re home, everything is just right. A TK Elevator mobility solution, supported around the clock by our best-in-class service, makes it even better.        
      </p>
    </div>
  );
};

export default Residential;
