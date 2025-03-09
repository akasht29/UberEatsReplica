import React from "react";

const RestaurantCard = ({
  restaurant_name,
  email,
  location,
  description,
  contactInfo,
  images,
  timings,
}) => {
  return (
    <div className="card mb-4 shadow-sm">
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={images}
            alt={restaurant_name}
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{restaurant_name}</h5>
            <p className="card-text">{description}</p>

            <div className="d-flex justify-content-between mb-2">
              <p className="card-text">Location:{location}</p>
              <p className="card-text">Contact: {contactInfo}</p>
              <p className="card-text">Hours: {timings}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
