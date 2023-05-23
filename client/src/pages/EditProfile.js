import React, { useState , useContext} from "react";
import axios from "axios";

import { AuthContext } from '../helpers/AuthContext';
import { useNavigate  } from "react-router-dom";



function EditProfile() {

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const navigate = useNavigate();

    const { authState } = useContext(AuthContext);

    const changePassword = () => {

        if(oldPassword === "" || newPassword === ""){
            alert("Fields cannot be empty")
        } else {
        axios.put("http://localhost:3001/users/editpassword",
        
            {
                oldPassword: oldPassword, newPassword: newPassword
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
                alert("password was changed")
                // ili toa ili uste na edit profile
                navigate(`/profile/${authState.id}`)
            }
        })};
    }


    const [newUsername, setNewUsername] = useState("");
    
    
    const changeUsername = () => {
        if(newUsername === ""){
            alert("Fields cannot be empty")
        } else {
        axios.put("http://localhost:3001/users/editusername",
            {
                newUsername: newUsername,
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
                alert("Username was changed. Login again to see changes")
                // ili toa ili uste na edit profile
                navigate(`/profile/${authState.id}`)
            }
        })};
    }


    const [newAboutMe, setNewAboutMe] = useState("");
    const changeAboutMe = () => {
        if(newAboutMe === ""){
            alert("Fields cannot be empty")
        } else {
        axios.put("http://localhost:3001/users/editaboutme",
            {
                newAboutMe: newAboutMe,
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
                alert("About Me was changed")
                // ili toa ili uste na edit profile
                navigate(`/profile/${authState.id}`)
            }
        })};
    }

    return (
        <div>
            <h1>Change Password:</h1>
            <input type="text" placeholder="" onChange={(event) => {
                setOldPassword(event.target.value)
            }}></input>
            <input type="text" placeholder="new password" onChange={(event) => {
                setNewPassword(event.target.value)
            }}></input>
            <button onClick={changePassword}>Change Password</button>

            <h1>Change Username:</h1>
            <input type="text" placeholder="" onChange={(event) => {
                setNewUsername(event.target.value)
            }}></input>
            <button onClick={changeUsername}>Change Username</button>

            <h1>Change About Me:</h1>
            <textarea type="text" placeholder="" onChange={(event) => {
                setNewAboutMe(event.target.value)}} rows="10" cols="70"></textarea>
            <button onClick={changeAboutMe}>Change Username</button>

        </div>

    )
}

export default EditProfile;