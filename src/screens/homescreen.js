import React from "react";
import PostCard from "../components/postBox";
import ModalAlert from "../components/modal";
import axios from "axios";

export default function HomeScreen() {

    React.useEffect(() => { getPosts() }, [])

    const [show, setShow] = React.useState(false)
    const [modalUrl, setModalUrl] = React.useState('');
    const [modalBody, setModalBody] = React.useState('')
    const [postData, setPostData] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const showFullscreenImg = (caption, url, username) => {
        setModalUrl(url)
        setModalBody(caption)
        setShow(true)
    }

    const getPosts = () => {
        axios.get('https://photo-farm-backend.onrender.com/api/posts/showall')
            .then(response => { 
                setPostData(response.data); 
                console.log(response.data);
                setIsLoading(false) })
            .catch(err => { 
                console.log(err); 
                setIsLoading(false) })
    }


    return (
        !isLoading ?
            <div className="home-screen">
                <ModalAlert
                    show={show}
                    handleClose={() => setShow(false)}
                    url={modalUrl}
                    body={modalBody}
                />
                {postData &&
                    postData.map((post, index) => (
                        <PostCard
                            key={index}
                            caption={post.caption}
                            author={post.username}
                            time={post.createdAt}
                            postUrl={post.postUrl}
                            profileView={false}
                            onClick={() => showFullscreenImg(post.caption, post.postUrl, post.username)}
                        />
                    ))
                }
            </div>
            :
            <div className="loading-screen">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="black" className="bi bi-camera" viewBox="0 0 16 16">
                    <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />
                    <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                </svg>
                <br />
                <h3>Loading posts......</h3>
                <span>Please wait </span>
            </div>

    )
}