import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomerLogin from "./customer/Login";
import CustomerSignUp from "./customer/SignUp";
import CustomerProfile from "./customer/Profile";
import Dashboard from "./customer/Dashboard";
import Favorites from "./customer/Favorites";
import ResturantProfile from "./resturant/Profile";
import ResturantSignUp from "./resturant/SignUp";
import ResturantLogin from "./resturant/Login";
import Orders from "./resturant/Login";
//import Home from "./components/Home/Home";
import CreateBook from "./components/Create/Create";
import UpdateBook from "./components/Update/Update";
import DeleteBook from "./components/Delete/Delete";

const App = () => {
  const [books, setBooks] = useState([
    { id: 1, title: "Title 1:", author: "Parth Marathe" },
    { id: 2, title: "Title 2", author: "John Doe" },
    { id: 3, title: "Title 3", author: "Jane Smith" },
  ]);

  const addBook = (title, author) => {
    const newBook = { id: books.length + 1, title, author };
    setBooks([...books, newBook]);
  };

  const updateBook = (id, newTitle, newAuthor) => {
    setBooks(
      books.map((book) =>
        book.id === id ? { ...book, title: newTitle, author: newAuthor } : book
      )
    );
  };

  const deleteBook = (id) => {
    setBooks((prevBooks) =>
      prevBooks
        .filter((book) => book.id !== id)
        .map((book, index) => ({ ...book, id: index + 1 }))
    );
  };

  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home books={books} />} /> */}
        <Route path="/" element={<CustomerLogin />} />
        <Route path="/create" element={<CreateBook addBook={addBook} />} />
        <Route
          path="/update"
          element={<UpdateBook updateBook={updateBook} />}
        />
        <Route
          path="/delete"
          element={<DeleteBook deleteBook={deleteBook} />}
        />
        {/* <Route path="/customerlogin" element={<CustomerLogin />} /> */}
        <Route path="/resturantlogin" element={<ResturantLogin />} />
        <Route path="/customersignup" element={<CustomerSignUp />} />
        <Route path="/resturantsignup" element={<ResturantSignUp />} />
        <Route path="/customerprofile" element={<CustomerProfile />} />
        <Route path="/resturantprofile" element={<ResturantProfile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
  );
};

export default App;
