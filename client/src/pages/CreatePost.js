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

                    <label>Post:</label>
                    <ErrorMessage name='postText' component="span" />
                    <Field
                        id="inputCreatePost"
                        name="postText"
                        placeholder="Insert text" />

                    <button type='submit'>Submit</button>
                </Form>
            </Formik>
        </div>
    );

}

export default CreatePost