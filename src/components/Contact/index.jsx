import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";
import gsap from "gsap";
import contact2 from "../../assets/contact2.jpg"; // Background image
import contact from "../../assets/contact.png"; // Image for the right side
import "leaflet/dist/leaflet.css";
import "./Contact.css";

// Default marker icon for Leaflet
const defaultIcon = L.icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Office locations for the map markers
const officeLocations = [
  {
    name: "Bangalore",
    coordinates: [12.9716, 77.5946],
    address: "No.49, Ground Floor, 3rd Cross AB, Hanumagiri Nagar,Chikkalasandra,Bangalore - 560 061.",
  },
];

const CenterMap = ({ coords }) => {
  const map = useMap();
  map.setView(coords, 10); // Set zoom level based on the active location
  return null;
};

const Contact = () => {
  const container = useRef(null);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [activeLocation, setActiveLocation] = useState(null); // Track the active location
  const [errors, setErrors] = useState({}); // Track form validation errors

  useEffect(() => {
    const timeline = gsap.timeline();
    timeline.fromTo(
      ".contact__title",
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1 }
    );
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMarkerHover = (location) => {
    setActiveLocation(location); // Display address on hover
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.firstname) formErrors.firstname = "First name is required.";
    if (!formData.lastname) formErrors.lastname = "Last name is required.";
    if (!formData.email) formErrors.email = "Email address is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) formErrors.email = "Invalid email address.";
    if (!formData.phone) formErrors.phone = "Phone number is required.";
    else if (!/^\d+$/.test(formData.phone)) formErrors.phone = "Invalid phone number.";
    if (!formData.message) formErrors.message = "Message is required.";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post("http://localhost:5000/api/contact", formData);
        setStatus("Form submitted successfully! Someone will contact you soon."); // ✅ Updated message
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          message: "",
        });
        setErrors({});
      } catch (error) {
        setStatus("There was an error. Please try again.");
      }
    }
  };

  return (
    <section id="contact" ref={container}>
      {/* Background Image Section */}
      <div className="contact__image">
        <img src={contact2} alt="Contact Us" className="contact__background-image" />
        <div className="contact__overlay">
          <h1 className="contact__title">Reach out to us</h1>
        </div>
      </div>

      {/* Map Section from the First Contact Page */}
      <div className="contact__map">
        <MapContainer
          center={[20.5937, 78.9629]} // India centered
          zoom={4}
          minZoom={4} // Prevent zooming out too far
          maxZoom={4} // Prevent zooming in beyond level 4
          style={{ height: "100%", width: "100%" }}
          zoomControl={false} // Disable zoom controls
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {officeLocations.map((location, index) => (
            <Marker
              key={index}
              position={location.coordinates}
              icon={defaultIcon}
              eventHandlers={{
                mouseover: () => handleMarkerHover(location),
                mouseout: () => setActiveLocation(null), // Reset address when mouse out
              }}
            >
              {activeLocation && activeLocation.name === location.name && (
                <Tooltip direction="top" offset={[0, -30]} permanent>
                  <strong>{location.name}</strong>
                  <br />
                  {location.address}
                </Tooltip>
              )}
            </Marker>
          ))}
          {activeLocation && <CenterMap coords={activeLocation.coordinates} />}
        </MapContainer>
      </div>

      {/* Form Section */}
      <div className="container">
        <div className="contact__form-container">
          <div className="contact__form-wrapper">
            <div className="contact__form">
              <h1 className="title">Let us connect you!</h1>
              <p className="text__muted">If you have any queries, feel free to contact us.</p>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="input-container">
                    <input
                      type="text"
                      placeholder="First name"
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleInputChange}
                      className="control"
                    />
                    {errors.firstname && <p className="error-text">{errors.firstname}</p>}
                  </div>
                  <div className="input-container">
                    <input
                      type="text"
                      placeholder="Last name"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleInputChange}
                      className="control"
                    />
                    {errors.lastname && <p className="error-text">{errors.lastname}</p>}
                  </div>
                </div>
                <div className="row">
                  <div className="input-container">
                    <input
                      type="email"
                      placeholder="Email address"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="control"
                    />
                    {errors.email && <p className="error-text">{errors.email}</p>}
                  </div>
                  <div className="input-container">
                    <input
                      type="tel"
                      placeholder="Phone number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="control"
                    />
                    {errors.phone && <p className="error-text">{errors.phone}</p>}
                  </div>
                </div>
                <div className="input-container">
                  <textarea
                    name="message"
                    cols={30}
                    rows={10}
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="control"
                  ></textarea>
                  {errors.message && <p className="error-text">{errors.message}</p>}
                </div>
                <div className="contact_form_bottom">
                  <button type="submit" className="btn btn__primary">Send Now</button>
                </div>
              </form>
              {status && <p className="status-message">{status}</p>}
            </div>

            <div className="contact__image-wrapper">
              <img src={contact} alt="Contact Us" className="contact__side-image" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
