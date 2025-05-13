import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LiftSpecification = () => {
  const navigate = useNavigate();
  const [offerRef, setOfferRef] = useState(1);
  const [dropdowns, setDropdowns] = useState({});
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios.get("http://localhost:5000/api/offer-ref").then((res) => {
      setOfferRef(res.data.nextOfferRef);
    });

    axios.get("http://localhost:5000/api/dropdown-values").then((res) => {
      setDropdowns(res.data);
    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    Object.keys(dropdowns).forEach((key) => {
      if (!formData[key]) newErrors[key] = "This field is required";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      localStorage.setItem("liftData", JSON.stringify({ offerRef, ...formData }));
      navigate("/quotation-preview");
    }
  };

  return (
    <div>
      <h2>Lift Specifications</h2>
      <p><b>Offer Reference Number:</b> {offerRef}</p>
      <form>
        {Object.keys(dropdowns).map((key) => (
          <div key={key}>
            <label>{key} *</label>
            <select name={key} onChange={handleChange}>
              <option value="">Select</option>
              {dropdowns[key]?.map((option, idx) => (
                <option key={idx} value={option}>{option}</option>
              ))}
            </select>
            {errors[key] && <p style={{ color: "red" }}>{errors[key]}</p>}
          </div>
        ))}
        <button type="button" onClick={handleNext}>Save & Preview</button>
      </form>
    </div>
  );
};

export default LiftSpecification;
