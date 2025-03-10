import React, {useState} from "react";
import { createId } from '@paralleldrive/cuid2';
import "bootstrap/dist/css/bootstrap.css"

var ogloszenia = [
  {
    id: createId(),
    title: "KK",
    desc: "Sprzedam skode octavie, nienawidze tego syfu doplace za wziecie tego ode mnie"
  }
]



export function addAnnouncment(title, desc) {
  ogloszenia.push({
    id: createId(),
    title: title,
    desc: desc
  })
}

function Announcement() {

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Ogłoszenia</h2>
      <div style={flexContainer}>
        {ogloszenia.map((ogloszenie) => (
          <div key={ogloszenie.id} className="card" style={cardStyle}>
            <div className="card-body">
              <h5 className="card-title">{ogloszenie.title}</h5>
              <p className="card-text">{ogloszenie.desc}</p>
              <a href="#" className="btn btn-primary">
                Zobacz więcej
              </a>
            </div>
          </div>
        ))}
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
};

const flexContainer = {
  display: "flex",
  flexWrap: "wrap", 
  gap: "20px"
};

const cardStyle = {
  width: "300px", 
  padding: "15px",
  color: "black",
  borderRadius: "8px",
  backgroundColor: "#fff",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
};

export default Announcement;
