import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode
import "../styles/Header.css";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState(""); // Track user email after authentication
  const [authDropdownOpen, setAuthDropdownOpen] = useState(false); // Track if auth dropdown is open

  useEffect(() => {
    // Check if user is already authenticated (stored in localStorage)
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const parsedUser = JSON.parse(user); // Safely parse the user data
        if (parsedUser && parsedUser.email) {
          setIsAuthenticated(true);
          setUserEmail(parsedUser.email); // Retrieve and display user email
        }
      } catch (error) {
        console.error("Error parsing user data: ", error);
      }
    }
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLoginSuccess = (credentialResponse) => {
    try {
      // Decode the token to retrieve user info
      const user = jwtDecode(credentialResponse.credential);
      if (user && user.email) {
        localStorage.setItem("user", JSON.stringify(user)); // Store user data in localStorage
        setIsAuthenticated(true);
        setUserEmail(user.email);
        window.location.reload(); // Reload the page after login
      } else {
        console.error("Email not found in response.");
      }
    } catch (error) {
      console.error("Error during login: ", error);
    }
  };

  const handleLogout = () => {
    // Log out user
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    window.location.reload(); // Reload the page after logout
  };

  return (
    <>
      <nav className="nav-bg-con">
        {/* Logo */}
        <div className="logo-con">
          <Link to="/">
            <p>Trip Planner.</p>
          </Link>
        </div>

        {/* Navigation links for desktop */}
        <ul className="nav-link-con">
          <li className="nav-item">
            <Link to="/contact" className="box">
              Contact
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="box">
              About
            </Link>
          </li>
        </ul>

        {/* Sign In / Profile Section */}
        <ul className="nav-link-con-2">
          {!isAuthenticated ? (
            <li className="auth-dropdown-container">
              <span
                className="signin-link"
                onClick={() => setAuthDropdownOpen(!authDropdownOpen)}
              >
                Sign In
              </span>
              {authDropdownOpen && (
                <div className="auth-dropdown">
                  <GoogleLogin
                    onSuccess={handleLoginSuccess}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                  />
                </div>
              )}
            </li>
          ) : (
            <li className={`auth-dropdown-container signed-in`}>
              <span
                className="profile-icon"
                onClick={() => setAuthDropdownOpen(!authDropdownOpen)}
              >
                {userEmail}
              </span>
              {authDropdownOpen && (
                <div className="auth-dropdown">
                  <button onClick={handleLogout}>Log Out</button>
                </div>
              )}
            </li>
          )}
          <li className="saved-trips">
            <Link to="/saved-trips" className="box">
              Saved Trips
            </Link>
          </li>
          
        </ul>
        

        {/* Menu Icon for mobile view */}
        <div className="menu-icon" onClick={toggleSidebar}>
          &#9776; {/* Hamburger icon */}
        </div>
      </nav>

      {/* Sidebar for mobile view */}
      <div
        className={`sidebar ${sidebarOpen ? "open" : ""}`}
        style={{ width: sidebarOpen ? "250px" : "0" }}
      >
        <a href="#" className="closebtn" onClick={toggleSidebar}>
          &times;
        </a>
        <ul>
          <li>
            <Link to="/contact" className="box">Contact</Link>
          </li>
          <li>
            <Link to="/about" className="box">About</Link>
          </li>
          {/* Saved Trips link in the sidebar */}
          <li>
            <Link to="/saved-trips" className="box">Saved Trips</Link>
          </li>
          {/* Sign In/Log Out link in the sidebar */}
          {!isAuthenticated ? (
            <li className="auth-dropdown-container-mobile-view">
              <span
                className="box signed-in"
                onClick={() => setAuthDropdownOpen(!authDropdownOpen)}
              >
                Sign In
              </span>
              {authDropdownOpen && (
                <div className="auth-dropdown">
                  <GoogleLogin
                    onSuccess={handleLoginSuccess}
                    onError={() => console.log("Login Failed")}
                  />
                </div>
              )}
            </li>
          ) : (
            <li className={`auth-dropdown-container-mobile-view signed-in`}>
              <span
                className="profile-icon box"
                onClick={() => setAuthDropdownOpen(!authDropdownOpen)}
              >
                {userEmail}
              </span>
              {authDropdownOpen && (
                <div className="auth-dropdown">
                  <button onClick={handleLogout}>Log Out</button>
                </div>
              )}
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default Header;
