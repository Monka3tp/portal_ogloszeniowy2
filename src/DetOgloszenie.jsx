import { useState, useEffect } from "react";
import { useParams } from "@tanstack/react-router";
import "./DetOgloszenie.css";

export default function DetailedAnnouncement() {
    const params = useParams({ from: '/posts/$id' });
    const id = params.id;
  const [ogloszenie, setOgloszenie] = useState(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3000/ogloszenia/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Nie znaleziono ogłoszenia');
        }
        return response.json();
      })
      .then(data => {
        setOgloszenie(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Błąd podczas pobierania danych:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  const nextPhoto = () => {
    if (ogloszenie && ogloszenie.photos) {
      setCurrentPhotoIndex((prevIndex) =>
        prevIndex === ogloszenie.photos.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevPhoto = () => {
    if (ogloszenie && ogloszenie.photos) {
      setCurrentPhotoIndex((prevIndex) =>
        prevIndex === 0 ? ogloszenie.photos.length - 1 : prevIndex - 1
      );
    }
  };

  if (loading) {
    return <div className="loading">Ładowanie ogłoszenia...</div>;
  }

  if (error) {
    return <div className="error-message">Błąd: {error}</div>;
  }

  if (!ogloszenie) {
    return <div className="not-found">Nie znaleziono ogłoszenia</div>;
  }

  return (
    <div className="detailed-announcement">
      <div className="photo-carousel">
        <button className="carousel-btn prev" onClick={prevPhoto}>&#10094;</button>
        <div className="photo-container">
          <img
            src={ogloszenie.photos[currentPhotoIndex]}
            alt={`Zdjęcie ${currentPhotoIndex + 1} do ogłoszenia ${ogloszenie.title}`}
          />
          <div className="photo-counter">
            {currentPhotoIndex + 1} / {ogloszenie.photos.length}
          </div>
        </div>
        <button className="carousel-btn next" onClick={nextPhoto}>&#10095;</button>
      </div>

      <div className="announcement-details">
        <h1>{ogloszenie.title}</h1>
        <div className="price-section">
          {ogloszenie.free ? (
            <span className="free-tag">Za darmo</span>
          ) : (
            <p className="price">
              Cena: <strong>{ogloszenie.price}</strong>
              {ogloszenie.to_negotiation && <span className="negotiation-tag"> (do negocjacji)</span>}
            </p>
          )}
        </div>

        <div className="description">
          <h2>Opis</h2>
          <p>{ogloszenie.desc}</p>
        </div>

        {ogloszenie.category && (
          <div className="category">
            <p>Kategoria: <span>{ogloszenie.category}</span></p>
          </div>
        )}

        <div className="contact-section">
          <button className="contact-btn">Kontakt z ogłoszeniodawcą</button>
        </div>
      </div>
    </div>
  );
}