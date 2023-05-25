import React from 'react';
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
        <div className="container mt-4">
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}>
                {({ errors }) => (

                    <Form className='form-outline mb-4'>

                        <label class="form-label mt-4">Username:</label>
                        <ErrorMessage style={{color: "red"}} name='username' component="span" />
                        <Field
                            type="text"
                            class="form-control"
                            name="username"
                            placeholder="Insert user" />

                        <label for="exampleInputPassword1" class="form-label mt-4">Password:</label><br/>

                        <ErrorMessage style={{color: "red"}} name='password' component="span" />
                        <Field
                            class="form-control"
                            id="exampleInputPassword1"
                            type="password"
                            name="password"
                            placeholder="Insert password" />


                        <label for="exampleInputPassword1" class="form-label mt-4">Password Confirm</label><br/>
                        <ErrorMessage style={{color: "red"}} name='confirm' component="span" />
                        <Field
                            class="form-control"
                            id="exampleInputPassword1"
                            type="password"
                            name="confirm"
                            placeholder="Confirm password" />

                        <label for="exampleInputEmail1" class="form-label mt-4">Email address</label><br/>
                        <ErrorMessage style={{color: "red"}} name='email' component="span" />
                        <Field
                            class="form-control"
                            id="exampleInputEmail1"
                            type="email"
                            name="email"
                            placeholder="Insert email" />
                        <br />
                        <div class="d-grid gap-2">
                            <button class="btn btn-md btn-primary" type="submit">Register</button>
                        </div>

                    </Form>
                )}
            </Formik>
        </div>
    )


}

export default Register;