import styled from 'styled-components'

export const Container = styled.div`
    display: grid;
    grid-template-rows: 10% 75% 15%;
    overflow: hidden;
    background-color: #080420;
    border-bottom-left-radius: 20px;
    border-top-left-radius: 20px;
    .brand{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        img {
            height: 2rem;
        }
        h3 {
            color: white;
            text-transform: uppercase;
        }
    }
    .contacts {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: 0.8rem;
        overflow-y: auto;
        &::-webkit-scrollbar{
            width: 0.2rem;
            &-thumb {
                background-color: #ffffff39;
                width: 0.1rem;
                border-radius: 1rem;
            }
        }
        .contact {
            background-color: #ffffff39;
            min-height: 5rem;
            width: 100%;
            cursor: pointer;
            border-radius: 0.2rem;
            padding: 2rem;
            display: flex;
            align-items: center;
            margin: 0.5rem 0;
            gap:2rem;
            transition: 0.5s ease-in-out;

            .avatar {
                img {
                    height: 3rem;
                    border-radius: 1.5rem;
                }
            }
            .username {
                h3{
                    color: white;
                }
            }
        }
        .selected {
            background-color: #9186f3;
        }
    }

`
export const CurrentUser = styled.div`
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;    
    .avatar{
        flex: 1;
        height: 3.5rem;
        img{
            height: 100%;
            border-radius: 50%;
        }
    }
    .username{
        flex: 1;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        h2{
            color: white;
        }
    }
`
