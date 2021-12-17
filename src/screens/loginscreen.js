import React from 'react'
import axios from 'axios'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector } from "react-redux";
import { setActiveUser } from "../features/userSlice";
import { useNavigate } from "react-router-dom";

export default function LoginScreen() {


    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [authMode, setAuthMode] = React.useState('login')

    const dispatch = useDispatch();
    let navigate = useNavigate();

    const login = async () => {
        if (username !== '' && password !== '') {
            const data = {
                username: `${username}`,
                password: `${password}`
            }
            await axios.post('http://localhost:5000/api/users/login', data)
                .then(res => {
                    if (res.data.loggedIn) {
                        dispatch(setActiveUser({ token: res.data.token, loggedIn: true, }))
                        navigate(`/profile`)
                    } else {
                        alert(res.data.message)

                    }
                })
                .catch(err => alert(err))


        } else {
            alert("Please fill all the fields")
        }
    }

    const signup = async () => {
        if (username !== '' && password !== '') {
            const data = {
                username: `${username}`,
                password: `${password}`
            }
            await axios.post('http://localhost:5000/api/users/register', data)
                .then(res => { alert(res.data.message) })
                .catch(err => alert(err))
        } else {
            alert("Please fill all the fields")
        }
    }

    return (
        <div className="login-screen screen-page">
            <div className='adpost-area login'>
                <h3>{authMode == "login" ? "Login" : "SignUp"}</h3>
                <InputGroup className="mb-3 mt-4">
                    <InputGroup.Text id="basic-addon3">Username -</InputGroup.Text>
                    <FormControl onInputCapture={(e) => setUsername(e.target.value)} aria-label="Default" aria-describedby="inputGroup-sizing-default" />
                </InputGroup>
                <InputGroup>
                    <InputGroup.Text>Password -</InputGroup.Text>
                    <FormControl onInputCapture={(e) => setPassword(e.target.value)} aria-label="Default" aria-describedby="inputGroup-sizing-default" />
                </InputGroup>
                {
                    authMode == "login" ?
                        <div className='lgn-btn-holder'>
                            <Button className='mt-4' variant="primary" onClick={login}>Login</Button>
                            <Button className='mt-4' variant="outline-dark" onClick={() => setAuthMode("signUp")}>Create account</Button>
                        </div>
                        :

                        <div className='lgn-btn-holder'>
                            <Button className='mt-4' variant="primary" onClick={signup}>Create account</Button>
                            <Button className='mt-4' variant="outline-dark" onClick={() => setAuthMode("login")}>Login</Button>

                        </div>
                }


            </div>
        </div>
    )
}