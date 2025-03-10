// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { deleteDish } from "../../redux/actions/dishActions";
// import "bootstrap/dist/css/bootstrap.min.css";

// const DeleteDish = () => {
//   const location = useLocation();
//   const id = location.state?.id || "";
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await dispatch(deleteDish(Number(id)));

//     navigate("/");
//   };

//   return (
//     <div className="container mt-4">
//       <h2 className="text-center">Delete Dish</h2>
//       <form onSubmit={handleSubmit} className="w-50 mx-auto">
//         <button type="submit" className="btn btn-danger w-100">
//           Confirm Delete
//         </button>
//       </form>
//     </div>
//   );
// };

// export default DeleteDish;
