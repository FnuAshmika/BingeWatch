// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Nav.css";

// function Nav() {
//     const [show, handleShow] = useState(false)
//     const navigate =useNavigate()
//     const transitionNavBar = () => {
//         if (window.scrollY >100){
//             handleShow(true)
//         }else{
//             handleShow(false)
//         }
//     }
//     useEffect(()=>{
//         window.addEventListener("scroll", transitionNavBar)
//         return () => window.removeEventListener('scroll', transitionNavBar)
//     },[])
//     return (
//         <div className={`nav ${show && 'nav_black'}`}>
//             <div className="nav_content">
//                 <img 
//                 onClick={()=> navigate("/")}
//                 className="nav_logo" src="https://images36.files.wordpress.com/2023/03/binge-watch-1-fotor-bg-remover-20230328221919.png" alt=""  />
//                 <img 
//                 onClick={()=> navigate("/profile")}
//                 className="nav_avatar" src="https://upload.wikimedia.org/wikipedia/commons/8/87/Avatar_poe84it.png" alt="" />
//             </div>


//         </div>
//     )
// }
// export default Nav
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Nav.css";

function Nav({ hideSearchButton }) {
    const [show, handleShow] = useState(false)
    const navigate = useNavigate()
    const transitionNavBar = () => {
        if (window.scrollY > 100) {
            handleShow(true)
        } else {
            handleShow(false)
        }
    }
    useEffect(() => {
        window.addEventListener("scroll", transitionNavBar)
        return () => window.removeEventListener('scroll', transitionNavBar)
    }, [])

    return (
        <div className={`nav ${show && 'nav_black'}`}>
            <div className="nav_content">
                <img
                    onClick={() => navigate("/")}
                    className="nav_logo" src="https://images36.files.wordpress.com/2023/03/binge-watch-1-fotor-bg-remover-20230328221919.png" alt="" />
                {!hideSearchButton && (<button  onClick={() => navigate("/search")} className="nav_btn" type="submit">Search</button>)}
                <img
                    onClick={() => navigate("/profile")}
                    className="nav_avatar" src="https://upload.wikimedia.org/wikipedia/commons/8/87/Avatar_poe84it.png" alt="" />
            </div>
        </div>
    )
}

export default Nav;
