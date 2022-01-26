import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import HomeScreen from './screens/homescreen.js';
import AddPostScreen from './screens/addPost.js';
import LoginScreen from './screens/loginscreen.js';
import ProfileScreen from './screens/profilescreen.js';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import { LoggedIn } from './app/useStore'

function App() {

  const loggedIn = LoggedIn()
  //https://photofarm.herokuapp.com/ apis location 
  return (
    <div className="App">

      <Router>
        <Navbar fixed='top' bg="dark" variant="dark">
          <Container>

            <Navbar.Brand ><Link to="/">Photo Farm</Link></Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Link to={loggedIn ? "/createpost" : "/login"}><Button size="sm" variant="outline-light" >Add Post</Button></Link>
              <Link to={loggedIn ? "/profile" : "/login"}><Button size="sm" variant="outline-light">{loggedIn ? "Profile" : "Login/Sign up"}</Button></Link>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Routes>
          <Route path="/" exact element={<HomeScreen />} />
          <Route path="/createpost" exact element={loggedIn ? <AddPostScreen /> : <LoginScreen />} />
          <Route path="/login" exact element={<LoginScreen />} />
          <Route path="/profile" exact element={loggedIn ? <ProfileScreen /> : <LoginScreen />} />
          <Route path="*" exact element={<HomeScreen />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
