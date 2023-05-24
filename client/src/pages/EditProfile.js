import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

import { AuthContext } from '../helpers/AuthContext';
import { useNavigate, useParams } from "react-router-dom";



function EditProfile() {

    // let { id } = useParams();
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [publicId, setPublicId] = useState("");
    const navigate = useNavigate();
    const [imageSelected, setImageSelected] = useState("")
    const { authState } = useContext(AuthContext);
    const ogUsername = authState.username
    const ids = authState.id;
    const [aboutme, setAboutMe] = useState("");

    useEffect(() => {

        axios.get(`http://localhost:3001/users/basicinfo/${ids}`).then((response) => {
            setAboutMe(response.data.aboutme)
        })

    }, []);

    const changePassword = () => {

        if (oldPassword === "" || newPassword === "") {
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
            })
        };
    }


    const [newUsername, setNewUsername] = useState("");


    const changeUsername = () => {
        if (newUsername === "") {
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
            })
        };
    }


    const [newAboutMe, setNewAboutMe] = useState("");

    const changeAboutMe = () => {
        if (newAboutMe === "") {
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
            })
        };
    };

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

    const saveChanges = () =>{
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
        <div>
            <h1>Change Password:</h1>
            <input type="text" placeholder="old password" onChange={(event) => {
                setOldPassword(event.target.value)
            }}></input>
            <input type="text" placeholder="new password" onChange={(event) => {
                setNewPassword(event.target.value)
            }}></input>
            <button onClick={changePassword}>Change Password</button>

            <h1>Change Username:</h1>
            <input type="text" defaultValue={ogUsername} onChange={(event) => {
                setNewUsername(event.target.value)
            }}></input>
            <button onClick={changeUsername}>Change Username</button>

            <h1>Change About Me:</h1>
            <textarea type="text" defaultValue={aboutme} onChange={(event) => {
                setNewAboutMe(event.target.value)
            }} rows="10" cols="70"></textarea>
            <button onClick={changeAboutMe}>Change About Me</button>

            {/* test */}
            <h1>Change Profile Photo:</h1>
            <input type='file' onChange={(event) => {
                setImageSelected(event.target.files[0])
            }}></input>
            <button onClick={uploadImage}>Change Image</button>
            <button onClick={saveChanges}>Save Image</button>


        </div>

    )
}

export default EditProfile;