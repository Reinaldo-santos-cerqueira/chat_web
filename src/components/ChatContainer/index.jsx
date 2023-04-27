import React, { useEffect, useRef, useState } from 'react'
import * as S from './styles'
import Logout from '../logout'
import ChatSendMessage from '../ChatSendMessage'
import { getAllMessageRoute, sendMessageRoute, sendNotifcationRoutes } from '../../utils/ApiRouter'
import axios from 'axios'
import { v4 as uuidv4 } from "uuid";

function ChatContainer({ currentChat, socket }) {
    const [messages, setMessages] = useState([])
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const scrollRef = useRef()

    useEffect(() => {
        (
            async () => {

                if (currentChat) {
                    const response = await axios.post(getAllMessageRoute, {
                        from: localStorage.getItem('chat-app-id'),
                        to: currentChat._id,
                    })
                    setMessages(response.data)
                }
            }
        )()
    },[currentChat])
    

    useEffect(() => {
        if (socket.current) {
            socket.current.on("msg-recieve", (msg) => {
                setArrivalMessage({ fromSelf: false, message: msg });
            });
        }
    }, []);

    useEffect(() => {

        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behaviour: "smooth"}) 
    },[messages])

    const handleSendMsg = async (msg) => {
        axios.post(
            sendMessageRoute,
            {
                from: localStorage.getItem('chat-app-id'),
                to: currentChat._id,
                message: msg
            }
        )
            .then(() => {
                console.log('succes');
            })
            .catch(() => {
                console.log('Error');
            })
        socket.current.emit("send-msg", {
            to: currentChat._id,
            from: localStorage.getItem('chat-app-id'),
            message: msg
        })
        await axios.post(sendNotifcationRoutes,
            {
                id: currentChat._id,
                nameSend: localStorage.getItem('chat-app-username'),
            }
        )
            .then(() => {
                console.log('succes');
            })
            .catch(() => {
                console.log('Error');
            })
        const msgs = [...messages]

        msgs.push({ fromSelf: true, message: msg })

        setMessages(msgs)
    }

    return (
        <S.Container>
            <div className="chat-header">
                {
                    currentChat !== undefined
                        ?
                        <div className='area-header-user'>
                            <div className="avatar">
                                <img
                                    src={currentChat.avatarImage === '' ? 'https://triunfo.pe.gov.br/pm_tr430/wp-content/uploads/2018/03/sem-foto.jpg' : currentChat.avatarImage} alt="Avatar" />
                            </div>
                            <div className="username">
                                <h3>{currentChat.username}</h3>
                            </div>
                        </div>
                        :
                        ''
                }
                <Logout/>
            </div>
            <div
                className='chat-messages'
            >
                {
                    messages.map((message) => {
                        return (
                            <div
                                ref={scrollRef}
                                key={uuidv4()}
                            >
                                <div
                                    className={`message ${message.fromSelf ? "sended":"recieved"}`}
                                >
                                    <div className="content">
                                        <p>
                                            {message.message}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <ChatSendMessage
                handleSendMsg={handleSendMsg}
            />
        </S.Container>
    )
}

export default ChatContainer