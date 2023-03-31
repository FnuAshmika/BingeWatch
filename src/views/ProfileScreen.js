import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import Nav from "../components/Nav";
import PlanScreen from "./PlanScreen";
import "./ProfileScreen.css";

function ProfileScreen() {
    const user = useSelector(selectUser)
    const auth = getAuth()
    return(
        <div className="profileScreen">
            <Nav hideSearchButton={true}/>
            <div className="profileScreen_body">
                <h1>Edit Profile</h1>
                <div className="profileScreen_info">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/8/87/Avatar_poe84it.png" alt="" />
                    <div className="profileScreen_details">
                        <h2>{user.email}</h2>
                        <div className="profileScreen_plans">
                            <h3>Plans</h3>
                            <PlanScreen/>


                            <button onClick={()=> signOut(auth)} className="profileScreen_signOut">Sign Out</button>
                        </div>
                    </div>
                </div>
            </div>
         

        </div>
    )
}

export default ProfileScreen;