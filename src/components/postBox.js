import Card from 'react-bootstrap/Card'


export default function PostCard(props) {
    return (
        <Card className="bg-dark text-white" onClick={props.onClick}>
            <Card.Img src={props.postUrl} alt="Card image" />
            <Card.ImgOverlay>
                <Card.Title>{props.caption}</Card.Title>
                <Card.Text>{props.author}</Card.Text>
                <Card.Text>Posted at - {props.time}</Card.Text>
            </Card.ImgOverlay>
            <div className='custom-overlay'>
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-fullscreen" viewBox="0 0 16 16">
                    <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z" />
                </svg>
                <span>Click to view Fullscreen</span>
            </div>
        </Card>
    )
}