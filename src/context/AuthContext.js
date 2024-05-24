import { Children, React } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { firebase_app } from "../firebase/config";

const auth = getAuth(firebase_app);

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useAuthContext(AuthContext);

export const AuthContextProvider = ({ Children }) => {
    const [user, setUser] = React.useState("");
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {loading ? <div>Loading ...</div> : Children}
        </AuthContext.Provider>
    );
};
