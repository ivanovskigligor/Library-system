import React, { useContext, useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from "yup"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../helpers/AuthContext';

function CreatePost() {



    const { authState } = useContext(AuthContext);
    const [genres, setGenres] = useState([]);


    const initialValues = {
        title: "",
        postText: "",
        author: "",
        description: "",
        genreId: "",
        postphoto: "",
    };
    let navigate = useNavigate();

    const onSubmit = (data) => {

        data.publicId = publicId; // Include publicId in form data
        axios.post("http://localhost:3001/posts", data, {
            headers: { accessToken: localStorage.getItem("accessToken") }
        }).then((response) => {
            console.log(data)
            navigate("/")
        })
    };

    useEffect(() => {
        if (!localStorage.getItem("accessToken"))
            navigate("/login")

        axios.get('http://localhost:3001/genres').then((response) => {
            setGenres(response.data.genres);
        });

    }, [])

    const validationSchema = Yup.object().shape({
        title: Yup.string().required(),
        postText: Yup.string().required(),
        author: Yup.string().required(),
        description: Yup.string().required(),
        genreId: Yup.string().required(),
    });


    // connosons
    const [imageSelected, setImageSelected] = useState("")
    const [publicId, setPublicId] = useState("");

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


    const saveChanges = () => {
        console.log(publicId)
        axios.put("http://localhost:3001/users/changepicture",
            {
                publicId: publicId,
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
                alert("Profile picture was changed")
                // ili toa ili uste na edit profile
                navigate(`/profile/${authState.id}`)
            }
        })
    }

    return (
        <div className='container mt-4'>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}>

                <Form className='form-outline mb-4'>

                    <label class="form-label mt-4">Title:</label>
                    <ErrorMessage style={{ color: "red" }} name='title' component="span" />
                    <Field
                        type="text"
                        id="inputCreatePost"
                        class="form-control"
                        name="title"
                        placeholder="Insert Title" />

                    <label class="form-label mt-4">Author:</label>
                    <ErrorMessage style={{ color: "red" }} name='author' component="span" />
                    <Field
                        type="text"
                        id="inputCreatePost"
                        class="form-control"
                        name="author"
                        placeholder="Insert text" />

                    <label class="form-label mt-4">Description:</label>
                    <ErrorMessage style={{ color: "red" }} name='description' component="span" />
                    <Field
                        component="textarea"
                        id="inputCreatePost"
                        class="form-control"
                        name="description"
                        placeholder="Insert text"
                        rows="3" />

                    <label class="form-label mt-4">Post:</label>
                    <ErrorMessage style={{ color: "red" }} name='postText' />
                    <Field
                        component="textarea"
                        id="inputCreatePost"
                        class="form-control"
                        name="postText"
                        placeholder="Insert text"
                        rows="5" />

                    <label class="form-label mt-4">Genre:</label>
                    <ErrorMessage style={{ color: "red" }} name='genreId' component='span' />
                    <Field class="form-control" as='select' id='inputCreatePost' name='genreId'>
                        <option>Select Genre</option>
                        {genres.map((genre) => (
                            <option key={genre.id} value={genre.id}>
                                {genre.genre}
                            </option>
                        ))}
                    </Field>

                    <div className='form-group'>
                        <label for="formFile" class="form-label mt-4" aria-describedby="button-addon2">Select a book cover from your files</label>
                        <br />
                        <div class="input-group mb-3">
                            <input class="form-control" type='file' id="formFile" aria-describedby="button-addon2" onChange={(event) => {
                                setImageSelected(event.target.files[0])
                            }} />
                            <button class="btn btn-sm btn-primary " id="button-addon2" type="button" onClick={uploadImage}>Upload Image</button>
                        </div>
                        <p class="text-danger">Wait a second for confimation of image upload before continuing.</p>
                    </div>

                    <div class="d-grid gap-2">
                        <button class="btn btn-md btn-primary" type="submit">Submit</button>
                    </div>

                </Form>
            </Formik>
        </div>
    );

}

export default CreatePost