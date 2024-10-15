import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updatePassword, updateProfile } from "firebase/auth";
import app from "../firebase/firebase.config";
import { createContext } from "react";

const auth = getAuth(app);

export const AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const updateUserProfile = (username) => {
        return updateProfile(auth.currentUser, {
            displayName: username,
        })
    };

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const sendResetEmail = (email) => {
        return sendPasswordResetEmail(auth, email);
    };

    const updateUserPassword = (newPassword) => {
        return updatePassword(auth.currentUser, newPassword);
    };

    const logOut = () => {
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log('auth provider', currentUser);
            setUser(currentUser);

            setLoading(false);
        });

        return () => {
            return unsubscribe();
        };

    }, []);

    const authInfo = {
        user,
        loading,
        createUser,
        updateUserProfile,
        signIn,
        sendResetEmail,
        updateUserPassword,
        logOut
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;