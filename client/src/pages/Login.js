import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from '../helpers/AuthContext';

function Login() {
    let navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const { setAuthState } = useContext(AuthContext)

    const login = () => {
        const data = { username: username, password: password }
        axios.post("http://localhost:5060/users/login", data).then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            } else {
                localStorage.setItem("accessToken", response.data.token);
                setAuthState({
                    username: response.data.username,
                    id: response.data.id,
                    status: true,
                });
                navigate("/")
            }
        })
    }

    return (
        <div class="p-3 mb-2  background">
            <div class="container text-white">
                <div className='form-outline mb-4'>
                    <label class="form-label mt-4">Username:</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter username" onChange={(event) => {
                        setUsername(event.target.value)
                    }} />
                </div>

                <div className='form-outline mb-4'>

                    <label for="exampleInputPassword1" class="form-label mt-4">Password:</label>

                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" onChange={(event) => {
                        setPassword(event.target.value)
                    }} />

                </div>
                <div class="d-grid gap-2">
                    <button class="btn btn-md btn-primary" type="button" onClick={login}>Login</button>
                </div>
            </div>
        </div>

    )


}

export default Login;