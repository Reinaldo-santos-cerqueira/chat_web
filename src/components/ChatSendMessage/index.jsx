import React, { useState } from 'react'
import * as S from './styles'
import { IoMdSend } from 'react-icons/io'
import { BsEmojiSmileFill } from 'react-icons/bs'
import Picker from 'emoji-picker-react';

export default function ChatSendMessage({ handleSendMsg }) {

    const [msg, setMsg] = useState('')

    const sendChat = (event) => {
        event.preventDefault()
        
        if (msg.length > 0) {
            
            handleSendMsg(msg)
        
            setMsg('')

        }

    } 

    return (
        <S.Container>
            <form className='input-container' onSubmit={(e)=>sendChat(e)}>
                <input
                    type="text"
                        placeholder='Type your message here'
                        value={msg}
                        onChange={(e)=> setMsg(e.target.value)}
                />
                <button className="submit">
                    <IoMdSend/>
                </button>
            </form>
        </S.Container>
  )
}
