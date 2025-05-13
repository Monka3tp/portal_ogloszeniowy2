import { Link } from "@tanstack/react-router";
import { useUser } from "./UserContext";
import {toast} from "react-toastify";

function Header() {
    const { user, setUser } = useUser();

    const handleLogout = () => {
        setUser(null);
        toast.success("Wylogowano pomyślnie!");
    };
    return (
        <header
            style={{
                backgroundColor: "purple",
                padding: "0 20px",
                width: "100%",
                position: "fixed",
                top: "0",
                left: "0",
                right: "0",
                zIndex: "1000",
                height: "75px",
                display: "flex",
                alignItems: "center"
            }}
        >
            <nav
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    margin: "0 auto",
                }}
            >
                <ul
                    style={{
                        listStyleType: "none",
                        display: "flex",
                        gap: "30px",
                        padding: "0",
                        margin: "0",
                        height: "100%",
                        alignItems: "center"
                    }}
                >
                    <li style={listItemStyle}>
                        <Link to="/posts" style={linkStyle}>
                            Ogłoszenia
                        </Link>
                    </li>
                    <li style={listItemStyle}>
                        <Link to="/create-post" style={linkStyle}>
                            Dodaj ogłoszenie
                        </Link>
                    </li>
                </ul>

                <ul
                    style={{
                        listStyleType: "none",
                        display: "flex",
                        gap: "20px",
                        padding: "0",
                        margin: "0",
                        height: "100%",
                        alignItems: "center"
                    }}
                >
                    {user ? (
                        <>
                            <li style={listItemStyle}>
                                <Link to="/account" style={linkStyle}>
                                    Moje konto
                                </Link>
                            </li>
                            <li style={listItemStyle}>
                                <button onClick={handleLogout} style={logoutButtonStyle}>
                                    Wyloguj
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li style={listItemStyle}>
                                <Link to="/login" style={linkStyle}>
                                    Zaloguj
                                </Link>
                            </li>
                            <li style={listItemStyle}>
                                <Link to="/register" style={linkStyle}>
                                    Zarejestruj
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}

const listItemStyle = {
    margin: "0",
    padding: "0",
    display: "flex",
    alignItems: "center",
    height: "100%"
};

const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    height: "100%"
};

const logoutButtonStyle = {
    background: "none",
    border: "none",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    padding: "0",
};

export default Header;