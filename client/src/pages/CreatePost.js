import React, { useContext, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from "yup"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../helpers/AuthContext';

function CreatePost() {



    const { authState } = useContext(AuthContext);

    const initialValues = {
        title: "",
        postText: ""
    };
    let navigate = useNavigate();

    const onSubmit = (data) => {


        axios.post("http://localhost:3001/posts", data, {
            headers: { accessToken: localStorage.getItem("accessToken") }
        }).then((response) => {
            navigate("/")
        })
    };

    useEffect(() => {
        if (!localStorage.getItem("accessToken"))
            navigate("/login")
    }, [])

    const validationSchema = Yup.object().shape({
        title: Yup.string().required(),
        postText: Yup.string().required()
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

                    <button type='submit'>Submit</button>
                </Form>
            </Formik>
        </div>
    );

}

export default CreatePost