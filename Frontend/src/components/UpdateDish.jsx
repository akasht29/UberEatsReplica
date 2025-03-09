// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getDishDetails, updateDish } from "../../redux/actions/dishActions";
// import "bootstrap/dist/css/bootstrap.min.css";

// const UpdateDish = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const dishDetails = useSelector((state) => state.dishDetails);
//   const { dish, loading, error } = dishDetails;

//   const [id] = useState(location.state?.id || "");
//   const [title, setTitle] = useState("");
//   const [author, setAuthor] = useState("");

//   useEffect(() => {
//     if (id) {
//       dispatch(getDishDetails(id));
//     }
//   }, [dispatch, id]);

//   // Update form when user details are loaded
//   useEffect(() => {
//     if (dish) {
//       setTitle(dish.title);
//       setAuthor(dish.author);
//     }
//   }, [dish]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await dispatch(updateDish(Number(id), { title, author }));
//     navigate("/");
//   };

//   return (
//     <div className="container mt-4">
//       <h2 className="text-center">Update Dish</h2>
//       {loading && <p className="text-center text-primary">Loading...</p>}
//       {error && <p className="text-center text-danger">{error}</p>}

//       <form onSubmit={handleSubmit} className="w-50 mx-auto">
//         <div className="mb-3">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Enter new title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Enter new author"
//             value={author}
//             onChange={(e) => setAuthor(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-warning w-100">
//           Update Dish
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UpdateDish;
