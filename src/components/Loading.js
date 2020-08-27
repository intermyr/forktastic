import React from "react";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  `;

const Loader = styled.div`
  margin: 0 auto;
  text-align: center;
  & svg {
    height: 3rem;
    width: 3rem;
    fill: #f59a83;
    transform-origin: 44% 50%;
    animation: ${rotate} 1.5s infinite linear;
  }
`;

const Loading = () => {
  return (
    <Loader>
      <svg>
        <use href="icons.svg#icon-cw"></use>
      </svg>
    </Loader>
  );
};

export default Loading;
