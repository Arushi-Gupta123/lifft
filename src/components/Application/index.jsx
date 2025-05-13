import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Application.css";
import hospital from "../../assets/hospital.jpeg";
import hotel from "../../assets/hotel.png";
import industry from "../../assets/industry.jpg";
import res from "../../assets/res.png";
import office from "../../assets/office.jpg";
import retail from "../../assets/retail.jpg";
import school from "../../assets/school.jpg";
import trans from "../../assets/trans.png";

// Sample data for applications
const applications = [
  {
    id: 1,
    title: "Office",
    description: "Offices, banks, insurance companies",
    image: office,
    path: "/applications/office", // Add path for each application
  },
  {
    id: 2,
    title: "Residential",
    description: "Lofts, single and multiple-family homes, apartment/condo complexes, retirement homes",
    image: res,
    path: "/applications/residential",
  },

  {
    id: 4,
    title: "Hospital",
    description: "Nursing and retirement homes, clinics and medical centres, hospitals",
    image: hospital,
    path: "/applications/hospital",
  },
  {
    id: 5,
    title: "Hotel",
    description: "Guest houses, country inns, hotels, luxury resorts, restaurants",
    image: hotel,
    path: "/applications/hotel",
  },
  {
    id: 6,
    title: "Retail",
    description: "Department stores, shopping centres, supermarkets",
    image: retail,
    path: "/applications/retail",
  },
  {
    id: 7,
    title: "Industrial",
    description: "Warehouses, manufacturing facilities, factories, power plants",
    image: industry,
    path: "/applications/industrial",
  },
  {
    id: 8,
    title: "Education",
    description: "Daycares and kindergartens, schools, universities, libraries, religious facilities",
    image: school,
    path: "/applications/education",
  },
];

const Application = () => {
  const navigate = useNavigate(); // For navigation
  const container = useRef(null);

  useEffect(() => {
    // Add any GSAP animation logic if required
  }, []);

  const handleApplicationClick = (path) => {
    navigate(path); // Navigate to the corresponding application page
  };

  return (
    <section id="applications" className="applications-section" ref={container}>
      <h2 className="section-title">Applications</h2>
      <div className="applications-grid">
        {applications.map((app) => (
          <div
            className="application-card"
            key={app.id}
            onClick={() => handleApplicationClick(app.path)} // Navigate on click
          >
            <img src={app.image} alt={app.title} className="application-image" />
            <div className="application-info">
              <h3 className="application-title">{app.title}</h3>
              <p className="application-description">{app.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Application;
