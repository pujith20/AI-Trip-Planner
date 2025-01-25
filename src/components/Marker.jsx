import React, { useState, useEffect } from "react";
import "../styles/Marker.css";

const Marker = ({ title, step, currentStep, onInputSubmit, autofillSuggestions }) => {
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility
  const [inputSubmitted, setInputSubmitted] = useState(false); // Track input submission
  const [inputValue, setInputValue] = useState(""); // State to store input value
  const [filteredSuggestions, setFilteredSuggestions] = useState([]); // Filtered suggestions based on user input
  const [showSuggestions, setShowSuggestions] = useState(false); // Show suggestion dropdown

  const isCompleted = step < currentStep;

  // Automatically display the card when progress reaches the marker
  useEffect(() => {
    if (step === currentStep) {
      setTimeout(() => {
        setShowPopup(true); // Show popup smoothly when progress reaches this step
      }, 300); // Delay for smooth effect
    }
  }, [currentStep, step]);

  // Calculate vertical position for mobile (< 768px) based on step
  const isMobile = window.innerWidth < 768;
  const markerPosition = isMobile
    ? { left: "28%", top: `calc(${step * 25}% + 10%)`, transform: "translateX(-50%)" }
    : { left: `${step * 25 + 10}%`, top: "50%" };

  // Handle input submission and move to the next step
  const handleInputSubmit = () => {
    if (inputValue.trim() === "") {
      alert(`Please enter ${title}`);
      return; // Don't submit if input is empty
    }
    setInputSubmitted(true); // Mark input as submitted
    setShowPopup(false); // Hide popup after submission
    onInputSubmit(step, inputValue); // Pass input value to the parent component
  };

  // Handle change in destination input to show autofill suggestions
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    
    if (step === 0) { // Only show suggestions for the first field (Destination)
      const filtered = autofillSuggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    }
  };

  // Handle suggestion selection
  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="marker-container" style={markerPosition}>
      <div className={`marker ${isCompleted ? "completed" : ""}`}>
        <div className="marker-icon">{isCompleted ? "✔️" : "❓"}</div>
      </div>

      {/* Show the label */}
      <div className="marker-label" style={isMobile ? { display: "none" } : {}}>
        {title}
      </div>

      {/* Show popup only when the step is active and input is not yet submitted */}
      {showPopup && !inputSubmitted && (
        <div className="popup-card popup-slide-in">
          {/* Popup with smooth slide-in effect */}
          <h3 style={isMobile ? { display: "none" } : {}}>{title}</h3>
          
          {/* Input Fields */}
          {step === 0 ? (
            <div>
              <input
                type="text"
                placeholder={`Enter ${title}`}
                value={inputValue}
                onChange={handleInputChange} // Track input value for destination autofill
              />
              {/* Show suggestions dropdown */}
              {showSuggestions && filteredSuggestions.length > 0 && (
                <ul className="suggestions-list">
                  {filteredSuggestions.map((suggestion, index) => (
                    <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : step === 1 ? (
            <input
              type="number"
              placeholder={`Enter ${title}`} // Numeric input for No. of Days
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          ) : step === 2 ? (
            <select value={inputValue} onChange={(e) => setInputValue(e.target.value)}>
              <option value="">Select Budget</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Luxury">Luxury</option>
            </select>
          ) : step === 3 ? (
            <select value={inputValue} onChange={(e) => setInputValue(e.target.value)}>
              <option value="">Select People Count</option>
              <option value="Solo">Solo</option>
              <option value="Couple">Couple</option>
              <option value="Family">Family</option>
              <option value="Friends">Friends</option>
            </select>
          ) : null}

          <button onClick={handleInputSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default Marker;
