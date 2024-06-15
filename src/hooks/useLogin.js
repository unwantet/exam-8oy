import { signInWithEmailAndPassword} from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useState } from "react";
import { useContext } from "react";
import { GlobalContext } from "../context/useContextGlobal";


export default function useLogin() {
    const [user,setUser] = useState(null);
    const [error, setError] = useState(null);

    const {dispatch} = useContext(GlobalContext);

    
    const SignupWithGoogle = () => {
        const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider) 
    .then((result) => {
        const user = result.user;
        setUser(user);
        dispatch({type:"SIGN_IN" , payload:user})

      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        console.log(errorCode, errorMessage, email);
        setError(error);
        });
    }


    const SignInWithPassword = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        dispatch({type:"SIGN_IN" , payload:user})
        setUser(user);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(error);
    });
    }

    return {SignInWithPassword , user , error}
}
