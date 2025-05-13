import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Career.css';

const jobsData = [
  { id: 1, title: 'Elevator Technician', location: 'Chennai', description: 'Develop and maintain web applications.', experience: '2-4 years', department: 'Engineering' },
  { id: 2, title: 'Product Manager', location: 'Bangalore', description: 'Lead product development teams.', experience: '5+ years', department: 'Product Management' },
  { id: 3, title: 'Sales Executive', location: 'Coimbatore', description: 'Analyze and interpret complex data sets.', experience: '1-3 years', department: 'Data Analytics' },
  { id: 4, title: 'Mechanic Engineer', location: 'Hyderabad', description: 'Design and enhance user interfaces.', experience: '3-5 years', department: 'Design' },
  { id: 5, title: 'Lift Technician', location: 'Coimbatore', description: 'Develop and execute marketing strategies.', experience: '2-4 years', department: 'Marketing' },
];

const Career = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const navigate = useNavigate();

  const locations = ['All', 'Chennai', 'Bangalore', 'Coimbatore', 'Hyderabad'];

  const filteredJobs = jobsData.filter((job) => {
    const matchesLocation = selectedLocation === 'All' || job.location === selectedLocation;
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesLocation && matchesSearch;
  });

  return (
    <>
      <div className="career-title">
        <h1>Join Our Team</h1>
        <p>Current Openings</p>
      </div>
      <div className="career-page">
        <div className="career-content">
          <div className="sidebar">
            <h2>Locations</h2>
            <ul>
              {locations.map((location) => (
                <li
                  key={location}
                  className={selectedLocation === location ? 'active' : ''}
                  onClick={() => setSelectedLocation(location)}
                >
                  {location}
                </li>
              ))}
            </ul>
          </div>

          <div className="jobs-section">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search for a job..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="jobs-list">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <div key={job.id} className="job-card">
                    <h3>{job.title}</h3>
                    <p><strong>Location:</strong> {job.location}</p>
                    <button className="apply-btn" onClick={() => navigate(`/job/${job.id}`)}>Apply</button>
                  </div>
                ))
              ) : (
                <p>No jobs found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Career;
