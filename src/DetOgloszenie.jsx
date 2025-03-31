import React from "react";
import { useState } from "react";
import ogloszenia from "./DodajOgloszenie.jsx";

function DetailedAnnouncement() {
    const [ogloszenie, setOgloszenie] = useState({});

    return (
        <div style={containerStyle}>
        <h2 style={titleStyle}>{ogloszenie.title}</h2>
        <img src={ogloszenie.photo} alt={ogloszenie.title} style={imageStyle} />
        <p style={descStyle}>{ogloszenie.desc}</p>
        <p style={priceStyle}>Cena: {ogloszenie.price}</p>
        </div>
    );
}