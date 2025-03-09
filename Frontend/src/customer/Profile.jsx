import React, { useState } from "react";

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
  const [edit, setEdit] = useState(false);
  const [profile, setProfile] = useState({
    id: 1,
    name: "John Doe",
    email: "jd@test.com",
    profile_picture: null,
    country: "US",
    state: "CA",
  });

  const handleStateChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value.toUpperCase(),
    }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfile((prev) => ({ ...prev, profile_picture: file }));
  };

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="p-4 w-50  rounded ">
        <h1 className="text-center mb-4">Profile</h1>

        {!edit ? (
          // View
          <div className="text-center">
            <img
              src={
                profile.profile_picture
                  ? URL.createObjectURL(profile.profile_picture)
                  : "/profile.jpg"
              }
              alt="Profile"
              className="rounded-circle mb-3"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
            <p>Name: {profile.name}</p>
            <p>Email: {profile.email}</p>
            <p>
              Country:
              {countries.find((c) => c.value === profile.country)?.label}
            </p>
            <p>State: {profile.state}</p>
            <button
              className="btn btn-primary mt-3"
              onClick={() => setEdit(true)}
            >
              Edit Profile
            </button>
          </div>
        ) : (
          // Edit
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setEdit(false);
            }}
          >
            <div className="mb-3">
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="form-control"
                placeholder="Full Name"
              />
            </div>

            <div className="mb-3">
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="form-control"
                placeholder="Email"
              />
            </div>

            <div className="mb-3">
              <select
                value={profile.country}
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
                value={profile.state}
                name="state"
                onChange={handleStateChange}
                maxLength="2"
                className="form-control"
                placeholder="State (e.g., CA, NY)"
              />
            </div>

            <div className="mb-3">
              <input
                type="file"
                onChange={handleFileChange}
                className="form-control"
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
