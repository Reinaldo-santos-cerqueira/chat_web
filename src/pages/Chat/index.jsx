import React, { useEffect, useRef, useState } from 'react'
import * as S from './styles'
import axios from 'axios'
import { AllContacts,host } from '../../utils/ApiRouter'
import { useNavigate } from 'react-router-dom'
import Contacts from '../../components/Contacts'
import Welcome from '../../components/Welcome'
import ChatContainer from '../../components/ChatContainer'
import { io } from 'socket.io-client'

const Chat = () => {
  const socket = useRef()
  const navigate = useNavigate()
  const [contacts, setContacts] = useState([])
  const [currentUser, setCurrentUser] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined)
  const [isLoaded,setIsLoaded] = useState(false)

  useEffect(() => {
    (
      async () => {
        if (!localStorage.getItem('chat-app-email')) {
          navigate('/login')
        }
        if (!localStorage.getItem('chat-app-imageURL')) {
          navigate('/setAvatar')
        }
        await axios.get(`${AllContacts}/${localStorage.getItem('chat-app-email')}`)
          .then((resp) => {

            setContacts(resp.data.message)
          })
          .catch((error) => {
            console.log(error);
          })
        setIsLoaded(true)
      }
    )()
  }, [])

  useEffect(() => {
    if (localStorage.getItem('chat-app-id')) {
      socket.current = io(host)
      socket.current.emit("add-user", localStorage.getItem('chat-app-id'))
    }
  },[currentUser])

  const handleChatChange = (chat) => {
    setCurrentChat(chat)
  }
  return (
    <>
      <S.container>
        <div className="container">
          <Contacts
            contacts={contacts}
            changeChat={handleChatChange}
          />
          {
            isLoaded && currentChat === undefined
              ?
                <Welcome/>
              :
              <ChatContainer
                currentChat={currentChat}
                socket={socket}
              />
          }
        </div>
      </S.container>
    </>
  )
}

export default Chat