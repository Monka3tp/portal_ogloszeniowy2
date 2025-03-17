import React, { useState } from "react";
import {addAnnouncment} from "./Ogloszenia.jsx";
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.js"
import {Link} from "@tanstack/react-router";
import "./App.css"

function AddAnnouncement() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [alertHidden, setAlertHidden] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (image) {
      const imageUrl = URL.createObjectURL(image);
      addAnnouncment(title, description, price, imageUrl);
    } else {
      addAnnouncment(title, description, "");
    }
    setTitle("");
    setDescription("");
    setImage("");
    setPrice("");
    setAlertHidden(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <div style={{width:'100%'}}>
      <div style={{width:"410px"}} className="alert alert-success" role="alert" hidden={alertHidden}>Pomyślnie dodano ogłoszenie! <Link to="/posts" style={linkStyle}>
        Przejdz do ogłoszeń
      </Link></div>
      <h2>Dodaj Ogłoszenie</h2>
      <form onSubmit={handleSubmit} style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        justifyItems: "center",
        flexDirection: "column"
      }}>
        <div style={{marginBottom: "10px"}}>
          <label htmlFor="title-input">Tytuł:</label>
          <input
              id="title-input"
              className="ogloszenie-input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{display: "block", padding: "8px"}}
          />
        </div>
        <div style={{marginBottom: "10px"}}>
          <label htmlFor="description-input">Opis:</label>
          <textarea
              id="description-input"
              className="ogloszenie-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              style={{display: "block", padding: "8px"}}
          ></textarea>
        </div>
        <div style={{marginBottom: "10px"}}>
          <label htmlFor="image-input">Wybierz zdjęcie:</label>
          <input
              id="image-input"
              className="ogloszenie-input"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
              style={{display: "block", padding: "8px"}}
          />
        </div>
        <div style={{marginBottom: "10px"}}>
          <label htmlFor="price-input">Cena:</label>
          <input
              id="price-input"
              className="ogloszenie-input"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              style={{display: "block", padding: "8px"}}
          ></input>
        </div>
        <button type="submit" className="btn btn-primary">
          Dodaj
        </button>
      </form>

    </div>
  );
}

const linkStyle = {
  color: "blue",
  textDecoration: "none",
  fontSize: "16px",
  fontWeight: "bold",

};

export default AddAnnouncement;
