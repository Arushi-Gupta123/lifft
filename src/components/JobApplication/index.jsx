import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./JobApplication.css";

const JobApplication = () => {
  const { jobId } = useParams(); // Get jobId from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    linkedin: "",
    resume: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ Handle input changes
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value, // Handle file input properly
    }));
  };

  // ✅ Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log("📌 jobId from URL:", jobId, "Type:", typeof jobId); // Debugging
    console.log("📌 Form Data:", formData);

    const data = new FormData();
    data.append("jobId", parseInt(jobId, 10)); // Ensure jobId is an integer

    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.post("http://localhost:5000/api/apply", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(response.data.message);
      navigate("/career");
    } catch (error) {
      console.error("❌ Error submitting application:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Failed to submit application");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="application-form">
      <h3>Application Form</h3>
      <form onSubmit={handleFormSubmit}>
        <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleInputChange} required />
        <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleInputChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
        <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} required />
        <input type="url" name="linkedin" placeholder="LinkedIn Profile" value={formData.linkedin} onChange={handleInputChange} required />
        <input type="file" name="resume" accept=".pdf,.doc,.docx" onChange={handleInputChange} required />
        <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Submitting..." : "Submit"}</button>
      </form>
    </div>
  );
};

export default JobApplication;
