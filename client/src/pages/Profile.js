import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Image } from "cloudinary-react"
import { AuthContext } from '../helpers/AuthContext';

function Profile() {

    const { authState } = useContext(AuthContext);
    let navigate = useNavigate();
    let { id } = useParams();
    const [username, setUsername] = useState("");
    const [aboutme, setAboutMe] = useState("");
    const [listOfUserPosts, setListOfUserPosts] = useState([]);
    const [listOfFavoritedPosts, setListOfFavoritedPosts] = useState([]);
    const [publicId, setPublicId] = useState("");


    useEffect(() => {
        axios.get(`http://localhost:3001/users/basicinfo/${id}`).then((response) => {
            setUsername(response.data.username)
        })
        axios.get(`http://localhost:3001/users/basicinfo/${id}`).then((response) => {
            setPublicId(response.data.profilephoto)
        })
        axios.get(`http://localhost:3001/users/basicinfo/${id}`).then((response) => {
            setAboutMe(response.data.aboutme)
        })
        axios.get(`http://localhost:3001/posts/byUserId/${id}`).then((response) => {
            setListOfUserPosts(response.data)
        })
        axios.get(`http://localhost:3001/posts/byFavoriteId/${id}`).then((response) => {
            setListOfFavoritedPosts(response.data)
        })
    }, []);



    return (
        <div className='profilePageContainer'>



            <div className='editButton'>
                <h1>Username: {username}</h1>
                <Image style={{ height: "150px" }} cloudName="dezmxsi6t" publicId={publicId} />

                <div className='body'>
                    <h1>About me:</h1>
                    {aboutme}
                </div>
                {authState.username === username && <button className='editbutton' onClick={() => { navigate("/editprofile"); }}> Edit Profile</button>}
            </div>
            <div className='postsPage'>
                <div className='profileLeft'>
                    <h1>List of Users Posts</h1>
                    <div className='listOfPosts'>
                        {listOfUserPosts.map((values, key) => {
                            return (
                                <div key={key} className='post'>
                                    <div className='title'>{values.title}</div>
                                    <div className='body' onClick={() => { navigate(`/post/${values.id}`); }}>{values.postText}</div>
                                    <div className='footer'>
                                        <div className='username'>
                                            {values.username}
                                        </div>
                                        <div className="buttons">


                                            <label>{values.Ratings.length}</label>

                                        </div>
                                    </div>

                                </div>
                            );
                        })}

                    </div>
                </div>
                <div className='profileRight'>
                    <h1>List of Favorited Posts</h1>
                    <div className='listOfPosts'>
                        {listOfFavoritedPosts.map((value, key) => {
                            return (
                                <div key={key} className='post'>
                                    <div className='title'>{value.title}</div>
                                    <div className='body' onClick={() => { navigate(`/post/${value.id}`); }}>{value.postText}</div>
                                    <div className='footer'>
                                        <div className='username'>
                                            {value.username}
                                        </div>
                                        <div className="buttons">

                                            <label>{value.Ratings.length}</label>

                                        </div>
                                    </div>

                                </div>
                            );
                        })}

                    </div>
                </div>
            </div>
        </div>
    );

}

export default Profile;