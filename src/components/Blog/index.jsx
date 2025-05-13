import React, { useRef, useEffect } from "react";
import "./Blog.css";
import blog1 from "../../assets/blog1.jpg";
import blog2 from "../../assets/blog2.jpg";
import blog3 from "../../assets/blog3.jpg";

// Sample blog data
const blogs = [
  {
    id: 1,
    title: "The Future of Elevators: Smart and Sustainable",
    description: "Learn how smart elevators are shaping the future of urban mobility.",
    image: blog1, // Use the imported image variable
    link: "/blog/future-of-elevators",
  },
  {
    id: 2,
    title: "5 Maintenance Tips to Prolong Your Elevator’s Life",
    description: "Simple and effective tips to keep your elevators running smoothly.",
    image: blog2, // Use the imported image variable
    link: "/blog/maintenance-tips",
  },
  {
    id: 3,
    title: "Why Accessibility Should Be a Priority in Modern Buildings",
    description: "Discover the importance of making buildings accessible for everyone.",
    image: blog3, // Use the imported image variable
    link: "/blog/accessibility-priority",
  },
];

const Blog = () => {
  const container = useRef(null);
  //const navigate = useNavigate();

  useEffect(() => {
    // Add any GSAP animation logic here if required
    // Example animation for the section:
    // gsap.fromTo(container.current, { opacity: 0 }, { opacity: 1, duration: 1 });
  }, []);

  const handleBlogClick = (link) => {
    navigate(link); // Navigate to the corresponding blog detail page
  };

  return (
    <section id="blog" className="blog-section" ref={container}>
      <h2 className="blog-title">Our Latest Blogs</h2>
      <div className="blog-container">
        {blogs.map((blog) => (
          <div
            className="blog-card"
            key={blog.id}
            onClick={() => handleBlogClick(blog.link)} // Redirect on click
          >
            <img src={blog.image} alt={blog.title} className="blog-image" />
            <div className="blog-content">
              <h3 className="blog-heading">{blog.title}</h3>
              <p className="blog-description">{blog.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blog;
