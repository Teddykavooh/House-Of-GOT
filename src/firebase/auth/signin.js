import firebase_app from "../config";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function signIn(email, password) {
    let result = null,
        myError = null;
    try {
        result = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        myError = error;
    }
    return { result, myError };
}
