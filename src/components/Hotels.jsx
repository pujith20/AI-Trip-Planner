import img1 from "../assets/hotels.jpg";
import "../styles/Hotels.css";

const Hotels = ({ hotels }) => {
  console.log(hotels);
  return (
    <div className="hotels-container">
      <h2>Available Hotels</h2>
      <div className="hotels-list">
        {hotels && hotels.length > 0 ? (
          hotels.map((hotel, index) => (
            <div className="hotel-card" key={index}>
              <img
                className="hotel-image"
                src={img1}
                alt={hotel.hotelName}
              />
              <div className="hotel-details">
                <h3 className="hotel-name">{hotel.hotelName}</h3>
                <p className="hotel-address">{hotel.hotelAddress}</p>
                <p className="hotel-description">{hotel.descriptions}</p>
                <p className="hotel-price">{hotel.price}</p>
                <p className="hotel-rating">
                  <strong>Rating:</strong> {hotel.rating}/5
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No hotels available</p>
        )}
      </div>
    </div>
  );
};

export default Hotels;
