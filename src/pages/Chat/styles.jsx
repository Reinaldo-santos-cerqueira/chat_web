import styled from 'styled-components'

export const container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #131324;
    .container{
        width: 85vw;
        height: 85vh;
        display: grid;
        border-radius: 20px;
        background-color: #00000076;
        grid-template-columns: 25% 75%;
        @media screen and (min-width: 720px) and (max-width: 1080px){
            grid-template-columns: 35% 65%;
        }
    }

`