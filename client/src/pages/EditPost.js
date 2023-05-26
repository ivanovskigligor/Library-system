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
    const ogImage = postObject.postphoto;


    const [newTitle, setNewTitle] = useState(ogTitle);
    const [newAuthor, setNewAuthor] = useState(ogAuthor);
    const [newDescription, setNewDescription] = useState(ogDescription);
    const [newPostText, setNewPostText] = useState(ogPostText);
    const [publicId, setPublicId] = useState(ogImage);
    const [imageSelected, setImageSelected] = useState("")



    useEffect(() => {

        axios.get(`/posts/byId/${id}`).then((response) => {
            setPostObject(response.data);
        });
    }, []);


    const uploadImage = () => {
        const formData = new FormData();
        formData.append("file", imageSelected)
        formData.append("upload_preset", "lje3ooi5")
        axios.post("https://api.cloudinary.com/v1_1/dezmxsi6t/image/upload", formData).then((response) => {
            // Get the public_id of the uploaded image from the response data

            setPublicId(response.data.public_id);
            alert("Image has been uploaded")

        })
            .catch((error) => {
                console.error('Error uploading image:', error);
            });
    }

    const editPost = () => {


        axios.put(`/posts/editpost`, {
            newTitle: newTitle, newPostText: newPostText, newAuthor: newAuthor, newDescription: newDescription, publicId: publicId, id: id
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
        <div className="p-3 mb-2 background text-white">

            <h1 className="text-white">Edit Post:</h1>
            <div class="form-group">
                <label for="exampleTextarea" class="form-label mt-4">Title</label>
                <textarea class="form-control border border-dark" id="exampleTextarea" rows="3" defaultValue={ogTitle} onChange={(event) => {
                    setNewTitle(event.target.value)
                }}></textarea>
            </div>
            <div class="form-group">
                <label for="exampleTextarea" class="form-label mt-4">Post Review</label>
                <textarea class="form-control border border-dark" id="exampleTextarea" rows="3" defaultValue={ogPostText} onChange={(event) => {
                    setNewPostText(event.target.value)
                }}></textarea>
            </div>
            <div class="form-group">
                <label for="exampleTextarea" class="form-label mt-4">Author</label>
                <textarea class="form-control border border-dark" id="exampleTextarea" rows="3" defaultValue={ogAuthor} onChange={(event) => {
                    setNewAuthor(event.target.value)
                }}></textarea>
            </div>
            <div class="form-group">
                <label for="exampleTextarea" class="form-label mt-4">Description</label>
                <textarea class="form-control border border-dark" id="exampleTextarea" rows="3" defaultValue={ogDescription} onChange={(event) => {
                    setNewDescription(event.target.value)
                }}></textarea>
            </div>

            <h1 className="text-white">Change Profile Photo:</h1>
            <div className='form-group'>
                <label for="formFile" class="form-label mt-4" aria-describedby="button-addon2">Select a book cover from your files</label>
                <br />
                <div class="input-group mb-3">
                    <input class="form-control" type='file' onChange={(event) => {
                        setImageSelected(event.target.files[0])
                    }}></input>
                    <button class="btn btn-sm btn-primary " id="button-addon2" type="button" onClick={uploadImage}>Upload Image</button>
                </div>
                <p class="text-danger">Wait a second for confimation of image upload before continuing.</p>
            </div>



            <button class="btn btn-sm btn-primary" onClick={editPost}>Save Changes</button>
        </div>
    )
}

export default EditPost;