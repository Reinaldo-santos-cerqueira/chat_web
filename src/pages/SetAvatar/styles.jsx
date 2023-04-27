import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
    background-color: #131324;
    height: 100vh;
    width: 100vw;
    .loader{
        max-inline-size: 100%;
    }
    .title-container {
        h1{
            color: #fff;
            text-transform: uppercase;
        }
    }
    .avatars { 
        display: flex;
        gap: 2rem;
        .avatar{
            height: 100%;
            width: 100%;
            img{
                height: 5rem;
                width: 5rem;
                border-radius: 2.5rem;
                cursor: pointer;
            }
            .selected {
                border: 0.4rem solid #4e0eff;
                padding: 2px;
            }
        }
    }
    button{
        background-color: #997af0;
        color: white;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 1rem;
        text-transform: uppercase;
        transition: 0.5s ease-in-out;
        &:hover{
            background-color: #4e0eff;
        }
    }
`