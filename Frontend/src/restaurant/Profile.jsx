import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosConfig";
import Menu from "../components/Menu";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    restaurant_name: "",
    location: "",
    description: "",
    contact_info: "",
    timings: "",
    images: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [edit, setEdit] = useState(false);
  const [showFileInput, setShowFileInput] = useState(false);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/restaurant/profile",
        { withCredentials: true }
      );
      if (response.status === 200) {
        setProfile(response.data);
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("You are not authenticated. Please log in.");
        navigate("/restaurantlogin");
      } else {
        setError("Failed to fetch profile information.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileChange = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:3000/restaurant/profile",
        profile,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("profile", profile);
      if (response.status === 200) {
        fetchProfile();
        setEdit(false);
      }
    } catch (err) {
      setError("Failed to update profile. Please try again later.");
    }
  };

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.put(
        "http://localhost:3000/restaurant/profile/picture",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.status === 200) {
        setProfile((prev) => ({ ...prev, images: response.data.filePath }));
        setShowFileInput(false);
      }
    } catch (err) {
      setError("Failed to update profile picture. Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-between">
      <div className="profile-section p-4 w-25">
        <h1 className="text-center mb-4">Profile</h1>
        {!edit ? (
          <div className="text-center">
            <img
              src={
                profile.images
                  ? `http://localhost:3000${profile.images}`
                  : "/restaurant.jpg"
              }
              alt="Profile"
              className="rounded-circle mb-3"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
            <p>Name: {profile.restaurant_name}</p>
            <p>Phone Number: {profile.contact_info}</p>
            <p>Location: {profile.location}</p>
            <p>Description: {profile.description}</p>
            <p>Hours: {profile.timings}</p>
            <button
              className="btn btn-primary mt-3"
              onClick={() => setEdit(true)}
            >
              Edit Profile
            </button>

            <button
              className="btn btn-secondary mt-3"
              onClick={() => setShowFileInput(!showFileInput)}
            >
              Edit Profile Picture
            </button>
            {showFileInput && (
              <div className="mt-3">
                <input
                  type="file"
                  onChange={handleProfilePictureChange}
                  accept="image/*"
                  className="form-control"
                />
              </div>
            )}
          </div>
        ) : (
          <form onSubmit={handleProfileChange}>
            <input
              type="text"
              name="restaurant_name"
              value={profile.restaurant_name}
              onChange={handleChange}
              className="form-control mb-3"
              placeholder="Restaurant Name"
              required
            />
            <input
              type="text"
              name="contact_info"
              value={profile.contact_info}
              onChange={handleChange}
              className="form-control mb-3"
              placeholder="Phone Number"
            />
            <input
              type="text"
              name="location"
              value={profile.location}
              onChange={handleChange}
              className="form-control mb-3"
              placeholder="Location"
              required
            />
            <input
              type="text"
              name="description"
              value={profile.description}
              onChange={handleChange}
              className="form-control mb-3"
              placeholder="Description"
            />
            <input
              type="text"
              name="timings"
              value={profile.timings}
              onChange={handleChange}
              className="form-control mb-3"
              placeholder="Hours"
            />
            <button type="submit" className="btn btn-success w-100">
              Save Changes
            </button>
          </form>
        )}
      </div>
      <div className="menu-section w-75">
        <Menu />
      </div>
    </div>
  );
};

export default Profile;
