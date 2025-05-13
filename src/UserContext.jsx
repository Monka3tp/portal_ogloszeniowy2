import { createContext, useState, useContext, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import PropTypes from 'prop-types';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authInitialized, setAuthInitialized] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
            setAuthInitialized(true);
        });

        return () => unsubscribe();
    }, []);

    const setUserAndAuth = (newUser) => {
        if (newUser === null && auth.currentUser) {
            signOut(auth).catch(error => {
                console.error("Błąd podczas wylogowywania:", error);
            });
        }
        setUser(newUser);
    };

    return (
        <UserContext.Provider value={{ user, setUser: setUserAndAuth, loading, authInitialized }}>
            {children}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export const useUser = () => useContext(UserContext);
