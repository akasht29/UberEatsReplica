import React from "react";

const RestaurantCard = ({
  restaurant_name,
  email,
  location,
  description,
  contact_info,
  images,
  timings,
}) => {
  return (
    <div className="card mb-4 shadow-sm">
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={images ? `http://localhost:3000${images}` : "/restaurant.jpg"}
            alt="Profile"
            className="mb-3"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{restaurant_name}</h5>
            <p className="card-text">{description}</p>

            <div className="d-flex justify-content-between mb-2">
              <p className="card-text">Location:{location}</p>
              <p className="card-text">Contact: {contact_info}</p>
              <p className="card-text">Hours: {timings}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
