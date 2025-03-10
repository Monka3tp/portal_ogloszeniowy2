import React, {useState} from "react";
import { createId } from '@paralleldrive/cuid2';
import "bootstrap/dist/css/bootstrap.css"

var ogloszenia =[
  {
    id: createId(),
    title: "Sprzedam rower",
    desc: "Sprzedam używany rower górski, stan dobry, mało używany. Cena do negocjacji.",
    price: "do negocjacji"
  },
  {
    id: createId(),
    title: "Wynajmę mieszkanie",
    desc: "Wynajmę kawalerkę w centrum miasta. Mieszkanie umeblowane, idealne dla singla lub pary.",
    price: "1000 zł/miesiąc"  // Example price
  },
  {
    id: createId(),
    title: "Zatrudnię programistę",
    desc: "Szukamy programisty JavaScript do pracy zdalnej. Wymagana dobra znajomość React i Node.js.",
    price: "do uzgodnienia"
  },
  {
    id: createId(),
    title: "Kupię telefon",
    desc: "Kupię używany telefon, najlepiej iPhone 12 lub nowszy, stan dobry, cena do uzgodnienia.",
    price: "do uzgodnienia"
  },
  {
    id: createId(),
    title: "Sprzedam książki",
    desc: "Sprzedam książki do nauki języka angielskiego. Stan bardzo dobry, ceny przystępne.",
    price: "10-30 zł"  // Example price range
  },
  {
    id: createId(),
    title: "Oddam za darmo",
    desc: "Oddam za darmo stare meble: stół, krzesła i szafa. Do odbioru w Warszawie.",
    price: "0 zł"
  },
  {
    id: createId(),
    title: "Naprawa komputerów",
    desc: "Naprawiam komputery stacjonarne i laptopy. Szybka naprawa, przystępne ceny.",
    price: "od 50 zł"
  },
  {
    id: createId(),
    title: "Sprzedam grilla",
    desc: "Sprzedam grill węglowy, prawie nieużywany. Idealny na letnie spotkania. Cena 150 zł.",
    price: "150 zł"
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
            <img src={ogloszenie.photo} className="card-img-top" alt={ogloszenie.title} />
            <div className="card-body">
              <h5 className="card-title">{ogloszenie.title}</h5>
              <p className="card-text">{ogloszenie.desc}</p>
              <a href="#" className="btn btn-primary">
                Zobacz więcej
              </a>
            </div>
            <div className="card-footer">{ogloszenie.price}</div>
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
