import React, { useState } from 'react'
import * as S from './styles'
import { Link,useNavigate } from 'react-router-dom'
import Logo from '../../assets/logo.svg'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { passwordStrength } from 'check-password-strength'
import axios from 'axios'
import { RegisterRoute } from '../../utils/ApiRouter'

function Register() {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    username: "",
    email: "",
    confirmPassword: "",
    password: ""
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (handleValidation()) {
      const { username, email, password } = values;
      await axios.post(
        RegisterRoute, {
          username,
          email,
          password
        }
      ).then((resp) => {
        navigate('/login')
      }).catch((error) => {
        if (error.response) {

          toast.error(
            error.response.data.message,
            toastOptions
          )
        } else if (error.request) {
          toast.error(error.request.data.message, toastOptions)
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
    const { confirmPassword, username, email, password } = values;
    const passwordWeight = passwordStrength(password).value
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be some.",
        toastOptions
      )
      return false
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters",
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
    } else if (email === "") {
      toast.error(
        "Email is required",
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
            placeholder='Username'
            name='username'
            onChange={(e) => {
              handleChange(e)
            }}
          />
          <input
            type='email'
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
          <input
            type='password'
            placeholder='Password'
            name='confirmPassword'
            onChange={(e) => {
              handleChange(e)
            }}
          />
          <button type="submit">Create user</button>
          <span>
            Already have an account?
            <Link to="/Login">Login</Link>
          </span>
        </form>
      </S.FormContainer>
      <ToastContainer />
    </>
  )
}

export default Register