import React from "react";
import "../styles/UserTripCardItem.css"; // Make sure to create this CSS file
import img1 from "../assets/temple.jpg";
import { Link } from "react-router-dom";

const UserTripCardItem = ({ trip }) => {
  const { arrival, destination, budget, days, people } = trip?.userSelection;

  return (
    <Link to={"/view-trip/" + trip?.id} className="trip-text">
      <div className="trip-card">
        <div className="trip-image-con">
          <img src={img1} alt="trip" className="trip-image" />
        </div>
        <div className="trip-content">
          <h3>{destination}</h3>
          <p>
            <strong>Arrival:</strong> {arrival}
          </p>
          <p>
            <strong>Budget:</strong> ${budget}
          </p>
          <p>
            <strong>Days:</strong> {days}
          </p>
          <p>
            <strong>People:</strong> {people}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default UserTripCardItem;
