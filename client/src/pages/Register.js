import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from "yup"
import { useNavigate } from "react-router-dom";

import axios from "axios";

function Register() {
    const initialValues = {
        username: "",
        password: "",
    };
    // let navigate = useNavigate();

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/auth", data).then((response) => {
            console.log(data)
        })
    };
    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required(),
        password: Yup.string().min(5).max(30).required()

    });

    return (
        <div className='createPostPage'>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}>
                <Form className='formContainer '>

                    <label>User:</label>
                    <ErrorMessage name='username' component="span" />
                    <Field
                        id="inputCreatePost"
                        name="username"
                        placeholder="Insert user" />
                    <label>Password:</label>
                    <ErrorMessage name='password' component="span" />
                    <Field
                        id="inputCreatePost"
                        type="password"
                        name="password"
                        placeholder="Insert password" />
                    <button type='submit'>Submit</button>
                </Form>
            </Formik>
        </div>
    )


}

export default Register;