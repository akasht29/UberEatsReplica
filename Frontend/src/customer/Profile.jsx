import React from "react";

const Profile = () => {
  return (
    <>
      <div>
        <h1>Profile</h1>
        <form>
          <input type="text" name="name" placeholder="Name" />
          <input type="email" name="email" placeholder="Email" />
          <select name="country">
            <option value="">Select Country</option>
            <option value="US">United States</option>
          </select>
          <select name="state">
            <option value="">Select State</option>
            <option value="CA">CA</option>
          </select>
          <input type="file" name="picture" placeholder="Profile Picture" />
          <button>Update Profile</button>
        </form>
      </div>
    </>
  );
};

export default Profile;
