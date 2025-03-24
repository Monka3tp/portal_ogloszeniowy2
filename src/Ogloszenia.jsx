import React, { useState, useEffect } from "react";
import { createId } from '@paralleldrive/cuid2';
import "bootstrap/dist/css/bootstrap.css";

var ogloszenia = [
  {
    id: createId(),
    title: "Sprzedam rower",
    desc: "Sprzedam używany rower górski, stan dobry, mało używany. Cena do negocjacji.",
    price: "do negocjacji",
    photo: "https://www.tabou.pl/wp-content/uploads/2023/05/Rower-elektryczny-TABOU-KINETIC-UP-1.0-W-2023_43246.jpg"
  },
  {
    id: createId(),
    title: "Wynajmę mieszkanie",
    desc: "Wynajmę kawalerkę w centrum miasta. Mieszkanie umeblowane, idealne dla singla lub pary.",
    price: "1000 zł/miesiąc",
    photo: "https://i.st-nieruchomosci-online.pl/gdtf4px/mieszkanie-poznan-wynajem.jpg"
  },
  {
    id: createId(),
    title: "Zatrudnię programistę",
    desc: "Szukamy programisty JavaScript do pracy zdalnej. Wymagana dobra znajomość React i Node.js.",
    price: "do uzgodnienia",
    photo: "https://psr.gda.pl/wp-content/uploads/2020/06/programmer-scaled.jpg"
  },
  {
    id: createId(),
    title: "Kupię telefon",
    desc: "Kupię używany telefon, najlepiej iPhone 12 lub nowszy, stan dobry, cena do uzgodnienia.",
    price: "do uzgodnienia",
    photo: "https://th.bing.com/th/id/OIP.3Vi0XbNqFIY9f-FiYP8kzgHaHa?rs=1&pid=ImgDetMain"
  },
  {
    id: createId(),
    title: "Sprzedam książki",
    desc: "Sprzedam książki do nauki języka angielskiego. Stan bardzo dobry, ceny przystępne.",
    price: "10-30 zł",
    photo: "https://sklep.magnapolonia.org/wp-content/uploads/2022/11/dcb52ce41128c7-atlas-grzybow-400x576.jpeg"
  },
  {
    id: createId(),
    title: "Oddam za darmo",
    desc: "Oddam za darmo stare meble: stół, krzesła i szafa. Do odbioru w Warszawie.",
    price: "0 zł",
    photo: "https://th.bing.com/th/id/OIP.WOZw0hxfNUPe6n4b2BsNBwHaFj?rs=1&pid=ImgDetMain"
  },
  {
    id: createId(),
    title: "Naprawa komputerów",
    desc: "Naprawiam komputery stacjonarne i laptopy. Szybka naprawa, przystępne ceny.",
    price: "od 50 zł",
    photo: "https://d-gr.cdngr.pl/kadry/k/r/gr-ogl/30/1b/28404397_769952175_komputer-stacjonarny-z-monitorem-i-wifi-do-szkoly_xlarge.jpg"
  },
  {
    id: createId(),
    title: "Sprzedam grilla",
    desc: "Sprzedam grill węglowy, prawie nieużywany. Idealny na letnie spotkania. Cena 150 zł.",
    price: "150 zł",
    photo: "https://th.bing.com/th/id/OIP.vYUpm5Me_4c8EQBjamjCogHaFj?rs=1&pid=ImgDetMain"
  }
];

export function addAnnouncment(title, desc, price, photo) {
  ogloszenia.push({
    id: createId(),
    title: title,
    desc: desc,
    price: price,
    photo: photo,

  });
}

function Announcement() {
  const [observedAnnouncements, setObservedAnnouncements] = useState({});
  const [ogloszenia, setOgloszenia] = useState([]);


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
                  <img src={ogloszenie.photo} className="card-img-top" alt={ogloszenie.title} />
                  <div className="card-body">
                    <h5 className="card-title">{ogloszenie.title}</h5>
                    <p className="card-text">{ogloszenie.desc}</p>
                    <a href="#" className="btn btn-primary">
                      Zobacz więcej
                    </a>
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
