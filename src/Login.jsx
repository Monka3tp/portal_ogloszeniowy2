import { useState, useEffect } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useUser } from "./UserContext";
import { formatFirebaseError } from "./utils";

import ClipLoader from "react-spinners/ClipLoader.js";
import {toast} from "react-toastify";

function Login() {
    const {user, loading} = useUser();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState(""); // "success" lub "danger"
    const { setUser } = useUser();
    const navigate = useNavigate();
    const search = useSearch({ from: "/login" });

    // Redirect reason handling
    useEffect(() => {
        if (search?.redirectReason === "addAnnouncement") {
            setMessage("Aby dodać ogłoszenie, musisz być zalogowany");
            setMessageType("warning");
        } else if (search?.redirectReason === "followAnnouncement") {
            setMessage("Aby obserwować ogłoszenie, musisz być zalogowany!");
            setMessageType("warning");
        }
    }, [search]);

    if (user) {
        navigate({ to: "/" });
    }

    if (loading) {
        return (
            <div style={{display: "flex", justifyContent: "center", margin: "50px"}}>
                <ClipLoader color={"purple"} size={50}/>
            </div>
        );
    }

    const login = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            // User context update
            setUser(userCredential.user);
            toast.success("Zalogowano pomyślnie!");

            setTimeout(() => {
                navigate({ to: "/" });
            }, 500);
        } catch (error) {
            setMessage(formatFirebaseError(error.message));
            setMessageType("danger");
        }
    };


    return (
        <form className="container mt-4" onSubmit={login}>
            <h2 className="mb-4">Logowanie</h2>
            {message && (
                <div className={`alert alert-${messageType}`} role="alert">
                    {message}
                </div>
            )}
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Wprowadź email"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Hasło</label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Wprowadź hasło"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit" className="btn btn-primary">Zaloguj</button>
        </form>
    );
}

export default Login;
