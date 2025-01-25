import { collection, query, where, getDocs } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../services/firebaseConfig";
import UserTripCardItem from "./UserTripCardItem";
import "../styles/SavedTrips.css";
import Loader from "./Loader";

const SavedTrips = () => {
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(false); // State for loading effect

  const navigate = useNavigate();
  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/");
      return;
    }
    setUserTrips([]);
    const q = query(
      collection(db, "AITrips"),
      where("userEmail", "==", user?.email)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      setUserTrips((prev) => [...prev, doc.data()]);
      setLoading(false);
    });
  };
  return (
    <div className="saved-trips-container">
      {loading && <Loader />} {/* Show loader when loading is true */}
      <h2>My Trips</h2>
      <div className="trip-list">
        {userTrips.map((trip, index) => (
          <UserTripCardItem key={index} trip={trip} />
        ))}
      </div>
    </div>
  );
};

export default SavedTrips;
