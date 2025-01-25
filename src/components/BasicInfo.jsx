import "../styles/BasicInfo.css";

const BasicInfo = ({ trip }) => {
  return (
    <div>
      {trip ? (
        <div className="trip-details">
          <h2>Trip Details</h2>
          <div className="trip-info">
            <div className="trip-item">
              <span className="trip-label">Arrival:</span>
              <span className="trip-value">{trip.userSelection?.arrival}</span>
            </div>
            <div className="trip-item">
              <span className="trip-label">Destination:</span>
              <span className="trip-value">
                {trip.userSelection?.destination}
              </span>
            </div>
            <div className="trip-item">
              <span className="trip-label">Budget:</span>
              <span className="trip-value">{trip.userSelection?.budget}</span>
            </div>
            <div className="trip-item">
              <span className="trip-label">Days:</span>
              <span className="trip-value">{trip.userSelection?.days}</span>
            </div>
            <div className="trip-item">
              <span className="trip-label">People:</span>
              <span className="trip-value">{trip.userSelection?.people}</span>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading trip details...</p>
      )}
    </div>
  );
};

export default BasicInfo;
