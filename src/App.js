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
  Link
} from "react-router-dom";


function App() {



  return (
    <div className="App">

      <Router>
        <Navbar fixed='top' bg="dark" variant="dark">
          <Container>

            <Navbar.Brand ><Link to="/">Photo Farm</Link></Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Link to="/createpost"><Button size="sm" variant="outline-light" >Add Post</Button></Link>
              <Link to="/profile"><Button size="sm" variant="outline-light">Login/Sign up</Button></Link>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Routes>
          <Route path="/" exact element={<HomeScreen />} />
          <Route path="/createpost" exact element={<AddPostScreen />} />
          <Route path="/login" exact element={<LoginScreen />} />
          <Route path="/profile" exact element={<ProfileScreen />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
