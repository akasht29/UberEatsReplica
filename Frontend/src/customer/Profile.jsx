import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosConfig";

const countries = [
  { value: "US", label: "United States" },
  { value: "CA", label: "Canada" },
  { value: "GB", label: "United Kingdom" },
  { value: "IN", label: "India" },
  { value: "AU", label: "Australia" },
  { value: "DE", label: "Germany" },
  { value: "FR", label: "France" },
  { value: "BR", label: "Brazil" },
  { value: "ZA", label: "South Africa" },
  { value: "JP", label: "Japan" },
];

const Profile = () => {
  const navigate = useNavigate();
  const [profileInfo, setProfileInfo] = useState({
    name: "",
    email: "",
    country: "",
    state: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [edit, setEdit] = useState(false);

  const fetchProfileInfo = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/customer/profile",
        { withCredentials: true }
      );

      if (response.status === 200) {
        setProfileInfo(response.data); // Update the profile with the fetched data
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("You are not authenticated. Please log in.");
        navigate("/customerlogin");
      } else {
        setError("Failed to fetch profile information.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileInfo(); // Fetch profile when component mounts
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileChange = async (e) => {
    e.preventDefault();

    const profileData = {
      name: profileInfo.name,
      country: profileInfo.country,
      state: profileInfo.state,
    };

    console.log("Profile data being sent:", profileData);

    try {
      console.log("Sending profile update request...");

      const response = await axios.put(
        "http://localhost:3000/customer/profile",
        profileData, // Send data as JSON
        {
          withCredentials: true, // Ensure credentials are sent
          headers: {
            "Content-Type": "application/json", // Make sure we're sending JSON data
          },
        }
      );

      console.log("Profile update response:", response.data);
      if (response.status === 200) {
        // Refetch the updated profile after saving changes
        fetchProfileInfo(); // This will fetch the updated profile data
        setEdit(false); // Exit edit mode here
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      if (err.response && err.response.status === 401) {
        setError("You are not authenticated. Please log in.");
        navigate("/customerlogin");
      } else {
        setError("Failed to update profile. Please try again later.");
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="p-4 w-50 rounded">
        <h1 className="text-center mb-4">Profile</h1>
        {error && <div className="alert alert-danger">{error}</div>}

        {!edit ? (
          // View Mode
          <div className="text-center">
            <img
              src={profileInfo.profile_picture || "/profileInfo.jpg"}
              alt="Profile"
              className="rounded-circle mb-3"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
            <p>Name: {profileInfo.name}</p>
            <p>Email: {profileInfo.email}</p>
            <p>
              Country:{" "}
              {countries.find((c) => c.value === profileInfo.country)?.label}
            </p>
            <p>State: {profileInfo.state}</p>
            <button
              className="btn btn-primary mt-3"
              onClick={() => setEdit(true)}
            >
              Edit Profile
            </button>
          </div>
        ) : (
          // Edit Mode
          <form onSubmit={handleProfileChange}>
            <div className="mb-3">
              <input
                type="text"
                name="name"
                value={profileInfo.name}
                onChange={handleChange}
                className="form-control"
                placeholder="Full Name"
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                name="email"
                value={profileInfo.email}
                onChange={handleChange}
                className="form-control"
                placeholder="Email"
              />
            </div>
            <div className="mb-3">
              <select
                value={profileInfo.country}
                onChange={handleChange}
                name="country"
                className="form-control"
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.value} value={country.value}>
                    {country.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={profileInfo.state}
                name="state"
                onChange={handleChange}
                maxLength="2"
                className="form-control"
                placeholder="State (e.g., CA, NY)"
              />
            </div>
            <button type="submit" className="btn btn-success w-100">
              Save Changes
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
