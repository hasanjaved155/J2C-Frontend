import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Project = (props) => {
    const { img, disc, link } = props?.item;
    return (
        <Container className='project bg-red-600'>
            <Link
                to={link}
            >
                <img src={img} alt="project" />
                <div className="disc">
                    <h1>Description</h1>
                    <p>{disc}
                        {/* <a href="#">demo</a> */}
                    </p>
                </div>
            </Link>
        </Container>
    )
}

export default Project;

const Container = styled.div`
    height: 10rem;
    background-color: #dbdbdb;
    margin: 0 0.5rem;
    padding: 0.3rem;
    border-radius: 5px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 400ms ease-in-out;
    }
    .disc{
        position: absolute;
        right: 0;
        left: 0;
        bottom: -10rem;
        text-align: left;
        padding: 0.5rem;
        color:white;
        background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.8));
        transition: all 400ms ease-in-out;
        h1{
            font-size: 1rem;
        }
    
        p{
            width: 90%;
            font-size: 0.8rem;
            a{
                margin-left: 0.4rem;
                color: red;
            }
        }
    }

    :hover > img{
        transform: scale(1.2);
    }

    :hover > .disc{
        bottom: 0;
    }

`