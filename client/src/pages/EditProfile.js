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
        axios.put("http://localhost:3001/auth/editprofile",
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
        });
    }
    return (
        <div>
            <h1>Change Password:</h1>
            <input type="text" placeholder="old password" onChange={(event) => {
                setOldPassword(event.target.value)
            }}></input>
            <input type="text" placeholder="new password" onChange={(event) => {
                setNewPassword(event.target.value)
            }}></input>
            <button onClick={changePassword}>Save Changes</button>
        </div>

    )
}

export default EditProfile;