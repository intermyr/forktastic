import React from "react";
import styled from "styled-components";

const Container = styled.div`
  counter-reset: step;
  padding: 2rem 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DirectionsList = styled.ul`
  list-style-type: none;
  padding: 0rem 3rem;
`;

const DirectionsStep = styled.li`
  font-size: 1.5rem;
  margin: 0.5rem 0;

  &::before {
    counter-increment: step;
    content: counter(step) ".";
    margin-right: 0.5rem;
    color: orange;
    font-weight: bold;
    margin-right: 0.5rem;
  }
`;

const Directions = (props) => {
  const listDirections = props.data
    ? props.data.analyzedInstructions[0]?.steps.map((item) => (
        <DirectionsStep key={item.number}>
          {item.step.replace(/\.(?=[^\s])/g, ". ")}
        </DirectionsStep>
      ))
    : null;

  return (
    <Container>
      <DirectionsList>{listDirections}</DirectionsList>
    </Container>
  );
};

export default Directions;
