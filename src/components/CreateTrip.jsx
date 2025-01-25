import React, { useState, useEffect } from "react";
import "../styles/CreateTrip.css";
import Marker from "./Marker";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import { chatSession } from "../services/AIModel";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";

const CreateTrip = () => {
  const [currentStep, setCurrentStep] = useState(0); // Track progress step
  const totalSteps = 4; // Total steps to display progress
  const [startingLocation, setStartingLocation] = useState("");
  const [isLocationEntered, setIsLocationEntered] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false); // State to show confirmation popup
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768); // Track screen size
  const [loading, setLoading] = useState(false); // State for loading effect
  const navigate = useNavigate(); // Navigation hook
  const AI_Prompt =
    "Generate Travel Plan from Location: {startingLocation} to Location:{destination} for {days} Days for {people} with a {budget} budget, give me Hotels Option List";
  // State to store form data for all steps
  const [formData, setFormData] = useState({
    arrival: "",
    destination: "",
    days: 0,
    budget: "",
    people: "",
  });

  // List of destination suggestions for autofill
  const destinationSuggestions = [
    "Paris",
    "New York",
    "London",
    "Tokyo",
    "Sydney",
  ];

  // Function to update current step and form data on input submission
  const handleInputSubmit = (step, value) => {
    if (value.trim() === "") {
      alert("Please enter the field");
      return;
    }

    const updatedData = { ...formData };

    switch (step) {
      case 0:
        updatedData.destination = value;
        break;
      case 1:
        updatedData.days = value;
        break;
      case 2:
        updatedData.budget = value;
        break;
      case 3:
        updatedData.people = value;
        break;
      default:
        break;
    }

    setFormData(updatedData);

    // Move to the next step
    if (step === currentStep) {
      setCurrentStep(step + 1);
    }

    // If all steps are completed, show confirmation popup
    if (step + 1 === totalSteps) {
      setShowConfirmation(true);
    }
  };

  // Function to handle location input submission
  const handleLocationSubmit = () => {
    const location = prompt("Enter your starting location:");
    if (location) {
      setStartingLocation(location);
      setIsLocationEntered(true);
      alert(`Starting location "${location}" has been saved.`);

      // Update formData with arrival location
      setFormData((prevFormData) => ({
        ...prevFormData,
        arrival: location, // Store location in arrival
      }));
      if (startingLocation) return; // Prevent prompt if location is already entered
    } else {
      alert("Please enter a valid location.");
    }
  };

  const saveAITrip = async (TripData) => {
    const user = JSON.parse(localStorage.getItem("user")); // Check user in localStorage
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user.email,
      id: docId,
    });
    setLoading(false); // Stop the loading state, hide VehicleShowcase
    navigate("/view-trip/" + docId);
  };

  // Handle confirmation submission, check authentication and show loader
  const handleConfirmSubmit = async () => {
    const user = localStorage.getItem("user"); // Check user in localStorage

    if (user) {
      setShowConfirmation(false);

      const FINAL_PROMPT = AI_Prompt.replace(
        "{startingLocation}",
        formData.arrival
      )
        .replace("{destination}", formData.destination)
        .replace("{days}", formData.days)
        .replace("{people}", formData.people)
        .replace("{budget}", formData.budget);

      setLoading(true);

      try {
        const result = await chatSession.sendMessage(FINAL_PROMPT);
        const finalResult = result.response.text();
        console.log(finalResult);
        saveAITrip(finalResult);
      } catch (error) {
        setLoading(false); // Stop the loading state in case of error
        alert(
          "An error occurred while fetching the travel plan. Please try again."
        );
        console.error(error);
      }
    } else {
      // Show an alert if the user is not authenticated
      alert("Please sign in to confirm your trip!");
    }
  };

  // Automatically trigger the location input only if it's not already entered
  useEffect(() => {
    if (!startingLocation) {
      handleLocationSubmit();
    }
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [startingLocation]); // Add startingLocation as a dependency

  // Calculate progress based on the current step
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="map-container">
      {loading && <Loader />} {/* Show loader when loading is true */}
      <div className={`map-background ${loading ? "blurred" : ""}`}>
        {/* Progress line */}
        <div className="progress-container">
          <div
            className="progress-line"
            style={{
              [isSmallScreen ? "height" : "width"]: `${progressPercentage}%`, // Apply conditionally based on screen size
            }}
          />
        </div>

        {/* Add markers and pass the input submission handler */}
        <Marker
          title="Destination"
          step={0}
          currentStep={currentStep}
          onInputSubmit={handleInputSubmit}
          autofillSuggestions={destinationSuggestions} // Pass suggestions
        />
        <Marker
          title="No. of Days"
          step={1}
          currentStep={currentStep}
          onInputSubmit={handleInputSubmit}
        />
        <Marker
          title="Budget"
          step={2}
          currentStep={currentStep}
          onInputSubmit={handleInputSubmit}
        />
        <Marker
          title="Count of People"
          step={3}
          currentStep={currentStep}
          onInputSubmit={handleInputSubmit}
        />

        <p>** Used only in India **</p>
        {/* Confirmation popup */}
        {showConfirmation && (
          <div className="confirmation-popup">
            <div className="popup-content">
              <h3>Confirm Your Trip Details</h3>
              <p>Arrival: {formData.arrival}</p> {/* Display arrival */}
              <p>Destination: {formData.destination}</p>
              <p>No. of Days: {formData.days}</p>
              <p>Budget: {formData.budget}</p>
              <p>Count of People: {formData.people}</p>
              <button onClick={handleConfirmSubmit}>Confirm</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateTrip;
