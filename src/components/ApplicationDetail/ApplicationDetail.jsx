import React from "react";
import { useParams } from "react-router-dom";
import office from "../../assets/office.jpg";
import res from "../../assets/res.png";
import trans from "../../assets/trans.png";
import hospital from "../../assets/hospital.jpeg";
import hotel from "../../assets/hotel.png";
import retail from "../../assets/retail.jpg";
import industry from "../../assets/industry.jpg";
import school from "../../assets/school.jpg";

const applicationDetails = {
  office: {
    title: "Office",
    description: "Offices, banks, and insurance companies benefit from advanced mobility solutions...",
    image: office,
  },
  residential: {
    title: "Residential",
    description: "Ideal solutions for single and multi-family homes, apartments, and retirement homes...",
    image: res,
  },
  transportation: {
    title: "Transportation",
    description: "State-of-the-art escalators and elevators for train stations, airports, and subways...",
    image: trans,
  },
  hospital: {
    title: "Hospital",
    description: "Reliable and efficient elevators tailored for hospitals and medical centers...",
    image: hospital,
  },
  hotel: {
    title: "Hotel",
    description: "Luxurious mobility systems for guest houses, hotels, and resorts...",
    image: hotel,
  },
  retail: {
    title: "Retail",
    description: "Smooth and efficient transportation systems for shopping centers and supermarkets...",
    image: retail,
  },
  industrial: {
    title: "Industrial",
    description: "Durable and robust solutions for factories, warehouses, and power plants...",
    image: industry,
  },
  education: {
    title: "Education",
    description: "Efficient elevators and escalators for schools, universities, and libraries...",
    image: school,
  },
};

const ApplicationDetail = () => {
  const { appId } = useParams();
  const app = applicationDetails[appId];

  if (!app) return <p>Application not found.</p>;

  return (
    <div className="application-detail">
      <img src={app.image} alt={app.title} className="application-detail-image" />
      <h1 className="application-detail-title">{app.title}</h1>
      <p className="application-detail-description">{app.description}</p>
    </div>
  );
};

export default ApplicationDetail;
