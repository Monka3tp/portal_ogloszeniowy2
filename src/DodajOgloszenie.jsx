import React, { useState } from "react";
import {addAnnouncment} from "./Ogloszenia.jsx";
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.js"
import {Link} from "@tanstack/react-router";
import "./App.css"

function AddAnnouncement() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [alertHidden, setAlertHidden] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    addAnnouncment(title, description);
    setTitle("");
    setDescription("");
    setAlertHidden(false);

  };

  return (
    <div style={{width:'100%'}}>
      <div style={{width:"410px"}} className="alert alert-success" role="alert" hidden={alertHidden}>Pomyślnie dodano ogłoszenie! <Link to="/posts" style={linkStyle}>
        Przejdz do ogłoszeń
      </Link></div>
      <h2>Dodaj Ogłoszenie</h2>
      <form onSubmit={handleSubmit} style={{display: "flex", justifyContent: "space-between", alignItems: "center", justifyItems: "center", flexDirection: "column"}}>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="title-input">Tytuł:</label>
          <input
              id="title-input"
              className="ogloszenie-input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ display: "block", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="description-input">Opis:</label>
          <textarea
              id="description-input"
              className="ogloszenie-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{ display: "block", padding: "8px" }}
          ></textarea>
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
