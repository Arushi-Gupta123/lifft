import React, { useState, useEffect, useRef } from "react";
import "./Chatbox.css";
import customr from "../../assets/customr.jpg";
import liftlogo from "../../assets/liftlogo.jpeg";
import emailjs from "@emailjs/browser";

const Chatbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [conversationStep, setConversationStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const chatEndRef = useRef(null);

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
  });

  const services = [
    "Lift Installation",
    "Lift Maintenance",
    "Emergency Repair Services",
    "Lift Modernization",
    "Apartment Lifts",
    "Company Lifts",
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const resetChat = () => {
    setChatHistory([
      { sender: "bot", message: "Can you please share your name for me to help you?" },
    ]);
    setConversationStep(0);
    setUserInput("");
    setErrorMessage("");
    setSelectedService("");
    setUserDetails({
      name: "",
      email: "",
      company: "",
      phone: "",
    });
  };

  const handleNewChat = () => {
    resetChat();
  };

  const handleToggle = () => {
    if (!isOpen) resetChat();
    setIsOpen(true);
    setShowPopup(false);
  };

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const sendEmail = (details) => {
    const templateParams = {
      from_name: details.name,
      from_email: details.email,
      company: details.company,
      service: details.service,
      phone: details.phone,
    };

    emailjs
      .send(
        "service_ugdmbih",
        "template_ux8dk2d",
        templateParams,
        "qWuMqg39h3MPhAWLh"
      )
      .then((response) => {
        console.log("Email sent successfully!", response);
      })
      .catch((error) => {
        console.error("Email sending failed:", error);
      });
  };

  const handleSendUserMessage = () => {
    if (userInput.trim() === "") return;
  
    const input = userInput.trim();
    setUserInput("");
    setErrorMessage("");
  
    switch (conversationStep) {
      case 0:
        setUserDetails((prev) => ({ ...prev, name: input }));
        setConversationStep(1);
        setChatHistory((prev) => [
          ...prev,
          { sender: "user", message: input },
          { sender: "bot", message: "Thank you. Can you please share your email address for us to communicate?" },
        ]);
        break;
  
      case 1:
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)) {
          setErrorMessage("Please provide a valid email address.");
          return;
        }
        setUserDetails((prev) => ({ ...prev, email: input }));
        setConversationStep(2);
        setChatHistory((prev) => [
          ...prev,
          { sender: "user", message: input },
          { sender: "bot", message: "Can you please share your company name?" },
        ]);
        break;
  
      case 2:
        setUserDetails((prev) => ({ ...prev, company: input }));
        setConversationStep(3);
        setChatHistory((prev) => [
          ...prev,
          { sender: "user", message: input },
          { sender: "bot", message: "Which services are you looking out for?" },
        ]);
        break;
  
      case 4:
        if (!/^\d{5,15}$/.test(input)) {
          setErrorMessage("Please provide a valid phone number.");
          return;
        }
  
        const fullDetails = {
          ...userDetails,
          service: selectedService,
          phone: input,
        };
  
        sendEmail(fullDetails);
  
        setUserDetails((prev) => ({ ...prev, phone: input }));
        setChatHistory((prev) => [
          ...prev,
          { sender: "user", message: input },
          { sender: "bot", message: "Thank you! Our team will get in touch with you soon." },
        ]);
  
        setConversationStep(5);
        break;

      default:
        break;
    }
  };

  const handleSelectService = (service) => {
    setSelectedService(service);
    setChatHistory((prev) => [
      ...prev,
      { sender: "user", message: service },
      { sender: "bot", message: "Please share your phone number so we can reach out?" },
    ]);
    setConversationStep(4);
  };

  return (
    <div className={`chatbox-container ${isOpen ? "expanded" : "collapsed"}`}>
      {!isOpen && (
        <div className="chat-image-container" onClick={handleToggle}>
          <img src={customr} alt="Customer Icon" className="chat-image" />
          {showPopup && (
            <div className="popup-message" onClick={handleToggle}>
              <div className="popup-icon">
                <img src={liftlogo} alt="Icon" style={{ width: '40px', height: '40px' }} />
              </div>
              <span>Thank you for visiting GEN ELEVATORS.</span>
              <button className="popup-close" onClick={() => setShowPopup(false)}>×</button>
            </div>
          )}
        </div>
      )}

      {isOpen && (
        <div className="chat-expanded">
          <div className="chat-header">
            <img src={liftlogo} alt="Company Logo" className="company-logo" />
            <button className="close-btn" onClick={() => setIsOpen(false)}>×</button>
          </div>

          <div className="chat-body">
            {chatHistory.map((msg, index) => (
              <div key={index} className={msg.sender === "user" ? "user-message" : "company-message"}>
                {msg.message}
              </div>
            ))}

            {conversationStep === 3 && (
              <div className="options">
                {services.map((service, index) => (
                  <button
                    key={index}
                    className={`service-option ${selectedService === service ? "selected" : ""}`}
                    onClick={() => handleSelectService(service)}
                  >
                    {service}
                  </button>
                ))}
              </div>
            )}

            {conversationStep === 5 && (
              <div className="end-chat-section">
                <button className="new-chat-btn" onClick={handleNewChat}>
                  Start New Chat
                </button>
              </div>
            )}

            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <div ref={chatEndRef}></div>
          </div>

          {conversationStep !== 5 && (
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="Type your message here..."
                value={userInput}
                onChange={handleInputChange}
                onKeyPress={(event) => {
                  if (event.key === "Enter") handleSendUserMessage();
                }}
              />
              <button onClick={handleSendUserMessage}>Send</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Chatbox;
