import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import HomeScreen from './screens/homescreen';

function App() {
  return (
    <div className="App">
      <Navbar fixed='top' bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Photo Farm</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Button size="sm" variant="outline-light">Add Post</Button>
            <Button size="sm" variant="outline-light">Profile</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <HomeScreen />
    </div>
  );
}

export default App;
