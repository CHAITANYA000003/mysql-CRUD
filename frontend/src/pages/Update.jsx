import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const URL = "http://localhost:8080";

const Update = () => {
  const [book, setBook] = useState({
    title: "",
    about: "",
    price: null,
    cover: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  //   console.log(location.pathname.split("/")[2]);
  const bookId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${URL}/books/${bookId}`, book);
      //   we want to navigate back to the home page once the button is clicked, we do this using the useNavigate of react-router-dom
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="form">
      <h1>Update the Book</h1>
      <input
        type="text"
        placeholder="title"
        onChange={handleChange}
        name="title"
      />
      <input
        type="text"
        placeholder="about"
        onChange={handleChange}
        name="about"
      />
      <input
        type="number"
        placeholder="price"
        onChange={handleChange}
        name="price"
      />
      <input
        type="text"
        placeholder="cover"
        onChange={handleChange}
        name="cover"
      />
      <button className="formButton" onClick={handleClick}>
        Update
      </button>
    </div>
  );
};

export default Update;
