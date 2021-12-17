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

    const [show, setShow] = React.useState(false)
    const [modalUrl, setModalUrl] = React.useState('');
    const [modalBody, setModalBody] = React.useState('')
    const [postData, setPostData] = React.useState([]);


    const [selectedUrl, setSelectedUrl] = React.useState('')
    const [selectedCaption, setSelectedCaption] = React.useState('')
    const [selectedId, setSelectedId] = React.useState('')
    const [isEditing, setIsEding] = React.useState(false)

    let navigate = useNavigate();
    const dispatch = useDispatch()
    const token = Token()

    const showFullscreenImg = (caption, url, username) => {
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
            .then(response => { setPostData(response.data.data) })
            .catch(err => console.log(err))
    }

    const updatePost = async () => {
        const data = {
            url: selectedUrl,
            caption: selectedCaption,
        }
        await axios.post(`https://photofarm.herokuapp.com/api/posts/updatepost/${selectedId}`, data)
            .then(response => {
                if (response.data.status) { alert("Post Updated!"); window.location.reload(); }
                else alert("Failed")
            })
            .catch(err => console.log(err))
        isEditing(false)
    }

    const deletePost = async (id) => {
        const ask = window.confirm("Are you sure you want delete this post? This can't be undone.")
        if (ask) {
            await axios.delete(`https://photofarm.herokuapp.com/api/posts/deletepost/${id}`)
                .then(response => {
                    if (response.data.status) { alert("Post Deleted!"); window.location.reload(); }
                    else alert("Failed")
                })
                .catch(err => console.log(err))
        }
    }


    // const postData = [
    //     {
    //         caption: "Swan garden",
    //         username: "suyash",
    //         createdAt: "12/01/2003",
    //         picurl: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
    //     },
    //     {
    //         caption: "Polka River",
    //         username: "andy",
    //         createdAt: "05/04/2013",
    //         picurl: "https://media.istockphoto.com/photos/sunrise-on-a-lake-picture-id1043560968?k=20&m=1043560968&s=612x612&w=0&h=FYgd_p1ADZ3d0DySs-ciHLDxp9FuvJv0O_hIco2IJnM="
    //     },
    //     {
    //         caption: "Mathew station",
    //         username: "mikasa",
    //         createdAt: "02/12/2021",
    //         picurl: "https://akm-img-a-in.tosshub.com/businesstoday/images/story/201901/railway_station_660_010619112111.jpg"
    //     },
    //     {
    //         caption: "Swan garden",
    //         username: "suyash",
    //         createdAt: "12/01/2003",
    //         picurl: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
    //     },
    //     {
    //         caption: "Polka River",
    //         username: "andy",
    //         createdAt: "05/04/2013",
    //         picurl: "https://media.istockphoto.com/photos/sunrise-on-a-lake-picture-id1043560968?k=20&m=1043560968&s=612x612&w=0&h=FYgd_p1ADZ3d0DySs-ciHLDxp9FuvJv0O_hIco2IJnM="
    //     },
    //     {
    //         caption: "Mathew station",
    //         username: "mikasa",
    //         createdAt: "02/12/2021",
    //         picurl: "https://akm-img-a-in.tosshub.com/businesstoday/images/story/201901/railway_station_660_010619112111.jpg"
    //     },
    //     {
    //         caption: "Swan garden",
    //         username: "suyash",
    //         createdAt: "12/01/2003",
    //         picurl: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
    //     },
    //     {
    //         caption: "Polka River",
    //         username: "andy",
    //         createdAt: "05/04/2013",
    //         picurl: "https://media.istockphoto.com/photos/sunrise-on-a-lake-picture-id1043560968?k=20&m=1043560968&s=612x612&w=0&h=FYgd_p1ADZ3d0DySs-ciHLDxp9FuvJv0O_hIco2IJnM="
    //     },
    //     {
    //         caption: "Mathew station",
    //         username: "mikasa",
    //         createdAt: "02/12/2021",
    //         picurl: "https://akm-img-a-in.tosshub.com/businesstoday/images/story/201901/railway_station_660_010619112111.jpg"
    //     }
    // ]

    const logout = () => {
        dispatch(setUserLogOutState())
        navigate(`/`)
    }

    return (
        <div className="screen-page admin-page">

            <ModalAlert
                show={show}
                handleClose={() => setShow(false)}
                url={modalUrl}
                body={modalBody}
                mode={"frame"}

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
        </div >
    )
}