import {useEffect, useState} from "react";
import {useNavigate, Link} from "@tanstack/react-router";

import {useUser} from "./UserContext";
import {getFollowedAnnouncements} from "./firebaseUtils";

import ClipLoader from "react-spinners/ClipLoader";

function Account() {
    const {user, loading} = useUser();
    const navigate = useNavigate();
    const [announcementDetails, setAnnouncementDetails] = useState([]);

    useEffect(() => {
        if (!loading && !user) {
            navigate({to: "/login"});
        }
    }, [loading, user, navigate]);

    useEffect(() => {
        if (user) {
            const fetchFollowedAnnouncements = async () => {
                try {
                    const announcementIds = await getFollowedAnnouncements();
                    const details = await Promise.all(
                        announcementIds.map(async (id) => {
                            const response = await fetch(`http://localhost:3000/ogloszenia/${id}`);
                            if (!response.ok) {
                                throw new Error(`Nie znaleziono ogłoszenia o id: ${id}`);
                            }
                            return response.json();
                        })
                    );
                    setAnnouncementDetails(details);
                } catch (error) {
                    console.error("Błąd podczas pobierania obserwowanych ogłoszeń:", error);
                }
            };

            fetchFollowedAnnouncements();
        }
    }, [user]);

    if (loading) {
        return (
            <div style={{display: "flex", justifyContent: "center", margin: "50px"}}>
                <ClipLoader color={"purple"} size={50}/>
            </div>
        );
    }

    return (
        <div>
            <h2>Twoje konto</h2>
            <h3>Obserwowane ogłoszenia:</h3>
            <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
                justifyContent: "center",
                marginTop: "20px"
            }}>
                {announcementDetails.length > 0 ? announcementDetails.map((announcement) => (
                    <div key={announcement.id} className="card"
                         style={{width: "300px", height: "400px", overflow: "hidden", margin: "10px"}}>
                        <div style={{height: "200px", overflow: "hidden"}}>
                            <img
                                src={announcement.photos[0]}
                                className="card-img-top"
                                alt={announcement.title}
                                style={{width: "100%", height: "100%", objectFit: "cover"}}
                            />
                        </div>
                        <div className="card-body" style={{
                            height: "200px",
                            overflow: "hidden",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between"
                        }}>
                            <div>
                                <h5 className="card-title">{announcement.title}</h5>
                                <p className="card-text" style={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    display: "-webkit-box",
                                    WebkitLineClamp: "3",
                                    WebkitBoxOrient: "vertical"
                                }}>{announcement.desc}</p>
                            </div>
                            <Link to={`/posts/${announcement.id}`} className="btn btn-primary mt-2">
                                Zobacz ogłoszenie
                            </Link>
                        </div>
                    </div>
                )) : (
                    <p>Nie obserwujesz jeszcze żadnych ogłoszeń.</p>
                )}
            </div>
        </div>
    );
}

export default Account;