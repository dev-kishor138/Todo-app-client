import { createContext, useState, useEffect } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";

export const MyContext = createContext();


const auth = getAuth(app)

const MyProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // google Provider declare
    const googleProvider = new GoogleAuthProvider();

    // user create function 
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // signIn in with google 
    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    // user login with email password
    const userLogin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    // update profile name 
    const updateUserProfile = (name) => {
        return updateProfile(auth.currentUser, {
            displayName: name
        })
    }

    // dark mode enabled 
    const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light');

    useEffect(() => {
        localStorage.setItem('theme', theme)
        const localTheme = localStorage.getItem('theme')
        document.querySelector('html').setAttribute("data-theme", localTheme)
    }, [theme])

    // handle theme function 
    const handleTheme = (event) => {
        if (event.target.checked) {
            setTheme('dark')
        }
        else {
            setTheme('light')
        }
    }





    // user identity
    useState(() => {
        const subscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false)
        })

        return () => {
            return subscribe();
        }

    }, [])

    // user logout function
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }


    // all info 
    const info = {
        user,
        loading,
        createUser,
        signInWithGoogle,
        userLogin,
        logOut,
        updateUserProfile,
        handleTheme,
        theme
    }

    return (
        <MyContext.Provider value={info}>
            {children}
        </MyContext.Provider>
    );
};

export default MyProvider;