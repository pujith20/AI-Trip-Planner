import img2 from "../assets/temple.jpg";
import img3 from "../assets/hotel.jpg";
import img4 from "../assets/store.jpg";
import img5 from "../assets/weather.jpg";
import img6 from "../assets/travel.jpg";
import img7 from "../assets/trip.jpg";
import "../styles/DailyPlan.css";

// Predefined images for categories
const categoryImages = {
  temple: img2,
  hotel: img3,
  market: img4,
  nature: img5,
  travel: img6,
  default: img7
};

// Function to determine image category based on place name or details
const getImageForPlace = (place) => {
  const placeText = (place.placeName + " " + (place.placeDetails || "")).toLowerCase();

  if (placeText.includes("temple")) {
    return categoryImages.temple;
  }
  if (placeText.includes("hotel") || placeText.includes("check-in") || placeText.includes("checkout")) {
    return categoryImages.hotel;
  }
  if (placeText.includes("market") || placeText.includes("shops") ||  placeText.includes("centers") || placeText.includes("eatery") || placeText.includes("restaurant")) {
    return categoryImages.market;
  }
  if (placeText.includes("nature") || placeText.includes("park") || placeText.includes("garden")) {
    return categoryImages.nature;
  }
  if (placeText.includes("travel")) {
    return categoryImages.travel;
  }

  return categoryImages.default;
};

const DailyPlan = ({ itinerary }) => {
  console.log(itinerary);
  if (!itinerary) {
    return <div>No Itinerary Found</div>;
  }

  // Extract keys and sort them based on the numerical part
  const sortedDays = Object.keys(itinerary).sort((a, b) => {
    const dayA = parseInt(a.replace("day", ""));
    const dayB = parseInt(b.replace("day", ""));
    return dayA - dayB;
  });

  return (
    <div className="daily-plan-con">
      {/* Iterate through the sorted days */}
      {sortedDays.map((day, index) => (
        <div key={index} className="daily-plan">
          <h2>{`Day ${index + 1}`}</h2>
          <p className="best-time">Best Time to Visit: {itinerary[day].bestTimeToVisit}</p>

          {/* Iterate through the plan of the day */}
          <div className="plan-container">
            {itinerary[day].plan.map((place, i) => {
              const imageUrl = getImageForPlace(place);

              return (
                <div key={i} className="place-card">
                  <img
                    className="place-image"
                    src={imageUrl}
                    alt={place.placeName}
                  />
                  <div className="place-details">
                    <h3>{place.placeName}</h3>
                    <p>{place.placeDetails}</p>
                    <p><strong>Ticket Pricing:</strong> {place.ticketPricing}</p>
                    <p><strong>Travel Time:</strong> {place.travelTime}</p>
                    <p><strong>Geo Coordinates:</strong> ({place.geoCoordinates.latitude}, {place.geoCoordinates.longitude})</p>
                    {place.theme && <p><strong>Theme:</strong> {place.theme}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DailyPlan;
