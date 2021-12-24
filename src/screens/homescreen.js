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
        axios.get('https://photofarm.herokuapp.com/api/posts/showall')
            .then(response => { setPostData(response.data); setIsLoading(false) })
            .catch(err => { console.log(err); setIsLoading(false) })
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
                <h3>Loading posts......</h3>
                <span>Please wait </span>
            </div>

    )
}