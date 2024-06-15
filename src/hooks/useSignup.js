import { signInWithPopup, GoogleAuthProvider , createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useState } from "react";
import { useContext } from "react";
import { GlobalContext } from "../context/useContextGlobal";


function UseSignup() {
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

    const SigupWithPassword = (email,password, name , photo ) => {
        console.log(email, password, name, photo);
        createUserWithEmailAndPassword(auth, email, password )
        .then(async(userCredential) => {
            await updateProfile(auth.currentUser, {
                displayName: name,
                photoURL: photo,
            })
            const user = userCredential.user;
            dispatch({type:"SIGN_IN", payload:user})
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(error.message)
            setError(error);

        });

    } 

    return {SignupWithGoogle ,SigupWithPassword, user , error} 
}

export {UseSignup}
