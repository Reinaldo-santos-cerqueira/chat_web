import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 2rem;
    padding-bottom: 0.3rem;
    .input-container {
        width: 100%;
        border-radius: 2rem; 
        display: flex;
        align-items: center;
        gap: 2rem;
        background-color: #ffffff34;
        
        input {
            width: 90%;     
            height: 60%;
            background-color: transparent;
            color: white;
            border: none;
            padding-left: 1rem;
            font-size: 1.2rem;
            outline: none;
            &::selection {
                background-color: #918ff3;
            }

        }
        button {
            padding: 0.3rem 2rem;
            border-radius: 2rem;
            justify-content: center;
            background-color: #9a86f3;
            border: none;
             svg {
                font-size: 2rem;
                color: white;
            } 
        }
        
    }
`
