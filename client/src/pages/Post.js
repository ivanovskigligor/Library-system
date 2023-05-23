import React, { useEffect, useState, useContext } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

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
        <div className='postPage'>
            <div className='leftSide'>
                <div className='post' id='individual'>
                    <div className='title'>{postObject.title}</div>
                    <div className='title'>{getGenreName(postObject.GenreId)}</div>
                    <div className='body'>{postObject.author}</div>
                    <div className='body'>{postObject.description}</div>
                    <div className='body'>{postObject.postText}</div>
                    <div className='footer'>
                        {postObject.username}
                        
                        
                    </div>
                    <div style={{display: "inline"}}>
                    {authState.username === postObject.username && (
                            <button
                                onClick={() => deletePost(postObject.id)}>Delete Post</button>

                        )}
                        {authState.username === postObject.username && (
                            <button
                                onClick={() => { navigate(`/editpost/${postObject.id}`); }}>Edit Post</button>

                        )}
                        </div>
                </div>
            </div>
            <div className='rightSide'>

                <div className='listOfComments'>
                    {comments.map((comment, key) => {
                        return (

                            <div key={key} className='comment'>
                                {comment.commentBody}
                                <label>Username: {comment.username}</label>
                                {authState.username === comment.username && (
                                    <button
                                        onClick={() => deleteComment(comment.id)}>X</button>)}
                            </div>
                        )
                    })}
                </div>
                <div className="addCommentContainer">
                    <input
                        type="text"
                        placeholder=""
                        value={newComment}
                        onChange={(event) => {
                            setNewComment(event.target.value);
                        }}
                    />
                    <button onClick={addComment}> Add Comment</button>
                </div>
            </div>
        </div>)


}

export default Post;