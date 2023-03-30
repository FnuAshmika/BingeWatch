import React, { useRef } from "react";
// import { AuthContext } from "../contexts/AuthProvider";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import "./SignupScreen.css";

function SignupScreen() {
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const auth = getAuth();
    async function register(e){
        e.preventDefault()
        try {
            
            const result = await createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
            const user = result.user
            console.log(user)
        }

        catch (error) {
            const errorCode = error.code
            const errorMessage = error.message
            console.log(errorCode)
            console.log(errorMessage)
            alert(errorMessage)
        }
    } 
    async function signIn(e){
        e.preventDefault();
        try {
            const result = await signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
            const user = result.user
            console.log(user)

        } catch (error) {
            const errorCode = error.code
            const errorMessage = error.message
            console.log(errorCode)
            console.log(errorMessage)
            alert(errorMessage)
        }
    }
    return (
        <div className="signupScreen">
            <form>
                <h1>Sign In</h1>
                <input ref={emailRef} placeholder="Email" type="email" />
                <input ref={passwordRef} placeholder="Password" type="password" />
                <button type="submit" onClick={signIn}>Sign In</button>
                <h4><span className="signupScreen_gray">New to BingeWatch? </span><span className="signupScreen_link" onClick={register}>Sign Up now.</span></h4>
            </form>

        </div>
    )
}

export default SignupScreen;