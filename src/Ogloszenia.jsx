import React from "react";

function Announcement() {
  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Ogłoszenia</h2>
      <div style={flexContainer}>
        {/* Przykładowe ogłoszenia */}
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="card" style={cardStyle}>
            <div className="card-body">
              <h5 className="card-title">Ogłoszenie {index + 1}</h5>
              <p className="card-text">Opis ogłoszenia...</p>
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
  color: "white",
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
