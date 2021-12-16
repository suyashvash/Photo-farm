import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

export default function AddPostScreen() {
    return (
        <div className="screen-page">
            <div className='adpost-area'>
                <h3>Add Post</h3>
                <InputGroup className="mb-3 mt-4">
                    <InputGroup.Text id="basic-addon3">
                        Image URL -
                    </InputGroup.Text>
                    <FormControl id="basic-url" aria-describedby="basic-addon3" />
                </InputGroup>
                <InputGroup>
                    <InputGroup.Text>Caption</InputGroup.Text>
                    <FormControl as="textarea" aria-label="With textarea" />
                </InputGroup>
                <Button className='mt-4' variant="primary">Submit</Button>
            </div>

        </div>
    )
}