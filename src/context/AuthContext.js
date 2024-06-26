import React from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebase_app from "@/firebase/config";
// import { firebase_app } from "../firebase/config";

const auth = getAuth(firebase_app);

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user);
                console.log("user set", user);
            } else {
                setUser(null);
                console.log("user null");
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        // <AuthContext.Provider value={{ user }}>
        //     {loading ? <div>Loading ...</div> : children}
        // </AuthContext.Provider>
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
