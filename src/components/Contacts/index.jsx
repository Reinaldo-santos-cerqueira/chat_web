import React, { useEffect, useState } from 'react'
import Logo from '../../assets/logo.svg'
import * as S from './styles'
export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState('')
  const [currentUserImage, setCurrentUserImage] = useState('')
  const [currentUserSelected, setCurrentUserSelected] = useState('')
  
  useEffect(() => {
    console.log();
      setCurrentUserName(localStorage.getItem('chat-app-username'))
      setCurrentUserImage(localStorage.getItem('chat-app-imageURL'))
  })

  const changeCurrentChat = (index, contact) => {
    setCurrentUserSelected(index);
    changeChat(contact)
  };
  return (
    <>
      {currentUserImage && (
        <S.Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>snappy</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${index === currentUserSelected ? "selected" : ""
                    }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={contact.avatarImage === '' ? 'https://triunfo.pe.gov.br/pm_tr430/wp-content/uploads/2018/03/sem-foto.jpg' :`${contact.avatarImage}`}
                      alt={`${contact.username}`}
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <S.CurrentUser>
            <div className="avatar">
              <img
                src={currentUserImage}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </S.CurrentUser>
        </S.Container>
      )}
    </>
  );
}
