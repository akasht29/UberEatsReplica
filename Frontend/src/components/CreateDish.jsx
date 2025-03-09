// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { addDish } from "../../redux/actions/dishActions";
// import "bootstrap/dist/css/bootstrap.min.css";

// const CreateDish = () => {
// const [dish, setDish] = useState({
//   id: 0,
//   name: "John Doe",
//   ingredients: [],
//   image: null,
//   price: 0,
//   description: "",
//   category: "",
// });
//   const dispatch = useDispatch();

//   const navigate = useNavigate();

//   const dishCreate = useSelector((state) => state.dishCreate);
//   const { loading, error } = dishCreate;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await dispatch(addDish({ title, author }));
//     navigate("/"); // Redirect to Home
//   };

//   return (
//     <div className="container mt-4">
//       <h2 className="text-center">Add New Dish</h2>
//       {loading && <p className="text-center text-primary">Loading...</p>}
//       {error && <p className="text-center text-danger">{error}</p>}
//       <form onSubmit={handleSubmit} className="w-50 mx-auto">
//         <div className="mb-3">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Enter Dish Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Enter Author Name"
//             value={author}
//             onChange={(e) => setAuthor(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-success w-100">
//           Add Dish
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateDish;
