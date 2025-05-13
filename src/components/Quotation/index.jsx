import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./Quotation.css";

const Quotation = () => {
  const [step, setStep] = useState(1);
  const [offerNumber, setOfferNumber] = useState(null);
  const [dropdowns, setDropdowns] = useState({});
  const [formData, setFormData] = useState({
    communication: "",
    customerName: "",
    gender: "",
    email: "",
    phoneNumber: "",
    liftSpecifications: {},
  });
  const [errors, setErrors] = useState({});
  const requiredLiftFields = [
    "Type Of Elevator",
    "No Of Elevator",
    "Type Of Drive",
    "Type and Capacity",
    "Motor",
    "Rope",
    "Speed",
    "Door Drive",
    "Door Locks"
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dropdownRes, offerRes] = await Promise.all([
          axios.get("http://localhost:5000/api/dropdowns"),
          axios.get("http://localhost:5000/api/offer-number"),
        ]);
        setDropdowns(dropdownRes.data);
        setOfferNumber(offerRes.data.offerNumber);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // ✅ Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // ✅ Handle Dropdown Changes
  const handleDropdownChange = (e, key) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      liftSpecifications: {
        ...prevData.liftSpecifications,
        [key]: value,
      },
    }));
  };
  const validateStep1 = () => {
    let newErrors = {};
    if (!formData.communication) newErrors.communication = "This field is required.";
    if (!formData.customerName.trim()) newErrors.customerName = "This field is required.";
    if (!formData.gender) newErrors.gender = "This field is required.";
    const emailPattern = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/; // Basic email format
    const domainPattern = /@[^@]+\.com$/; // Ensures @something.com format
    const multipleAtPattern = /@.*@/; // Checks for multiple '@'

    if (!formData.email) {
        newErrors.email = "Email is required.";
    } else if (multipleAtPattern.test(formData.email)) {
        newErrors.email = "Email cannot contain multiple '@' symbols.";
    } else if (!emailPattern.test(formData.email)) {
        newErrors.email = "Invalid email format.";
    } else if (!domainPattern.test(formData.email)) {
        newErrors.email = "Email must be in '@something.com' format.";
    }    if (!formData.phoneNumber || !/^\d{10,15}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Enter a valid phone number.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
     // ✅ Validate Step 2
  const validateStep2 = () => {
    let newErrors = {};

    requiredLiftFields.forEach((field) => {
      if (!formData.liftSpecifications[field]) {
        newErrors[field] = "This field is required.";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const nextStep = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;


    setStep(step + 1);
  };


  // ✅ Navigation Functions
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  // ✅ Handle PDF Generation & Download
  const handleViewPDF = async () => {
    const input = document.getElementById("pdf-content");
    if (!input) return console.error("PDF content not found!");
  
    try {
      const canvas = await html2canvas(input, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
  
      const imgWidth = 200;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let yPosition = 10;
  
      if (imgHeight > 277) {
        let pageHeight = 277;
        let remainingHeight = imgHeight;
        let startY = 0;
  
        while (remainingHeight > 0) {
          pdf.addImage(imgData, "PNG", 10, yPosition, imgWidth, imgHeight, undefined, "FAST");
          remainingHeight -= pageHeight;
          startY += pageHeight;
  
          if (remainingHeight > 0) {
            pdf.addPage();
            yPosition = 10;
          }
        }
      } else {
        pdf.addImage(imgData, "PNG", 10, yPosition, imgWidth, imgHeight, undefined, "FAST");
      }
  
      // ✅ Convert PDF to Blob and send it to backend
      const pdfBlob = pdf.output("blob");
      const formData = new FormData();
      formData.append("file", pdfBlob, "final_quotation.pdf");
  
      const response = await fetch("http://localhost:5000/api/merge-pdf", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) throw new Error("Failed to merge PDF");
  
      // ✅ Convert merged PDF response to Blob and create a URL
      const mergedPdfBlob = await response.blob();
      const pdfUrl = window.URL.createObjectURL(mergedPdfBlob);
  
      // ✅ Open the PDF in a new tab
      window.open(pdfUrl, "_blank");
  
      // ✅ Create an invisible download link for direct download
      const downloadLink = document.createElement("a");
      downloadLink.href = pdfUrl;
      downloadLink.download = "quotation.pdf"; // Set filename
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
  
      // ✅ Revoke URL after some time to free memory
      setTimeout(() => URL.revokeObjectURL(pdfUrl), 5000);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };
  // ✅ Handle Form Submission
  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit quotation");
      }

      alert("Quotation submitted successfully!");
      // ✅ Reset Form Data & Set Step to 1
    setFormData({
      communication: "",
      customerName: "",
      gender: "",
      email: "",
      phoneNumber: "",
      liftSpecifications: {},
    });

    setErrors({}); // Clear any validation errors
    setStep(1); // Go back to step 1
    } catch (error) {
      console.error("Error submitting quotation:", error);
      alert("An error occurred while submitting the quotation.");
    }
  };  


  return (
    <div className="container">
      <div className="form-box">
        {step === 1 && (
          <>
            <h2>Customer Details</h2>
            <div className="input-group">
              <label>Pronunciation <span className="required">*</span></label>
              <select name="communication" onChange={handleChange} value={formData.communication}>
                <option value="">Select</option>
                <option value="Miss">Miss</option>
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Dr.">Dr.</option>
              </select>
              {errors.communication && <p className="error-message">{errors.communication}</p>}
            </div>
            <div className="input-group">
              <label>Customer Name <span className="required">*</span></label>
              <input type="text" name="customerName" placeholder="Customer Name" onChange={handleChange} value={formData.customerName} />
              {errors.customerName && <p className="error-message">{errors.customerName}</p>}
            </div>

            <div className="input-group">
              <label>Gender <span className="required">*</span></label>
              <select name="gender" onChange={handleChange} value={formData.gender}>
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.gender && <p className="error-message">{errors.gender}</p>}
            </div>

            <div className="input-group">
              <label>Email <span className="required">*</span></label>
              <input type="email" name="email" placeholder="Email" onChange={handleChange} value={formData.email} />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>

            <div className="input-group">
              <label>Phone Number <span className="required">*</span></label>
              <input type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} value={formData.phoneNumber} />
              {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}
            </div>

            <div className="button-container">
              <button onClick={nextStep}>Save & Next</button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
          <div className="form-boxx">
            <h2>Lift Specifications</h2>
            <div className="input-group">
              <label>Offer Number: {offerNumber}</label>
            </div>
            <div className="lift-specifications-grid">
  {Object.keys(dropdowns).map((key, index) => (
    <div className="input-group" key={key}>
      <label>
                    {key} {requiredLiftFields.includes(key) && <span className="required">*</span>}
                  </label>
                  <select onChange={(e) => handleDropdownChange(e, key)} value={formData.liftSpecifications[key] || ""}>
                    <option value="">Select</option>
                    {dropdowns[key].map((option, i) => (
                      <option key={i} value={option}>{option}</option>
                    ))}
                  </select>
                  {errors[key] && <p className="error-message">{errors[key]}</p>}
              </div>
            ))}
             </div>
            <div className="button-container">
              <button onClick={prevStep}>Back</button>
              <button onClick={nextStep}>Save & Next</button>
            </div>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2>Review & Download</h2>
          
          <div id="pdf-content">
            <h3>Customer Details</h3>
            <div className="input-group">
            <label>Offer Number: {offerNumber}</label>
          </div>
            <table>
              <tbody>
                <tr><td><strong>Pronounciation:</strong></td><td>{formData.communication}</td></tr>
                <tr><td><strong>Customer Name:</strong></td><td>{formData.customerName}</td></tr>
                <tr><td><strong>Gender:</strong></td><td>{formData.gender}</td></tr>
                <tr><td><strong>Email:</strong></td><td>{formData.email}</td></tr>
                <tr><td><strong>Phone Number:</strong></td><td>{formData.phoneNumber}</td></tr>
              </tbody>
            </table>
                    
            <h3>Lift Specifications</h3>
            
            <table>
              <tbody>
                {Object.entries(formData.liftSpecifications).map(([key, value]) => (
                  <tr key={key}><td><strong>{key}:</strong></td><td>{value}</td></tr>
                ))}
              </tbody>
            </table>
          </div>

            <div className="button-container">
              <button onClick={prevStep}>Back</button>
              <button onClick={handleViewPDF}>View</button>
              <button onClick={handleSubmit}>Submit</button>
 

            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Quotation;
