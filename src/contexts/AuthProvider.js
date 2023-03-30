// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
// import { useState, useEffect, createContext } from "react";


// export const AuthContext = createContext()

// export const AuthProvider = function (props) {
//     const [user, setUser] = useState({
//         loggedIn: false
//     })
//     const auth = getAuth();
//     async function register(email, password) {
//         try {
//             console.log(email, password)
//             const result = await createUserWithEmailAndPassword(auth, email, password)
//             const user = result.user
//             console.log(user)
//         }

//         catch (error) {
//             const errorCode = error.code
//             const errorMessage = error.message
//             console.log(errorCode)
//             console.log(errorMessage)
//         }

//     }
//     async function login(email, password) {
//         try {
//             console.log(email, password)
//             const result = await signInWithEmailAndPassword(auth, email, password)
//             const user = result.user
//             console.log(user)

//         } catch (error) {
//             const errorCode = error.code
//             const errorMessage = error.message
//             console.log(errorCode)
//             console.log(errorMessage)
//         }

//     }
//     async function logout() {
//         const result = await signOut(auth)
//     }
//     useEffect(() => {
//         onAuthStateChanged(auth, (userData) => {
//             if (userData) {
//                 userData.loggedIn = true
//                 setUser(userData)
//             } else {
//                 setUser({
//                     loggedIn: false
//                 })
//             }
//         })
//     }, [])
//     const value = {
//         register,
//         login,
//         logout,
//         user
//     }
//     return (
//         <AuthContext.Provider value={value}>
//             {props.children}
//         </AuthContext.Provider>
//     )
// }


