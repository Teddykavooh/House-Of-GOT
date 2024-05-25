import firebase_app from "../config";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function getDocuments(collectionName) {
    const colRef = collection(db, collectionName);
    let result = [];
    let error = null;

    try {
        const snapshot = await getDocs(colRef);
        result = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
        error = e;
    }

    return { result, error };
}
