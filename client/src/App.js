import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Home from './pages/Home'
import CreatePost from "./pages/CreatePost"
import Post from "./pages/Post"
import Register from "./pages/Register"
import Login from "./pages/Login"
import PageNotFound from "./pages/PageNotFound"
import Profile from "./pages/Profile"
import EditProfile from "./pages/EditProfile"

import { AuthContext } from "./helpers/AuthContext"
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {


  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  })

  useEffect(() => {
    axios.get("http://localhost:3001/auth/auth", {
      headers: {
        accessToken: localStorage.getItem("accessToken")
      }
    }).then((response) => {
      if (response.data.error) {
        setAuthState({ ...authState, status: false })
      } else {
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        })
      }
    })
  }, []);

  const logout = () => {


    localStorage.removeItem("accessToken");

    setAuthState({
      username: "",
      id: 0,
      status: false,
    });
    window.location.pathname = "/login"

  }


  const test = () =>{
    window.location.pathname = `/profile/${authState.id}`
  }

  return (
    <div className='App'>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className='navbar'>
            <div className="links">

              <Link to="/">Home</Link>
              {!authState.status ? (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
                </>
              ) : <Link to="/createpost">Create Post</Link>
              }
            </div>
            <div className="loggedInContainer">
              <h1 onClick={test}>{authState.username}</h1>
              {authState.status && <button onClick={logout}>Log Out</button>}
            </div>
          </div>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/createpost" exact element={<CreatePost />} />
            <Route path="/post/:id" exact element={<Post />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/register" exact element={<Register />} />
            <Route path="/profile/:id" exact element={<Profile />} />
            <Route path="/editprofile" exact element={<EditProfile />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>

  );
}

export default App;
