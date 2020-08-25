import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 4rem;
  padding-bottom: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DirectionsHeading = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  color: #f59a83;
  text-transform: uppercase;
  margin-bottom: 2.5rem;
  text-align: center;
`;

const DirectionsList = styled.ul`
  list-style-type: none;
  padding: 0rem 3rem;
`;

const DirectionsStep = styled.li`
  font-size: 1.5rem;
  margin: 0.5rem 0;
`;

const DirectionsNumber = styled.span`
  margin-right: 0.5rem;
  color: orange;
  font-weight: bold;
`;

const Directions = (props) => {
    const listDirections = props.data
    ? props.data.analyzedInstructions[0]?.steps.map((item) => (
        <DirectionsStep key={item.number}>
          <DirectionsNumber>{item.number}.</DirectionsNumber>
          {item.step.replace(/\.(?=[^\s])/g, ". ")}
        </DirectionsStep>
      ))
    : null;

  return (
    <Container>
      <DirectionsHeading>How to cook it</DirectionsHeading>
      <DirectionsList>{listDirections}</DirectionsList>
    </Container>
  );
};

export default Directions;
