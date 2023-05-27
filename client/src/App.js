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
import EditPost from "./pages/EditPost"
import { AuthContext } from "./helpers/AuthContext"
import { useState, useEffect } from 'react';
import axios from 'axios';
import WelcomePage from './pages/WelcomePage';
import AboutMe from './pages/AboutMe';

function App() {


  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  })

  useEffect(() => {
    axios.get("/users/auth", {
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
    window.location = "/login"

  }


  const profile = () => {
    window.location = `/profile/${authState.id}`
    
  }

  return (
    <div className='App'>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <nav class="navbar navbar-expand-lg navbar-dark bg-primary sticky-top" style={{
            position: "initial;", right: "0",
            left: "0"
          }}>
            <div className="container-fluid">
              <Link to="/"><a class="navbar-brand">Home</a></Link>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarColor02">
                <ul className="navbar-nav mu-auto">
                  {!authState.status ? (
                    <>
                      <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                      <li><Link className="nav-item nav-link" to="/register">Register</Link></li>
                    </>
                  ) : <><li><Link className="nav-item nav-link" to="/createpost">Create Post</Link></li>
                    <li class="nav-item">
                      <Link className="nav-item nav-link" to="/aboutme">About</Link>
                    </li>
                  </>
                  }
                </ul>
                {authState.status && (
                  <>
                    <ul className="navbar-nav ml-auto">
                      <li class="nav-item dropdown">
                        <a class="navbar-brand nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{authState.username}</a>
                        <div class="dropdown-menu">
                          <a className="dropdown-item" onClick={profile}>Profile</a>
                          <Link className="dropdown-item" to={`/profile/${authState.id}`}>Create Post</Link>
                          <div className="dropdown-divider"></div>
                          {authState.status && <a className="dropdown-item" onClick={logout}>Log Out</a>}

                        </div>
                      </li>
                    </ul>
                  </>)}
              </div>
            </div>
          </nav>



          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/welcome" exact element={<WelcomePage />} />
            <Route path="/aboutme" exact element={<AboutMe />} />
            <Route path="/createpost" exact element={<CreatePost />} />
            <Route path="/post/:id" exact element={<Post />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/register" exact element={<Register />} />
            <Route path="/profile/:id" exact element={<Profile />} />
            <Route path="/editprofile" exact element={<EditProfile />} />
            <Route path="/editpost/:id" exact element={<EditPost />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>


          <footer id="sticky-footer" class="flex-shrink-0 py-4 sticky-bottom">
            <div class="container text-center">
              <p class="text-primary">Copyright &copy; <Link class="navbar-brand" to="/">MyLibrary</Link></p>
            </div>
          </footer>
        </Router>
      </AuthContext.Provider>
    </div >

  );
}

export default App;
