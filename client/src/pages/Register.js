import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from "yup"
import { useNavigate } from "react-router-dom";

import axios from "axios";

function Register() {
    const initialValues = {
        username: "",
        password: "",
        confirmpassword: "",
        email: ""
    };
    let navigate = useNavigate();

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/users", data).then((response) => {
            navigate("/login")
        })
    };
    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required(),
        password: Yup.string().min(5).max(30).required(),
        confirm: Yup
            .string()
            .oneOf([Yup.ref('password'), null], 'Must match "password" field value'),
        email: Yup.string().email().required(),
    });

    return (
        <div className='createPostPage'>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}>
                {({ errors }) => (
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


                        <label>Password Confirm</label>
                        <ErrorMessage name='confirm' component="span" />
                        <Field 
                        id="inputCreatePost"
                        type="password" 
                        name="confirm"
                        placeholder="Confirm password" />

                        <label>Email:</label>
                        <ErrorMessage name='email' component="span" />
                        <Field
                            id="inputCreatePost"
                            type="email"
                            name="email"
                            placeholder="Insert email" />
                        <button type='submit'>Submit</button>

                    </Form>
                )}
            </Formik>
        </div>
    )


}

export default Register;