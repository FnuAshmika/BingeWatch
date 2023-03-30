import React, { useState } from "react";
import './LoginScreen.css';
import SignupScreen from "./SignupScreen";

function LoginScreen() {
    const [signIn, setSignIn] = useState(false)
    return (
        <div className="loginScreen">
            <div className="loginScreen_background">
                <img className="loginScreen_logo" src="https://images36.files.wordpress.com/2023/03/binge-watch-1-fotor-bg-remover-20230328221919.png" alt="" />
                <button onClick={()=> setSignIn(true)} className="loginScreen_button">Sign In</button>
                <div className="loginScreen_gradient" />
            </div>
            <div className="loginScreen_body">
                {signIn ? (<SignupScreen/>) : 
                (<>
                    <h1>Unlimited films, TV programmes and more.</h1>
                    <h2>Watch anywhere. Cancel at any time.</h2>
                    <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
                    <div className="loginSCreen_input">
                        <form>
                            <input type="email" placeholder="Email Address" />
                            <button onClick={()=> setSignIn(true)} className="loginScreen_getStarted">GET STARTED</button>
                        </form>
                    </div>
                </>)}
                
            </div>
        </div>
    )
}

export default LoginScreen