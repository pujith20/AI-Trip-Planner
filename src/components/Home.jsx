import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import homeImage from "../assets/HomeImage.png";
import "../styles/Home.css"; // Importing the CSS file

const Home = () => {
  const words = ["Create", "Explore", "Enjoy"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true); // To control fade animation
  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsVisible(false); // Start fade-out animation
      setTimeout(() => {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        setIsVisible(true); // Start fade-in animation with new word
      }, 500); // Delay between fade-out and fade-in
    }, 1500); // Change every 1.5 seconds

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, []);

  // Function to handle Add Trip button click
  const handleAddTrip = () => {
    navigate("/create-trip"); // Navigate to the CreateTrip component
  };

  return (
    <div className="home-bg-con">
      {/* Flex Container for Hero Section */}
      <div className="hero-main-con">
        {/* Hero Image Section */}
        <div>
          <img
            className="hero-img"
            src={homeImage}
            alt="developer-img"
          />
        </div>
        {/* Hero Text Section */}
        <div className="hero-con">
          <h1 className="hero-title">
            {/* Changing Text with gap */}
            <span
              className={`hero-changing-text ${
                isVisible ? "visible" : "hidden"
              }`}
            >
              {words[currentWordIndex]}
            </span>
            <span className="static-text">your journey</span>
            {/* Static Text */}
          </h1>
          <p className="hero-subtitle">
            We're dedicated to providing the best service possible. Explore our
            website to learn more about what we do!
          </p>
          <button className="hero-btn"  onClick={handleAddTrip}>+ Add Trip</button>
        </div>

        
      </div>
    </div>
  );
};

export default Home;
