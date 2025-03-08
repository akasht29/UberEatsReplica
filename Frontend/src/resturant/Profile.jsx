import React, { useState } from "react";

const Profile = () => {
  const [edit, setEdit] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phoneNum: "phoneNum",
    location: "location",
    description: "description",
    hours: "hours",
    picture: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfile((prev) => ({ ...prev, picture: file }));
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
                profile.picture
                  ? URL.createObjectURL(profile.picture)
                  : "/profile.jpg"
              }
              alt="Profile"
              className="rounded-circle mb-3"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
            <p>Name: {profile.name}</p>
            <p>Email: {profile.email}</p>
            <p>Phone Number:{profile.phoneNum}</p>
            <p>Location: {profile.location}</p>
            <p>Description: {profile.description}</p>
            <p>Hours: {profile.hours}</p>
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
                placeholder="Resturant Name"
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
              <input
                type="text"
                name="phoneNum"
                value={profile.phoneNum}
                onChange={handleChange}
                className="form-control"
                placeholder="phoneNum"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="location"
                value={profile.location}
                onChange={handleChange}
                className="form-control"
                placeholder="location"
              />
            </div>{" "}
            <div className="mb-3">
              <input
                type="text"
                name="description"
                value={profile.description}
                onChange={handleChange}
                className="form-control"
                placeholder="description"
              />
            </div>{" "}
            <div className="mb-3">
              <input
                type="text"
                name="hours"
                value={profile.hours}
                onChange={handleChange}
                className="form-control"
                placeholder="hours"
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
