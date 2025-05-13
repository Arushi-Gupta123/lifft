import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomerDetail = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pronunciation: "",
    customerName: "",
    gender: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) newErrors[key] = "This field is required";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      localStorage.setItem("customerData", JSON.stringify(formData));
      navigate("/lift-specifications");
    }
  };

  return (
    <div>
      <h2>Customer Details</h2>
      <form>
        {["pronunciation", "customerName", "gender", "email", "phone"].map((key) => (
          <div key={key}>
            <label>{key} *</label>
            <input type="text" name={key} onChange={handleChange} />
            {errors[key] && <p style={{ color: "red" }}>{errors[key]}</p>}
          </div>
        ))}
        <button type="button" onClick={handleNext}>Save & Next</button>
      </form>
    </div>
  );
};

export default CustomerDetail;
