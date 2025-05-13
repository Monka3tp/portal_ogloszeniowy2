import {useState, useEffect} from "react";
import {Link, useNavigate} from "@tanstack/react-router";
import {followAnnouncement, getFollowedAnnouncements} from "./firebaseUtils.js";
import {useUser} from "./UserContext.jsx";

import ClipLoader from "react-spinners/ClipLoader";
import "bootstrap/dist/css/bootstrap.css";
import "./ButtonAnimation.css";


export function Announcement() {
    const {user, loading} = useUser();
    const navigate = useNavigate();
    const [ogloszenia, setOgloszenia] = useState([]);
    const [observedAnnouncements, setObservedAnnouncements] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:3000/ogloszenia`)
            .then(response => response.json())
            .then(data => {
                setOgloszenia(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
                setIsLoading(false);
            });
    }, []);

    // Get followed announcements from Firebase
    useEffect(() => {
        const fetchObservedAnnouncements = async () => {
            if (user) {
                try {
                    const followedIds = await getFollowedAnnouncements();
                    const observedMap = followedIds.reduce((acc, id) => {
                        acc[id] = true;
                        return acc;
                    }, {});

                    setObservedAnnouncements(observedMap);
                } catch (error) {
                    console.error("Błąd podczas pobierania obserwowanych ogłoszeń:", error);
                }
            }
        };

        if (!loading) {
            fetchObservedAnnouncements();
        }
    }, [user, loading]);

    const handleObserve = async (id) => {
        if (!user) {
            navigate({
                to: "/login",
                search: {
                    redirectReason: "followAnnouncement"
                }
            });
            return;
        }

        try {
            await followAnnouncement(id);
            setObservedAnnouncements(prev => ({
                ...prev,
                [id]: !prev[id]
            }));
        } catch (error) {
            console.error("Błąd podczas obserwowania ogłoszenia:", error);
        }
    };

    if (isLoading) {
        return (
            <div style={{display: "flex", justifyContent: "center", margin: "50px"}}>
                <ClipLoader color={"purple"} size={50}/>
            </div>
        );
    }

    return (
        <div style={containerStyle}>
            <h1 style={titleStyle}>Ogłoszenia</h1>
            <div style={flexContainer}>
                {ogloszenia.map((ogloszenie) => {
                    const isObserved = observedAnnouncements[ogloszenie.id];

                    return (
                        <div key={ogloszenie.id} className="card" style={cardStyle}>
                            <img src={ogloszenie.photos[0]} className="card-img-top" alt={ogloszenie.title}/>
                            <div className="card-body">
                                <h5 className="card-title">{ogloszenie.title}</h5>
                                <p className="card-text">{ogloszenie.desc}</p>
                                <Link to={`/posts/${ogloszenie.id}`} className="btn btn-primary">
                                    Zobacz więcej
                                </Link>
                            </div>
                            <button
                                onClick={() => handleObserve(ogloszenie.id)}
                                className="observe-button"
                                style={{
                                    backgroundColor: isObserved ? "lightgray" : "whitesmoke",
                                    color: "black",
                                    border: "none",
                                    padding: "10px 20px",
                                    cursor: "pointer",
                                    borderRadius: "5px",
                                }}
                            >
                                {isObserved ? "Obserwujesz" : "Obserwuj"}
                            </button>
                            <div
                                className="card-footer">{ogloszenie.free ? "Za Darmo" : ogloszenie.price}{ogloszenie.to_negotiation ? " | Do Negocjacji" : ""}</div>
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
    fontSize: "32px",
    padding: "20px",
    fontWeight: "bold",
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
    padding: "0px 0px",
    color: "black",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    transition: "transform 0.3s, box-shadow 0.3s",
    ":hover": {
        transform: "translateY(-5px)",
        boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.15)"
    }
};

export default Announcement;
