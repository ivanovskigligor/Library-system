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
    const [genres, setGenres] = useState([]);


    useEffect(() => {
        axios.get(`/users/basicinfo/${id}`).then((response) => {
            setUsername(response.data.username)
        })
        axios.get(`/users/basicinfo/${id}`).then((response) => {
            setPublicId(response.data.profilephoto)
        })
        axios.get(`/users/basicinfo/${id}`).then((response) => {
            setAboutMe(response.data.aboutme)
        })
        axios.get(`/posts/byUserId/${id}`).then((response) => {
            setListOfUserPosts(response.data)
        })
        axios.get(`/posts/byFavoriteId/${id}`).then((response) => {
            setListOfFavoritedPosts(response.data)
        })
        axios.get('/genres').then((response) => {
            setGenres(response.data.genres);
        });
    }, []);

    const getGenreName = (genreId) => {
        const genre = genres.find((genre) => genre.id === genreId);
        return genre ? genre.genre : '';
    };

    return (
        <div className='mb-2 background'>

            <div class="d-flex list-group-item list-group-item-action flex-column align-items-start active">
                <div class="d-flex w-100 justify-content-between">
                    <div class="col-md-2 mb-1  justify-content-center">
                        <h1>Username: {username}</h1>
                        <Image class="img-thumbnail rounded w-100 mb-2  " cloudName="dezmxsi6t" publicId={publicId} />
                        {authState.username === username && <button class="btn btn-secondary mt-6" onClick={() => { navigate("/editprofile"); }}> Edit Profile</button>}
            
                    </div>
                    <div class="col-md-6 mb-1 text-right">
                        <h1>About me:</h1>
                        {aboutme}
                    </div>
                </div>
            </div>




            <hr />

            <div className="p-3 mb-2 text-white">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h1 className='text-white'>List of Users Posts</h1>
                            <div className="listOfPosts">
                                {listOfUserPosts.map((value, key) => {
                                    return (
                                        <div key={key} className="container text-dark mt-4 w-100 p-2" style={{ width: "80%" }}>
                                            <div className="card mb-3 w-md-50 p-2 mx-auto">
                                                <h3 className="card-header" onClick={() => navigate(`/post/${value.id}`)}>{value.title}</h3>
                                                <div className="card-body">
                                                    <h5 className="card-title">{value.author}</h5>
                                                    <h6 className="card-subtitle text-muted">{getGenreName(value.GenreId)}</h6>
                                                </div>

                                                <div className="border-top border-dark d-flex">
                                                    <div className="col-md-6 d-flex justify-content-center p-2">
                                                        <Image cloudName="dezmxsi6t" className="w-100" publicId={value.postphoto} />
                                                    </div>
                                                    <div className="col-md-6 p-4 d-flex align-items-center">
                                                        <div className="card-text">
                                                            <h6 className="card-subtitle">Preview:<br /></h6>
                                                            {value.description}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <h1 className='text-white'>List of Favorited Posts</h1>
                            <div className="listOfPosts">
                                {listOfFavoritedPosts.map((value, key) => {
                                    return (
                                        <div key={key} className="container text-dark mt-4 w-100 p-2" style={{ width: "80%" }}>
                                            <div className="card mb-3 w-md-50 p-2 mx-auto">
                                                <h3 className="card-header" onClick={() => navigate(`/post/${value.id}`)}>{value.title}</h3>
                                                <div className="card-body">
                                                    <h5 className="card-title">{value.author}</h5>
                                                    <h6 className="card-subtitle text-muted">{getGenreName(value.GenreId)}</h6>
                                                </div>

                                                <div className="border-top border-dark d-flex">
                                                    <div className="col-md-6 d-flex justify-content-center p-2">
                                                        <Image cloudName="dezmxsi6t" className="w-100" publicId={value.postphoto} />
                                                    </div>
                                                    <div className="col-md-6 p-4 d-flex align-items-center">
                                                        <div className="card-text">
                                                            <h6 className="card-subtitle">Preview:<br /></h6>
                                                            {value.description}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );

}

export default Profile;