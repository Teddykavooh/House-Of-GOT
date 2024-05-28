import firebase_app from "../config";
import {
    browserLocalPersistence,
    browserSessionPersistence,
    getAuth,
    setPersistence,
} from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function persistAuth(status) {
    try {
        await setPersistence(
            auth,
            status ? browserLocalPersistence : browserSessionPersistence,
        );
        console.log("Persistence set successfully", status);
    } catch (error) {
        console.error("Error setting persistence: ", error);
    }
}
