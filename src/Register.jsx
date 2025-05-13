import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useUser } from "./UserContext";
import { formatFirebaseError } from "./utils";

import ClipLoader from "react-spinners/ClipLoader.js";
import {toast} from "react-toastify";

function Register() {
    const { user, loading } = useUser();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState("");
    const { setUser } = useUser();
    const navigate = useNavigate();

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

    const register = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            toast.success("Zarejestrowano pomyślnie!");
            navigate({ to: "/" });
        } catch (error) {
            setMessage(formatFirebaseError(error.message));
            setMessageType("danger");
        }
    };

    return (
        <form className="container mt-4" onSubmit={register}>
            <h2 className="mb-4">Rejestracja</h2>
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
            <button type="submit" className="btn btn-primary">Zarejestruj</button>
        </form>
    );
}

export default Register;
