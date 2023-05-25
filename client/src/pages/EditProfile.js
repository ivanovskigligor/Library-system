import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

import { AuthContext } from '../helpers/AuthContext';
import { useNavigate, useParams } from "react-router-dom";



function EditProfile() {


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

    const saveChanges = () => {
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
        <div className="background">
        <div className="container p-3 mb-2  text-white">

            <h1 className="text-white">Edit Profile:</h1>

            <div class="form-group">
                <label for="exampleInputPassword1" class="form-label mt-4">Change Password</label>

                <input type="password" placeholder="old password" class="form-control" onChange={(event) => {
                    setOldPassword(event.target.value)
                }}></input>
                <input type="password" placeholder="new password" class="form-control" onChange={(event) => {
                    setNewPassword(event.target.value)
                }}></input>
                <button class="btn btn-sm btn-primary mt-2" onClick={changePassword}>Change Password</button>
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1" class="form-label mt-4">Change Username:</label>
                <input type="text" class="form-control" defaultValue={ogUsername} onChange={(event) => {
                    setNewUsername(event.target.value)
                }}></input>
                <button class="btn btn-sm btn-primary mt-2" onClick={changeUsername}>Change Username</button>
            </div>


            <div class="form-group">
                <label for="exampleTextarea" class="form-label mt-4">Change About Me:</label>
           

            <textarea type="text" class="form-control" id="exampleTextarea" rows="3" defaultValue={aboutme} onChange={(event) => {
                setNewAboutMe(event.target.value)
            }}></textarea>
            <button class="btn btn-sm btn-primary mt-2" onClick={changeAboutMe}>Change About Me</button>
            </div>

            
            
            <div className='form-group'>
                <label for="formFile" class="form-label mt-4" aria-describedby="button-addon2">Select new profile photo</label>
                <br />
                <div class="input-group mb-3">
                    <input class="form-control" type='file' onChange={(event) => {
                        setImageSelected(event.target.files[0])
                    }}></input>
                    <button class="btn btn-sm btn-primary " id="button-addon2" type="button" onClick={uploadImage}>Upload Image</button>
                </div>
                <p class="text-danger">Wait a second for confimation of image upload before continuing.</p>
            </div>

            <button class="btn btn-sm btn-primary" onClick={saveChanges}>Save Image</button>


        </div>
        </div>
    )
}

export default EditProfile;