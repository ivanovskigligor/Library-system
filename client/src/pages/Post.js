import React, { useEffect, useState, useContext } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Image } from "cloudinary-react"

import { AuthContext } from '../helpers/AuthContext';

function Post() {

    let navigate = useNavigate();
    let { id } = useParams();
    const [postObject, setPostObject] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const { authState } = useContext(AuthContext);
    const [genres, setGenres] = useState([]);


    useEffect(() => {

        axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
            setPostObject(response.data);
        });

        axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
            setComments(response.data);
        });
        axios.get('http://localhost:3001/genres').then((response) => {
            setGenres(response.data.genres);
        });
    }, []);

    const deleteComment = (id) => {
        axios.delete(`http://localhost:3001/comments/${id}`, {
            headers: { accessToken: localStorage.getItem("accessToken") },
        }).then(() => {
            setComments(comments.filter((val) => {
                return val.id != id;
            }))
        });
    }

    const addComment = () => {
        axios.post("http://localhost:3001/comments",
            { commentBody: newComment, PostId: id },
            { headers: { accessToken: localStorage.getItem("accessToken") } }).then((response) => {
                if (response.data.error) {
                    console.log(response.data.error);
                } else {
                    const commentToAdd = { commentBody: newComment, username: response.data.username }
                    setComments([...comments, commentToAdd]);
                    setNewComment("");
                }
            });
    };

    const deletePost = (id) => {
        axios
            .delete(`http://localhost:3001/posts/${id}`, {
                headers: { accessToken: localStorage.getItem("accessToken") },
            })
            .then(() => {
                navigate("/");
            });
    };

    const getGenreName = (genreId) => {
        const genre = genres.find((genre) => genre.id === genreId);
        return genre ? genre.genre : '';
    };
    const [listOfPosts, setListOfPosts] = useState([]);


    return (
        <div class="p-3 mb-2 background">
            <div className="container text-dark p-2">
                <div className="card p-2">
                    <h3 className="card-header" onClick={() => navigate(`/post/${postObject.id}`)}>{postObject.title}</h3>
                    <div className="card-body">
                        <h5 className="card-title">{postObject.author}</h5>
                        <h6 className="card-subtitle text-muted">{getGenreName(postObject.GenreId)}</h6>
                    </div>

                    <div className="border-top border-dark d-flex">
                        <div className="col-md-6 d-flex justify-content-center p-2">
                            <Image cloudName="dezmxsi6t" className="w-100" publicId={postObject.postphoto} />
                        </div>

                        <div className="col-md-6 p-4 d-flex flex-column">
                            <div className=" card-text">
                                <h3 className="card-subtitle">Preview:<br /></h3>
                                <p class="text-primary"> {postObject.description}</p>
                            </div>
                            <div>
                                <h3 className="card-subtitle">Review:<br /></h3>
                                <p class="text-primary"> {postObject.postText}</p>
                            </div>
                        </div>
                    </div>


                    {authState.username === postObject.username && (
                        <div className="btn-group" role="group">
                            <button className="btn btn-md btn-primary" type="button" onClick={() => deletePost(postObject.id)}>Delete Post</button>
                            <button className="btn btn-md btn-primary" type="button" onClick={() => { navigate(`/editpost/${postObject.id}`); }}>Edit Post</button>
                        </div>
                    )}

                </div>
            </div>


            <div className="container text-dark p-2">
                <div className="card p-2">
                    <div className="">
                        {comments.map((comment, key) => {
                            return (
                                <div key={key} class="list-group list-group-flush border border-dark">
                                    <li class="list-group-item d-flex justify-content-between align-items-center">
                                        <div>
                                            <h5 class="form-label">Username: {comment.username}</h5>
                                            
                                            {comment.commentBody}
                                        </div>

                                        {authState.username === comment.username && (
                                            <button className="btn btn-sm btn-primary" type="button" onClick={() => deleteComment(comment.id)}>X</button>
                                        )}
                                    </li>
                                </div>
                            );
                        })}

                        <label class="form-label mt-4" for="readOnlyInput">Readonly input</label>
                        <div class="input-group mb-3">
                            <input
                                class="form-control"
                                id="readOnlyInput"
                                type="text"
                                placeholder=""
                                value={newComment}
                                onChange={(event) => {
                                    setNewComment(event.target.value);
                                }}
                            />
                            <button class="btn btn-primary" type="button" id="button-addon2" onClick={addComment}>Add Comment</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>)


}

export default Post;