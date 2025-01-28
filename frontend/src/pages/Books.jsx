import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// change this URL to where your backend is running
const URL = "http://localhost:8080";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get(`${URL}/books`);
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${URL}/books/${id}`);
      // we need to reload the page after deleting
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Book Shop</h1>
      <div className="books">
        {books.map((book) => (
          <div className="book" key={book.id}>
            {book.cover && <img src={book.cover} />}
            <h2>{book.title}</h2>
            <p>{book.about}</p>
            <span>{book.price}</span>
            <button className="delete" onClick={() => handleDelete(book.id)}>
              Delete
            </button>
            <button className="update"><Link to={`/update/${book.id}`}>Update</Link></button>
          </div>
        ))}
      </div>
      <button>
        <Link to="/add">Add new Book</Link>
      </button>
    </div>
  );
};

export default Books;
