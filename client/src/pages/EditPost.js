import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

import { AuthContext } from '../helpers/AuthContext';
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {

    let navigate = useNavigate();
    let { id } = useParams();
    const [postObject, setPostObject] = useState({});
    const { authState } = useContext(AuthContext);

    const ogTitle = postObject.title;
    const ogAuthor = postObject.author;
    const ogDescription = postObject.description;
    const ogPostText = postObject.postText;

    const [newTitle, setNewTitle] = useState(ogTitle);
    const [newAuthor, setNewAuthor] = useState(ogAuthor);
    const [newDescription, setNewDescription] = useState(ogDescription);
    const [newPostText, setNewPostText] = useState(ogPostText);
  
    

    useEffect(() => {

        axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
            setPostObject(response.data);
        });
    }, []);
    
    const editPost = () => {

        
        axios.put(`http://localhost:3001/posts/editpost`, {
        newTitle: newTitle, newPostText: newPostText, newAuthor: newAuthor, newDescription: newDescription, id: id
    },
            {
                headers:
                {
                    accessToken: localStorage.getItem("accessToken")
                },
            }
        ).then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            } else {
                alert("Post has been edited")
                // ili toa ili uste na edit profile
                navigate(`/post/${id}`)
            }
        })

        
    }



    return (
        <div>
            <h1>Edit Post:</h1>
            <textarea type="text" defaultValue={ogTitle} onChange={(event) => {
                setNewTitle(event.target.value)
            }}></textarea>
            <textarea type="text" defaultValue={ogPostText} onChange={(event) => {
                setNewPostText(event.target.value)
            }}></textarea>
            <textarea type="text" defaultValue={ogAuthor} onChange={(event) => {
                setNewAuthor(event.target.value)
            }}></textarea>
            <textarea type="text" defaultValue={ogDescription} onChange={(event) => {
                setNewDescription(event.target.value)
            }}></textarea>
            <button onClick={editPost}>Save Changes</button>
        </div>
    )
}

export default EditPost;