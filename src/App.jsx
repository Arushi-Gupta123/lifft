import { HashRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import About from './components/About';
import Service from './components/Service';
import Product from './components/Product';
import Blog from './components/Blog';
import Application from './components/Application';
import CustomFooter from './components/CustomFooter/CustomFooter';
import Contact from './components/Contact';
import Career from './components/Career';
import Team from './components/Team';
import Chatbox from './components/Chatbox';
import PrivacyPolicy from './components/PrivacyPolicy';
import Sitemap from './components/Sitemap';
import ApplicationDetail from './components/ApplicationDetail/ApplicationDetail';
import Gallery from './components/Gallery';
import Clients from './components/Clients';
import OfficeDetail from "./components/OfficeDetail";
import Residential from "./components/Residential";
import Education from "./components/Education";
import Retail from "./components/Retail";
import Hospital from "./components/Hospital";
import Hotel from "./components/Hotel";
import Industrial from "./components/Industrial";
import Quotation from "./components/Quotation";
import JobApplication from "./components/JobApplication";
import LiftSpecification from "./components/LiftSpecification";
import CustomerDetails from "./components/CustomerDetails";

function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar will remain visible on all pages */}
      <Chatbox/>
      <Routes>
        {/* Main page with all sections */}
        <Route
          path="/"
          element={
            <>
              <Home />
              <About />
              <Service />
              <Product />
              <Team />
              <Blog />
              <Application />
              <CustomFooter />
            
              
            </>
          }
        />
        
        {/* Contact page route */}
        <Route
          path="/contact"
          element={
            <>
              <Contact />
              <CustomFooter /> {/* Footer will also be present on the Contact page */}
            </>
          }
        />

         <Route
          path="/career"
          element={
            <>
              <Career />
              <CustomFooter /> {/* Footer will also be present on the Career page */}
            </>
          }
        />

        <Route
        path="/privacy-policy"
        element={
          <>
          <PrivacyPolicy />
          <CustomFooter />
          </>
        }
        />

        <Route
        path="/sitemap"
        element={
          <>
          <Sitemap />
          </>
        }   
         />
        {/* About page route */}
        <Route
          path="/about"
          element={
            <>
              <About />
              <CustomFooter />
            </>
          }
        />

        {/* Services page route */}
        <Route
          path="/service"
          element={
            <>
              <Service />
              <CustomFooter />
            </>
          }
        />

        {/* Products page route */}
        <Route
          path="/product"
          element={
            <>
              <Product />
              <CustomFooter />
            </>
          }
        />

          {/* Products page route */}
          <Route
          path="/team"
          element={
            <>
              <Team />
              <CustomFooter />
            </>
          }
        />

<Route
          path="/client"
          element={
            <>
              <Clients/>
              <CustomFooter />
            </>
          }
        />

        {/* Products page route */}
        <Route
          path="/gallery"
          element={
            <>
              <Gallery/>
              <CustomFooter />
            </>
          }
        />

        {/* Blog page route */}
        <Route
          path="/blog"
          element={
            <>
              <Blog />
              <CustomFooter />
            </>
          }
        />

         {/* Quotation page route*/}
         <Route
          path="/quotation"
          element={
            <>
              <Quotation/>
            </>
          }
        />
         <Route
          path="/"
          element={
            <>
              <CustomerDetails/>
            </>
          }
        />
         <Route
          path="/lift-specifiations"
          element={
            <>
              <LiftSpecification/>
            </>
          }
        />

        {/* Applications page route */}
        <Route
          path="/applications"
          element={
            <>
              <Application />
              <CustomFooter />
            </>
          }
        />
        <Route path="/applications/office" element={
          <>
          <OfficeDetail/>
          <CustomFooter/>
          </>
        
      } 
      />
       <Route path="/applications/residential" element={
          <>
          <Residential/>
          <CustomFooter/>
          </>
        
      } 
      />
      <Route path="/applications/hospital" element={
          <>
          <Hospital/>
          <CustomFooter/>
          </>
        
      } 
      />
      <Route path="/applications/hotel" element={
          <>
          <Hotel />
          <CustomFooter/>
          </>
        
      } 
      />
      <Route path="/applications/retail" element={
          <>
          <Retail/>
          <CustomFooter/>
          </>
        
      } 
      />
      <Route path="/applications/education" element={
          <>
          <Education/>
          <CustomFooter/>
          </>
        
      } 
      />
      <Route path="/applications/industrial" element={
          <>
          <Industrial/>
          <CustomFooter/>
          </>
        
      } 
      />
              <Route path="/job/:jobId" element={<JobApplication />} />

        </Routes>
    </Router>
  );
}

export default App;
