import React from "react";
import styled from "styled-components";

import { Zoom } from "react-awesome-reveal";
import SliderComp from './SliderComp';


const Projects = () => {
  return (
    <Container className="bg-green-500" id="project">
      <Zoom>
        <h1>
          Recent <span className="green">Stories</span>
        </h1>
        <p>
          Trusted by the world's best organizations, for 15 years and running, it has been delivering smiles to hundreds of IT advisors, developers, users, and business owners. Easy solutions for all difficult IT problems to ensure high availability.
        </p>
      </Zoom>
      <Slide>
        <SliderComp />
      </Slide>
    </Container>
  );
};

export default Projects;

const Container = styled.div`
  width: 80%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 3rem 0;
  text-align: center;
  position: relative;
  @media (max-width: 840px) {
    width: 90%;
  }
  h1 {
    font-size: 1.9rem;
  }

  p {
    width: 28rem;
    margin: 0 auto;
    padding: 1rem 0;
    font-size: 0.9rem;
    @media (max-width: 500px) {
      width: 90%;
    }
  }
`
const Slide = styled.div``
