import React, { useEffect, useState } from 'react'
import * as S from './styles'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../../assets/loader.gif'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import toonavatar from 'cartoon-avatar'
import axios from 'axios'
import { SetAvatarRoute } from '../../utils/ApiRouter'

function SetAvatar() {
    const navigate = useNavigate()
    const [selectedAvatar, setSelectedAvatar] = useState(undefined)
    const [avatars, setAvatars] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    
    const toastOptions = {
        position: 'top-right',
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark'
    }

    const handleClick = () => {
        const email = localStorage.getItem('chat-app-email')
        const imgURL = avatars[selectedAvatar]
        axios.patch(
            SetAvatarRoute,
            {
                email: email,
                imgURL
            }
        )
            .then((resp) => {
                console.log('====================================');
                console.log(resp);
                console.log('====================================');
                localStorage.setItem('chat-app-imageURL', imgURL)
                localStorage.setItem('chat-app-isAvatarImageSet', resp.data.message.isAvatarImageSet)
                navigate('/')
            })
            .catch((e) => {
                console.log('====================================');
                console.log(e);
                console.log('====================================');
            })

    }

    useEffect(() => {
        if (!localStorage.getItem('chat-app-email')) {
            navigate('/Login')
        }
    })

    useEffect(() => {
        const data = []
        let url = ''
        for (let i = 0; i < 4; i++){
            if (i > 1) {
                url = toonavatar.generate_avatar({ "gender": "male" })  
            } else {
                url = toonavatar.generate_avatar({ "gender": "female" })  
            }
            data.push(url)
        }

        setAvatars(data);
        setIsLoading(false);
    },[])

    return (
        <>
            <S.Container>
                <div className="title-container">
                    <h1>
                        Pick an avatar as your profile picture
                    </h1>
                </div>
                <div className='avatars' >
                    {
                        avatars.map((avatar, index) => {
                            return (
                                <div
                                    key={index}
                                    className={`avatar`}
                                >
                                    <img
                                        src={avatar}
                                        alt="Avatar"
                                        className={`${selectedAvatar === index ? "selected" : ""}`}
                                        onClick={() => {
                                            setSelectedAvatar(index)
                                        }}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
                <button type="submit" onClick={handleClick}>set as profile picture</button>
            </S.Container>
            <ToastContainer />
        </>
    )
}

export default SetAvatar