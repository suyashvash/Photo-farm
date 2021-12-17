import React from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { Token } from '../app/useStore'

export default function AddPostScreen() {

    const [url, setUrl] = React.useState('')
    const [caption, setCaption] = React.useState('')
    const token = Token()

    const addPost = () => {
        if (url !== '' && caption !== '') {
            const data = {
                token: `${token}`,
                caption: `${caption}`,
                postUrl: `${url}`
            }
            axios.post('http://localhost:5000/api/posts/addPost', data)
                .then(res => {
                    console.log(res)
                    if (res.data.status) {
                        alert(res.data.message)
                    } else {
                        alert("Post creation failed!")
                    }
                })
                .catch(err => console.log(err))


        } else alert("Please fill all the fields!")
    }

    return (
        <div className="screen-page">
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

        </div>
    )
}