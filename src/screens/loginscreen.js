import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'



export default function LoginScreen() {
    return (
        <div className="login-screen screen-page">
            <div className='adpost-area login'>
                <h3>Login</h3>
                <InputGroup className="mb-3 mt-4">
                    <InputGroup.Text id="basic-addon3">Username -</InputGroup.Text>
                    <FormControl aria-label="Default" aria-describedby="inputGroup-sizing-default" />
                </InputGroup>
                <InputGroup>
                    <InputGroup.Text>Password -</InputGroup.Text>
                    <FormControl aria-label="Default" aria-describedby="inputGroup-sizing-default" />
                </InputGroup>
                <Button className='mt-4' variant="primary">Submit</Button>
            </div>
        </div>
    )
}