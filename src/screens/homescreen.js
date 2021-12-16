import React from "react";
import PostCard from "../components/postBox";
import ModalAlert from "../components/modal";

export default function HomeScreen() {

    const [show, setShow] = React.useState(false)
    const [modalUrl, setModalUrl] = React.useState('');
    const [modalBody, setModalBody] = React.useState('')

    const showFullscreenImg = (caption, url, username) => {
        setModalUrl(url)
        setModalBody(caption)
        setShow(true)
    }

    const postData = [
        {
            caption: "Swan garden",
            username: "suyash",
            createdAt: "12/01/2003",
            picurl: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
        },
        {
            caption: "Polka River",
            username: "andy",
            createdAt: "05/04/2013",
            picurl: "https://media.istockphoto.com/photos/sunrise-on-a-lake-picture-id1043560968?k=20&m=1043560968&s=612x612&w=0&h=FYgd_p1ADZ3d0DySs-ciHLDxp9FuvJv0O_hIco2IJnM="
        },
        {
            caption: "Mathew station",
            username: "mikasa",
            createdAt: "02/12/2021",
            picurl: "https://akm-img-a-in.tosshub.com/businesstoday/images/story/201901/railway_station_660_010619112111.jpg"
        },
        {
            caption: "Swan garden",
            username: "suyash",
            createdAt: "12/01/2003",
            picurl: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
        },
        {
            caption: "Polka River",
            username: "andy",
            createdAt: "05/04/2013",
            picurl: "https://media.istockphoto.com/photos/sunrise-on-a-lake-picture-id1043560968?k=20&m=1043560968&s=612x612&w=0&h=FYgd_p1ADZ3d0DySs-ciHLDxp9FuvJv0O_hIco2IJnM="
        },
        {
            caption: "Mathew station",
            username: "mikasa",
            createdAt: "02/12/2021",
            picurl: "https://akm-img-a-in.tosshub.com/businesstoday/images/story/201901/railway_station_660_010619112111.jpg"
        },
        {
            caption: "Swan garden",
            username: "suyash",
            createdAt: "12/01/2003",
            picurl: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
        },
        {
            caption: "Polka River",
            username: "andy",
            createdAt: "05/04/2013",
            picurl: "https://media.istockphoto.com/photos/sunrise-on-a-lake-picture-id1043560968?k=20&m=1043560968&s=612x612&w=0&h=FYgd_p1ADZ3d0DySs-ciHLDxp9FuvJv0O_hIco2IJnM="
        },
        {
            caption: "Mathew station",
            username: "mikasa",
            createdAt: "02/12/2021",
            picurl: "https://akm-img-a-in.tosshub.com/businesstoday/images/story/201901/railway_station_660_010619112111.jpg"
        }
    ]

    return (
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
                        postUrl={post.picurl}
                        profileView={false}
                        onClick={() => showFullscreenImg(post.caption, post.picurl, post.username)}
                    />
                ))
            }
        </div>
    )
}