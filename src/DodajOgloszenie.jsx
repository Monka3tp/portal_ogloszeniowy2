import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { addAnnouncment } from "./Ogloszenia.jsx";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { Link } from "@tanstack/react-router";
import "./App.css";

function AddAnnouncement() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [alertHidden, setAlertHidden] = useState(true);
  const [toNegotiation, setToNegotiation] = useState(false);
  const [free, setFree] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!recaptchaToken) {
      alert("Proszę zweryfikować reCAPTCHA");
      return;
    }
    fetch(`http://localhost:3000/ogloszenia`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        desc: description,
        price: free ? 0 : price,
        photo: image ? URL.createObjectURL(image) : "",
        to_negotiation: free ? false : toNegotiation,
        free: free,
        recaptchaToken
      })
    })
        .then(() => {
          setTitle("");
          setDescription("");
          setImage("");
          setPrice("");
          setToNegotiation(false);
          setFree(false);
          setAlertHidden(false);
        })
        .catch((err) => console.error(err));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  return (
      <div style={{ width: "100%" }}>
        <div
            style={{ width: "410px" }}
            className="alert alert-success"
            role="alert"
            hidden={alertHidden}
        >
          Pomyślnie dodano ogłoszenie!{" "}
          <Link to="/posts" style={linkStyle}>
            Przejdź do ogłoszeń
          </Link>
        </div>
        <h2>Dodaj Ogłoszenie</h2>
        <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              justifyItems: "center",
              flexDirection: "column"
            }}
        >
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
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="image-input">Wybierz zdjęcie:</label>
            <input
                id="image-input"
                className="ogloszenie-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
                style={{ display: "block", padding: "8px" }}
            />
          </div>
          <div style={{ marginBottom: "10px", display: "flex" }}>
            <label htmlFor="price-input">Cena:</label>
            <input
                id="price-input"
                className="ogloszenie-input"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                disabled={free ? "disabled" : ""}
                style={{ display: "block", padding: "8px" }}
            ></input>
            <input
                id="free-input"
                className="ogloszenie-input"
                type="checkbox"
                checked={free}
                onChange={(e) => setFree(e.target.checked)}
                style={{ display: "block", padding: "8px" }}
            ></input>
            <label htmlFor="free-input">Za darmo</label>
          </div>
          <div style={{ marginBottom: "10px", display: "flex" }}>
            <input
                id="negotiation-input"
                className="ogloszenie-input"
                type="checkbox"
                checked={toNegotiation}
                disabled={free ? "disabled" : ""}
                onChange={(e) => setToNegotiation(e.target.checked)}
                style={{ display: "block", padding: "8px" }}
            ></input>
            <label htmlFor="negotiation-input">Do negocjacji</label>
          </div>
          <ReCAPTCHA
              sitekey="6LcoNAUrAAAAAPbYVsUVAs8dy85BkGmSldiT7l7U"
              onChange={(token) => setRecaptchaToken(token)}
          />
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
  fontWeight: "bold"
};

export default AddAnnouncement;