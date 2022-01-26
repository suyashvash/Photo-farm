import React from "react";
import PostCard from "../components/postBox"
import ModalAlert from "../components/modal";
import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector } from "react-redux";
import { setUserLogOutState } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Token } from '../app/useStore'
import Modal from 'react-bootstrap/Modal'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

export default function ProfileScreen() {

    React.useEffect(() => { getPosts() }, [])

    const [show, setShow] = React.useState(false);
    const [alertShow, setAlertShow] = React.useState(false)
    const [modalUrl, setModalUrl] = React.useState('');
    const [modalBody, setModalBody] = React.useState('')
    const [postData, setPostData] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const [selectedUrl, setSelectedUrl] = React.useState('')
    const [selectedCaption, setSelectedCaption] = React.useState('')
    const [selectedId, setSelectedId] = React.useState('')
    const [isEditing, setIsEding] = React.useState(false)

    let navigate = useNavigate();
    const dispatch = useDispatch()
    const token = Token()

    const showFullscreenImg = (caption, url) => {
        setModalUrl(url)
        setModalBody(caption)
        setShow(true)
    }

    const showUpdateModel = (caption, url, id) => {
        setSelectedUrl(url)
        setSelectedCaption(caption)
        setSelectedId(id)
        setIsEding(true)
    }

    const getPosts = () => {
        axios.get(`https://photofarm.herokuapp.com/api/posts/mypost/${token}`)
            .then(response => { setPostData(response.data.data); setIsLoading(false) })
            .catch(err => { console.log(err); setIsLoading(false) })
    }

    const updatePost = async () => {
        setIsLoading(true)
        setIsEding(false)
        const data = {
            url: selectedUrl,
            caption: selectedCaption,
        }
        await axios.post(`https://photofarm.herokuapp.com/api/posts/updatepost/${selectedId}`, data)
            .then(response => {
                if (response.data.status) {
                    setIsLoading(false);
                    setModalBody(<span>Post updated succesfully !</span>)
                    setAlertShow(true)
                    getPosts();
                }
                else {
                    setIsLoading(false);
                    setModalBody(<span>Post Update failed !</span>)
                    setAlertShow(true)
                    getPosts();
                }
            })
            .catch(err => console.log(err))

    }

    const deletePost = async (id) => {

        const ask = window.confirm("Are you sure you want delete this post? This can't be undone.")
        if (ask) {
            setIsLoading(true)
            setIsEding(false)
            await axios.delete(`https://photofarm.herokuapp.com/api/posts/deletepost/${id}`)
                .then(response => {
                    if (response.data.status) {
                        setIsLoading(false);
                        setModalBody(<span>Post Deleted succesfully !</span>)
                        setAlertShow(true)
                    }
                    else {
                        setIsLoading(false);
                        setModalBody(<span>Post Deleted succesfully !</span>)
                        setAlertShow(true)
                    }
                })
                .catch(err => console.log(err))
        }
    }


    const logout = () => {
        navigate(`/`)
        dispatch(setUserLogOutState())
    }

    return (
        <div className="screen-page admin-page">

            <ModalAlert
                show={show}
                handleClose={() => setShow(false)}
                body={modalBody}
                url={modalUrl}
                mode={'frame'}
            />

            <ModalAlert
                show={alertShow}
                handleClose={() => setAlertShow(false)}
                body={modalBody}

            />

            <Modal centered show={isEditing} onHide={() => setIsEding(false)}>
                <Modal.Header closeButton></Modal.Header>
                <div className='m-4'>
                    <h4>Update Post</h4>
                    <InputGroup className="mb-3 mt-4">
                        <InputGroup.Text id="basic-addon3">
                            Image URL -
                        </InputGroup.Text>
                        <FormControl defaultValue={selectedUrl} onInputCapture={(e) => setSelectedUrl(e.target.value)} id="basic-url" aria-describedby="basic-addon3" />
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Text>Caption</InputGroup.Text>
                        <FormControl defaultValue={selectedCaption} onInputCapture={(e) => setSelectedCaption(e.target.value)} as="textarea" aria-label="With textarea" />
                    </InputGroup>
                    <Button className='mt-4' variant="primary" onClick={updatePost}>Submit</Button>
                </div>
            </Modal>



            {!isLoading ?
                <div className="adpost-area admin">
                    <div className="profile-head your-post">
                        <h4>{postData.length !== 0 ? "Your posts" : "No posts"}</h4>
                        <Button variant="dark" onClick={logout}>Logout</Button>
                    </div>

                    <span></span>

                    <div className="my-post">
                        {postData &&
                            postData.map((post, index) => (
                                <PostCard
                                    key={index}
                                    caption={post.caption}
                                    author={post.username}
                                    time={post.createdAt}
                                    postUrl={post.postUrl}
                                    profileView={true}
                                    deleteFunction={() => deletePost(post._id)}
                                    updateFunction={() => showUpdateModel(post.caption, post.postUrl, post._id)}
                                    onClick={() => showFullscreenImg(post.caption, post.postUrl, post.username)}
                                />
                            ))
                        }
                    </div>
                </div>
                :
                <div className="loading-screen">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="black" className="bi bi-camera" viewBox="0 0 16 16">
                        <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />
                        <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                    </svg>
                    <br />
                    <h3>Loading......</h3>
                    <span>Please wait </span>
                </div>
            }
        </div >
    )
}