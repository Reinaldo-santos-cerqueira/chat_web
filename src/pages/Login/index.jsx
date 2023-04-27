import React, { useEffect, useState } from 'react'
import * as S from './styles'
import { Link,useNavigate } from 'react-router-dom'
import Logo from '../../assets/logo.svg'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { passwordStrength } from 'check-password-strength'
import axios from 'axios'
import { LoginRoute } from '../../utils/ApiRouter'

function Login() {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    email: "",
    password: ""
  })

  useEffect(() => {
    if (localStorage.getItem('chat-app-email')) {
      navigate('/')
    }
  },[])

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (handleValidation()) {

      const { email, password } = values;
      await axios.post(
        LoginRoute, {
          email,
          password
        }
      ).then((resp) => {
        localStorage.setItem('chat-app-email', resp.data.message.email)
        localStorage.setItem('chat-app-id', resp.data.message.id)
        localStorage.setItem('chat-app-username', resp.data.message.username)
        localStorage.setItem('chat-app-isAvatarImageSet', resp.data.message.isAvatarImageSet)
        localStorage.setItem('chat-app-avatarImage', resp.data.message.avatarImage)
        if (localStorage.getItem('chat-app-isAvatarImageSet')) {
          navigate('/')
        } else {
          navigate('/setAvatar')
        }
        
      }).catch((error) => {
        if (error.response) {

          toast.error(
            error.response.data.message,
            toastOptions
          )
        } else if (error.request) {
          toast.error(error.request.data.message, toastOptions)
        } else {
          toast.error(error.data.message, toastOptions)
        }
      })
      
    }

  }

  const toastOptions = {
    position: 'top-right',
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark'
  }

  const handleValidation = () => {
    const { email, password } = values;
    const passwordWeight = passwordStrength(password).value
    if (email === '') {
      toast.error(
        "Please enter valid email",
        toastOptions
      )
    } else if (password.length < 10) {
      toast.error(
        "Password should be greater than 10 characters",
        toastOptions
      )
      return false
    } else if (passwordWeight !== 'Strong') {
      toast.error(
        "Password should be strong",
        toastOptions
      )
      return false
    }
    return true
  }

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  return (
    <>
      <S.FormContainer>
        <form
          onSubmit={(event) => {
            handleSubmit(event)
          }}
        >
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h1>Snappy</h1>
          </div>
          <input
            type='text'
            placeholder='Email'
            name='email'
            onChange={(e) => {
              handleChange(e)
            }}
          />
          <input
            type='password'
            placeholder='Password'
            name='password'
            onChange={(e) => {
              handleChange(e)
            }}
          />
          <button type="submit">Create user</button>
          <span>
            Don't have an account?
            <Link to="/Register">Register</Link>
          </span>
        </form>
      </S.FormContainer>
      <ToastContainer />
    </>
  )
}

export default Login