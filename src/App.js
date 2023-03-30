import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from './views/HomeScreen';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginScreen from './views/LoginScreen';
import ProfileScreen from './views/ProfileScreen';
import SearchPage from './views/SearchScreen';
// import { AuthContext } from './contexts/AuthProvider';
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from './features/userSlice';
import { getAuth,onAuthStateChanged } from "firebase/auth";

function App() {
  // const {  user } = useContext(AuthContext)
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const auth = getAuth()
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,(userAuth =>{
      if(userAuth){
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email
        }))
      }else{
        dispatch(logout())
      }
    }))
    return unsubscribe
  },[dispatch])
  return (
    <div className="app">
      <Router>
        {!user ? (
          <LoginScreen />
        ) : (
          <Routes>
            <Route path='/profile' element={<ProfileScreen/>} />
            <Route path='/' element={<HomeScreen />} />
            <Route path='/search' element={<SearchPage />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
