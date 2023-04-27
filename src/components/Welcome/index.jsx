import React from 'react'
import * as S from './styles'
import Robot from '../../assets/robot.gif'
const Welcome= () => {
  return (
    <S.Container>
      <img src={Robot} alt="Robot" />
      <div className="title">
        <h1>Welcome,<span>{localStorage.getItem('chat-app-username')}</span></h1>
        <h3>Please select a chat to start messagin</h3>
      </div>
    </S.Container>
  )
}

export default Welcome