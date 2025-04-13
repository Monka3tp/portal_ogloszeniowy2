import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { Link } from "@tanstack/react-router";
import "./App.css";
import { createId } from '@paralleldrive/cuid2';

function AddAnnouncement() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [price, setPrice] = useState("");
  const [alertHidden, setAlertHidden] = useState(true);
  const [toNegotiation, setToNegotiation] = useState(false);
  const [free, setFree] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


const handleSubmit = async (e) => {
  e.preventDefault();
  if (!recaptchaToken) {
    alert("Proszę zweryfikować reCAPTCHA");
    return;
  }

  setIsLoading(true);

  try {
    const uploadFormData = new FormData();
    images.forEach(image => {
      uploadFormData.append("photos", image);
    });

    const uploadResponse = await fetch("/api/upload", {
      method: "POST",
      body: uploadFormData
    });

    if (!uploadResponse.ok) {
      throw new Error(`Błąd podczas przesyłania zdjęć: ${uploadResponse.status}`);
    }

    const uploadResult = await uploadResponse.json();
    console.log("Odpowiedź z serwera:", uploadResult);

    const photoUrls = uploadResult.fileUrls;

    const announcement = {
      id: createId(),
      title: title,
      desc: description,
      price: free ? 0 : price,
      photos: photoUrls,
      to_negotiation: free ? false : toNegotiation,
      free: free
    };

    const addResponse = await fetch("http://localhost:3000/ogloszenia", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(announcement)
    });

    if (!addResponse.ok) {
      throw new Error(`Błąd podczas dodawania ogłoszenia: ${addResponse.status}`);
    }

    setTitle("");
    setDescription("");
    setImages([]);
    setImageUrls([]);
    setPrice("");
    setToNegotiation(false);
    setFree(false);
    setAlertHidden(false);
  } catch (error) {
    console.error("Błąd:", error);
    alert(`Wystąpił błąd podczas dodawania ogłoszenia: ${error.message}`);
  } finally {
    setIsLoading(false);
  }
};
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const newImageUrls = files.map(file => URL.createObjectURL(file));
    setImageUrls(newImageUrls);
  };

  React.useEffect(() => {
    return () => {
      imageUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [imageUrls]);

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
          <label htmlFor="photos">Wybierz zdjęcia:</label>
          <input
            id="photos"
            className="ogloszenie-input"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            multiple
            required
            style={{ display: "block", padding: "8px" }}
          />
          {imageUrls.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "10px" }}>
              {imageUrls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Podgląd ${index}`}
                  style={{ width: "100px", height: "100px", objectFit: "cover" }}
                />
              ))}
            </div>
          )}
        </div>
        <div style={{ marginBottom: "10px", display: "flex" }}>
          <label htmlFor="price-input">Cena:</label>
          <input
            id="price-input"
            className="ogloszenie-input"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required={!free}
            disabled={free}
            style={{ display: "block", padding: "8px" }}
          />
          <input
            id="free-input"
            className="ogloszenie-input"
            type="checkbox"
            checked={free}
            onChange={(e) => setFree(e.target.checked)}
            style={{ display: "block", padding: "8px" }}
          />
          <label htmlFor="free-input">Za darmo</label>
        </div>
        <div style={{ marginBottom: "10px", display: "flex" }}>
          <input
            id="negotiation-input"
            className="ogloszenie-input"
            type="checkbox"
            checked={toNegotiation}
            disabled={free}
            onChange={(e) => setToNegotiation(e.target.checked)}
            style={{ display: "block", padding: "8px" }}
          />
          <label htmlFor="negotiation-input">Do negocjacji</label>
        </div>
        <ReCAPTCHA
          sitekey="6LcoNAUrAAAAAPbYVsUVAs8dy85BkGmSldiT7l7U"
          onChange={(token) => setRecaptchaToken(token)}
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isLoading}
        >
          {isLoading ? "Dodawanie..." : "Dodaj"}
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