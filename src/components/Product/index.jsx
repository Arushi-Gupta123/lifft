import React, { useState ,useRef,useEffect} from "react";
import product1 from "../../assets/product1.jpeg";
import product2 from "../../assets/product2.jpg";
import product3 from "../../assets/product3.jpg";
import product4 from "../../assets/product4.jpg"; 
import product5 from "../../assets/product5.jpg"; 
import product6 from "../../assets/product6.jpg"; 
import "./Product.css";

const Product = () => {
  const container=useRef(null);
  const [selectedModel, setSelectedModel] = useState("Glass Elevators");

  const models = [
    {
      name: "Glass Elevators",
      description: "Stylish elevators with glass designs, ideal for modern architecture.",
      image: product1,
      features: ["Panoramic views", "Premium design", "Energy-efficient"],
    },
    {
      name: "Apartment Lifts",
      description: "Reliable and efficient lifts designed for residential apartments.",
      image: product4,
      features: ["Compact design", "Noise-free operation", "Secure and smooth"],
    },
    {
      name: "Individual House Lifts",
      description: "Customized solutions for private homes with elegant designs.",
      image: product5,
      features: ["Space-saving", "Custom finishes", "Energy-efficient"],
    },
    {
      name: "Company Lifts",
      description: "High-capacity lifts tailored for commercial buildings.",
      image: product6,
      features: ["High speed", "Durable materials", "Advanced safety features"],
    },
  ];

  const selectedLift = models.find((model) => model.name === selectedModel);

  return (
    <div className="product-page">
      <section id="product" className="product-header" ref={container}>
        <h1 className="product-title">Our Products</h1>
        <p className="product-subtitle">Explore our range of innovative lift systems.</p>
      </section>

      <section className="product-selection">
        <div className="model-selection">
          {models.map((model) => (
            <button
              key={model.name}
              onClick={() => setSelectedModel(model.name)}
              className={`model-button ${selectedModel === model.name ? "active" : ""}`}
            >
              {model.name}
            </button>
          ))}
        </div>

        {selectedLift ? (
          <div className="product-display">
            <img src={selectedLift.image} alt={selectedLift.name} className="product-image" />
            <div className="product-info">
              <h3 className="product-name">{selectedLift.name}</h3>
              <p className="product-description">{selectedLift.description}</p>
              <ul className="product-features">
                {selectedLift.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p className="error-message">Selected model not found. Please try again.</p>
        )}
      </section>
    </div>
  );
};

export default Product;
