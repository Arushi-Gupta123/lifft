import React from "react";
import "./Clients.css";

const clientData = [
  { id: 1, clientName: "John Doe", company: "ABC Corporation" },
  { id: 2, clientName: "Jane Smith", company: "XYZ Industries" },
  { id: 3, clientName: "Mike Johnson", company: "Home Builders Inc." },
  { id: 4, clientName: "Emma Davis", company: "SafeLift Solutions" },
  { id: 5, clientName: "Liam Brown", company: "Future Tech Pvt Ltd" },
  { id: 6, clientName: "Noah Wilson", company: "Elegant Estates" },
  { id: 7, clientName: "Olivia Martin", company: "Metro Builders Ltd" },
  { id: 8, clientName: "Ava Garcia", company: "Top Gear Solutions" },
  { id: 9, clientName: "Sophia Martinez", company: "Infinity Towers" },
  { id: 10, clientName: "Lucas Miller", company: "Urban Life Constructions" },
];

const Clients = () => {
  return (
    <div className="clients-container">
      <h2 className="clients-title">Our Valued Clients</h2>
      <div className="clients-table">
        <div className="clients-column">
          <h3>Clients</h3>
          <ul>
            {clientData.map((client) => (
              <li key={client.id} className="client-row">
                {client.clientName}
              </li>
            ))}
          </ul>
        </div>
        <div className="companies-column">
          <h3>Companies</h3>
          <ul>
            {clientData.map((client) => (
              <li key={client.id} className="client-row">
                {client.company}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Clients;
