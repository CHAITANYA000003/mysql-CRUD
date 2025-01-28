import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const URL = "http://localhost:8080";

const Add = () => {
  const [book, setBook] = useState({
    title: "",
    about: "",
    price: null,
    cover: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${URL}/books`, book);
      //   we want to navigate back to the home page once the button is clicked, we do this using the useNavigate of react-router-dom
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="form">
      <h1>Add New Book</h1>
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
      <button className="formButton" onClick={handleClick}>Add</button>
    </div>
  );
};

export default Add;
