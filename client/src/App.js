import './App.css';
import {BrowserRouter as Router, Route, Routes, Link}  from 'react-router-dom'
import Home from './pages/Home'
import CreatePost from "./pages/CreatePost"
import Post from "./pages/Post"
import Register from "./pages/Register"
import Login from "./pages/Login"

function App() {
  return (
  <div className='App'>
    <Router>
      <div className='navbar'>
      <Link to="/createpost">Create Post</Link>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      </div>
      <Routes>
        <Route path = "/" exact element = {<Home/>}/>
        <Route path = "/createpost" exact element = {<CreatePost/>}/>
        <Route path = "/post/:id" exact element = {<Post/>}/>
        <Route path = "/login" exact element = {<Login/>}/>
        <Route path = "/register" exact element = {<Register/>}/>
      </Routes>
    </Router>
  </div>
  );
}

export default App;
