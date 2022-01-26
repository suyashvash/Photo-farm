import React from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { Token } from '../app/useStore'
import ModalAlert from "../components/modal";

export default function AddPostScreen() {

    const [url, setUrl] = React.useState('')
    const [caption, setCaption] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(false)
    const [show, setShow] = React.useState(false)
    const [modalBody, setModalBody] = React.useState('')
    const token = Token()

    const addPost = () => {
        if (url !== '' && caption !== '') {
            setIsLoading(true)
            const data = {
                token: `${token}`,
                caption: `${caption}`,
                postUrl: `${url}`
            }
            axios.post('https://photofarm.herokuapp.com/api/posts/addPost', data)
                .then(res => {
                    console.log(res)
                    if (res.data.status) {
                        setIsLoading(false)
                        setModalBody(<span>Post added sucessfully!</span>)
                        setShow(true)
                    } else {
                        setIsLoading(false)
                        setModalBody(<span>Post addition failed !</span>)
                        setShow(true)
                    }
                })
                .catch(err => console.log(err))


        } else alert("Please fill all the fields!")
    }

    return (
        <div className="screen-page">

            <ModalAlert
                show={show}
                handleClose={() => setShow(false)}
                // url={modalUrl}
                body={modalBody}
            // mode={"frame"}

            />
            {!isLoading ?
                <div className='adpost-area'>
                    <h3>Add Post</h3>
                    <InputGroup className="mb-3 mt-4">
                        <InputGroup.Text id="basic-addon3">
                            Image URL -
                        </InputGroup.Text>
                        <FormControl onInputCapture={(e) => setUrl(e.target.value)} id="basic-url" aria-describedby="basic-addon3" />
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Text>Caption</InputGroup.Text>
                        <FormControl onInputCapture={(e) => setCaption(e.target.value)} as="textarea" aria-label="With textarea" />
                    </InputGroup>
                    <Button className='mt-4' variant="primary" onClick={addPost}>Submit</Button>
                </div>

                :
                <div className="loading-screen">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="black" className="bi bi-camera" viewBox="0 0 16 16">
                        <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />
                        <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                    </svg>
                    <br />
                    <h3>Creating post......</h3>
                    <span>Please wait </span>
                </div>
            }

        </div>
    )
}