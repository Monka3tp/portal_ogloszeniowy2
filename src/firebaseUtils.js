import { getFirestore, doc, updateDoc, arrayUnion, getDoc, setDoc } from "firebase/firestore";
import { auth } from "./firebase";

const db = getFirestore();

export const followAnnouncement = async (announcementId) => {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("Not logged in");

        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
            await setDoc(userDocRef, { followedAnnouncements: [] });
        }

        await updateDoc(userDocRef, {
            followedAnnouncements: arrayUnion(announcementId),
        });
    } catch (error) {
        console.error("Błąd podczas dodawania ogłoszenia do obserwowanych:", error);
        throw error;
    }
};

export const getFollowedAnnouncements = async () => {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("Not logged in");

        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            return userDoc.data().followedAnnouncements || [];
        } else {
            return [];
        }
    } catch (error) {
        console.error("Błąd podczas pobierania obserwowanych ogłoszeń:", error);
        throw error;
    }
};