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
    };
    let navigate = useNavigate();

    const onSubmit = (data) => {


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


    return (
        <div className='createPostPage'>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}>
                <Form className='formContainer '>
                    <label>Title:</label>
                    <ErrorMessage name='title' component="span" />
                    <Field
                        id="inputCreatePost"
                        name="title"
                        placeholder="Insert Title" />

                    <label>Author:</label>
                    <ErrorMessage name='author' component="span" />
                    <Field
                        id="inputCreatePost"
                        name="author"
                        placeholder="Insert text" />

                    <label>Description:</label>
                    <ErrorMessage name='description' component="span" />
                    <Field
                        component="textarea"
                        id="inputCreatePost"
                        name="description"
                        placeholder="Insert text" />

                    <label>Post:</label>
                    <ErrorMessage name='postText' />
                    <Field
                        component="textarea"
                        id="inputCreatePost"
                        name="postText"
                        placeholder="Insert text"
                        rows="3" cols="10" />

                    <label>Genre:</label>
                    <ErrorMessage name='genreId' component='span' />
                    <Field as='select' id='inputCreatePost' name='genreId'>
                        <option>Select Genre</option>
                        {genres.map((genre) => (
                            <option key={genre.id} value={genre.id}>
                                {genre.genre}
                            </option>
                        ))}
                    </Field>

                    <button type='submit'>Submit</button>
                </Form>
            </Formik>
        </div>
    );

}

export default CreatePost