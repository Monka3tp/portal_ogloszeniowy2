import React, { useState, useEffect } from "react";
import { createId } from '@paralleldrive/cuid2';
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "@tanstack/react-router";


var ogloszenia = [];

export function addAnnouncment(title, desc, price, photo) {
  ogloszenia.push({
    id: createId(),
    title: title,
    desc: desc,
    price: price,
    photo: photo,

  });
}

export function Announcement() {
  const [ogloszenia, setOgloszenia] = useState([]);
  const [observedAnnouncements, setObservedAnnouncements] = useState({});


  useEffect(() => {
    fetch(`http://localhost:3000/ogloszenia`)
        .then(response => response.json())
        .then(data => setOgloszenia(data))
        .catch(err => console.error(err));
  }, []);

  const handleObserve = (id) => {
    const updatedObservations = {
      ...observedAnnouncements,
      [id]: !observedAnnouncements[id],
    };


    localStorage.setItem("observedAnnouncements", JSON.stringify(updatedObservations));
    setObservedAnnouncements(updatedObservations);
  };

  return (
      <div style={containerStyle}>
        <h2 style={titleStyle}>Ogłoszenia</h2>
        <div style={flexContainer}>
          {ogloszenia.map((ogloszenie) => {
            const isObserved = observedAnnouncements[ogloszenie.id];

            return (
                <div key={ogloszenie.id} className="card" style={cardStyle}>
                  <img src={ogloszenie.photos[0]} className="card-img-top" alt={ogloszenie.title} />
                  <div className="card-body">
                    <h5 className="card-title">{ogloszenie.title}</h5>
                    <p className="card-text">{ogloszenie.desc}</p>
                    <Link to={`/posts/${ogloszenie.id}`} className="btn btn-primary">
                      Zobacz więcej
                    </Link>
                  </div>
                  <button
                      onClick={() => handleObserve(ogloszenie.id)}
                      style={{
                        backgroundColor: isObserved ? "gray" : "whitesmoke",
                        color: "black",
                        border: "none",
                        padding: "10px 20px",
                        cursor: "pointer",
                        borderRadius: "5px",
                      }}
                  >
                    {isObserved ? "Obserwujesz" : "Obserwuj"}
                  </button>
                  <div className="card-footer">{ogloszenie.free ? "Za Darmo" : ogloszenie.price}{ogloszenie.to_negotiation ? " | Do Negocjacji" : ""}</div>
                </div>
            );
          })}
        </div>
      </div>
  );
}

const containerStyle = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const titleStyle = {
  textAlign: "center",
  marginBottom: "20px",
  color: "black",
  fontSize: "24px",
  padding: "20px",
};

const flexContainer = {
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
  justifyContent: "center",
  width: "1500px",
};

const cardStyle = {
  width: "300px",
  padding: "15px 0px",
  color: "black",
  borderRadius: "8px",
  backgroundColor: "#fff",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
};

export default Announcement;
