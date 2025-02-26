import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/CustomerLogin";
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
        <Route path="/" element={<Home books={books} />} />
        <Route path="/create" element={<CreateBook addBook={addBook} />} />
        <Route
          path="/update"
          element={<UpdateBook updateBook={updateBook} />}
        />
        <Route
          path="/delete"
          element={<DeleteBook deleteBook={deleteBook} />}
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
