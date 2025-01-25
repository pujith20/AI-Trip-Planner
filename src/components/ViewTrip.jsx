import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../services/firebaseConfig";
import "../styles/ViewTrip.css";
import BasicInfo from "./BasicInfo";
import Hotels from "./Hotels";
import DailyPlan from "./DailyPlan";
import Loader from "./Loader";

const ViewTrip = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState([]);
  const [loading, setLoading] = useState(false); // State for loading effect

  console.log(trip);
  useEffect(() => {
    if (tripId) {
      GetTripData();
    }
  }, [tripId]);

  /* Gets the Trip Information from Firebase */

  const GetTripData = async () => {
    setLoading(true);
    const docRef = doc(db, "AITrips", tripId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setTrip(docSnap.data());
      setLoading(false);
    } else {
      console.log("No such Document is Found !!");
      alert("No Trip Found");
      setLoading(false);
    }
  };
  return (
    <>
      <div className="trip-con">
        {loading && <Loader />}
        {trip && <BasicInfo trip={trip} />}

        {/* Conditionally render Hotels if trip.tripData and hotels exist */}
        {trip.tripData && trip.tripData.itinerary && (
          <DailyPlan itinerary={trip.tripData.itinerary} />
        )}
        {trip.tripData && trip.tripData.hotels && (
          <Hotels hotels={trip.tripData.hotels} />
        )}
      </div>
      <h3>Purely driven by AI</h3>
    </>
  );
};

export default ViewTrip;
