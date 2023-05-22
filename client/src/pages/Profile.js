import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { AuthContext } from '../helpers/AuthContext';

function Profile() {

    const { authState } = useContext(AuthContext);
    let navigate = useNavigate();
    let { id } = useParams();
    const [username, setUsername] = useState("");
    const [listOfUserPosts, setListOfUserPosts] = useState([]);


    useEffect(() => {
        axios.get(`http://localhost:3001/auth/basicinfo/${id}`).then((response) => {
            setUsername(response.data.username)
        })
        axios.get(`http://localhost:3001/posts/byUserId/${id}`).then((response) => {
            setListOfUserPosts(response.data)
        })
    }, []);

    return (
        <div className='profilePageContainer'>
            <div className='basicInfo'>
                <h1>Username: {username}</h1>
                {authState.username === username && <button onClick={() =>{navigate("/editprofile")}}> Edit Profile</button>}
            </div>
            <div className='listOfPosts'>
                {listOfUserPosts.map((value, key) => {
                    return (
                        <div key={key} className='post' >
                            <div className='title'>{value.title}</div>
                            <div className='body' onClick={() => { navigate(`/post/${value.id}`) }}>{value.postText}</div>
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
            <div className='basicInfo'></div>

        </div>
    );

}

export default Profile;