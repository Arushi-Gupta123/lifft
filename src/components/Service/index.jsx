import React, { useRef } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-scroll";
import lift1 from "../../assets/lift1.jpg"; // Correct import
import lift2 from "../../assets/lift2.jpg"; // Correct import
import lift3 from "../../assets/lift3.jpg"; // Correct import
import lift4 from "../../assets/lift4.jpg"; // Correct import

const Service = () => {
  const container = useRef(null);

  const services = [
    {
      title: "Lift Installation",
      description:
        "We provide top-notch installation services for residential and commercial elevators, ensuring safety and reliability.",
      icon: lift1, // Use the imported image
    },
    {
      title: "Lift Maintenance",
      description:
        "Our maintenance service guarantees smooth performance, minimizing downtime and maximizing efficiency.",
      icon: lift2, // Use the imported image
    },
    {
      title: "Emergency Repair Services",
      description:
        "Our expert technicians are available 24/7 for emergency lift repairs, ensuring quick and reliable solutions.",
      icon: lift3, // Use the imported image
    },
    {
      title: "Lift Modernization",
      description:
        "We offer lift modernization services to upgrade outdated systems, enhancing safety and performance.",
      icon: lift4, // Use the imported image
    },
  ];

  return (
    <section id="service" ref={container}>
      <div className="service-page">
        <header className="service-header text-center bg-[white] py-5">
          <h1 className="text-4xl font-bold text-[#62b114]">
            Our Expert Lift Services
          </h1>
          <p className="text-lg text-gray-700 mt-4">
            Providing high-quality lift services for installation, maintenance,
            repair, and modernization.
          </p>
        </header>

        {/* Services Section */}
        <section className="services-container py-16 px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {services.map((service, index) => (
              <div
                key={index}
                className="service-card text-center border p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={service.icon}
                  alt={service.title}
                  className="w-16 h-16 mx-auto mb-4 object-cover" // Ensure images cover the space without distortion
                />
                <h3 className="text-xl font-semibold text-[#268328]">{service.title}</h3>
                <p className="text-gray-600 mt-3">{service.description}</p>
                <Link
                  to="contact"
                  spy={true}
                  smooth={true}
                  offset={-100}
                  className="mt-4 text-[#268328] hover:text-green-600 flex justify-center items-center space-x-2"
                >
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="why-choose-us py-16 px-8 bg-[#f7fafc]">
          <h2 className="text-3xl font-bold text-center text-[#62b114]">
            Why Choose Us for Your Lift Needs?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-[#268328] text-white rounded-full flex items-center justify-center mr-4">
                <span className="text-xl font-semibold">1</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#268328]">Experienced Technicians</h3>
                <p className="text-gray-600 mt-2">
                  Our team of skilled and experienced technicians ensures top-notch services with safety as a priority.
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-[#268328] text-white rounded-full flex items-center justify-center mr-4">
                <span className="text-xl font-semibold">2</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#268328]">24/7 Emergency Services</h3>
                <p className="text-gray-600 mt-2">
                  Our emergency repair services are available around the clock to ensure you're never stuck.
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-[#268328] text-white rounded-full flex items-center justify-center mr-4">
                <span className="text-xl font-semibold">3</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#268328]">Affordable Pricing</h3>
                <p className="text-gray-600 mt-2">
                  We offer competitive pricing for all our services without compromising on quality.
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-[#268328] text-white rounded-full flex items-center justify-center mr-4">
                <span className="text-xl font-semibold">4</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#268328]">Quality Assurance</h3>
                <p className="text-gray-600 mt-2">
                  We use high-quality materials and ensure that our services are durable and reliable.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Service;
