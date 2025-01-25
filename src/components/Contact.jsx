import React, { useState } from "react";
import emailjs from "emailjs-com"; // Import EmailJS
import "../styles/Contact.css"; // Import the CSS file

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: "",
    comments: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      "service_94xrhng",  // Replace with your EmailJS service ID
      "template_gcgpnpb", // Replace with your EmailJS template ID
      e.target,
      "D7QiUkyig6AypDnm1"      // Replace with your EmailJS user ID
    )
    .then(
      (result) => {
        console.log(result.text);
        alert("Message sent successfully!");
        // Reset the form data after successful submission
        setFormData({
          name: "",
          email: "",
          feedback: "",
          comments: "" // Reset comments field too
        });
      },
      (error) => {
        console.log(error.text);
        alert("An error occurred while sending the message.");
      }
    );
  };

  return (
    <div className="form-container">
      <form className="contact-form" onSubmit={sendEmail}>
        <h2 className="form-title">Get in Touch</h2>

        <div className="form-group">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-input"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-input"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="website-feedback" className="form-label">How would you rate our website?</label>
          <select
            id="website-feedback"
            name="feedback"
            className="form-select"
            value={formData.feedback}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select an option</option>
            <option value="perfect">The website looks flawless and perfect!</option>
            <option value="good">A great website, but could benefit from a few additional changes.</option>
            <option value="functional-attractive">Functional, but the features could be more engaging.</option>
            <option value="needs-styling">The design is functional, but the styling could use more attention.</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="comments" className="form-label">Comments</label>
          <textarea
            id="comments"
            name="comments"
            className="form-textarea"
            placeholder="Enter your comments"
            rows="5"
            value={formData.comments}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit" className="form-submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default Contact;
