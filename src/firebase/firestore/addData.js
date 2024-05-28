import firebase_app from "../config";
import {
    getFirestore,
    collection as c_collection,
    addDoc,
} from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function addData(collection, data) {
    let result = null;
    let error = null;

    try {
        result = await addDoc(c_collection(db, collection), data, {
            merge: true,
        });
    } catch (e) {
        error = e;
    }

    return { result, error };
}
