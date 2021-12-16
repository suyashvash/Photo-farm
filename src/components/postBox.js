import Card from 'react-bootstrap/Card'


export default function PostCard(props) {
    return (
        <Card className="bg-dark text-white">
            <Card.Img src={props.postUrl} alt="Card image" />
            <Card.ImgOverlay>
                <Card.Title>{props.caption}</Card.Title>
                <Card.Text>{props.author}</Card.Text>
                <Card.Text>Posted at - {props.time}</Card.Text>
            </Card.ImgOverlay>
        </Card>
    )
}