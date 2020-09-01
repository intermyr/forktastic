import React from "react";
import styled from "styled-components";

export const InfoButtons = styled.div`
  display: flex;
  margin-left: auto;
  visibility: hidden;
  transform: translateY(5px);
  transition: all 0.4s;

  @media only screen and (max-width: 900px) {
    & {
      transform: initial;
      opacity: 1;
      visibility: initial;
    }
  }
`;

const ServingsButton = styled.button`
  height: 1.75rem;
  width: 1.75rem;
  border: none;
  background: none;
  cursor: pointer;

  &:not(:last-child) {
    margin-right: 0.3rem;
  }

  & svg {
    height: 100%;
    width: 100%;
    fill: #f59a83;
    transition: all 0.3s;
  }
  &:hover svg {
    fill: #f48982;
    transform: translateY(-1px);
  }

  &:active svg {
    fill: #f48982;
    transform: translateY(0);
  }
`;

const DetailsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8rem 3rem 3rem 3rem;

  @media only screen and (max-width: 400px) {
    & {
      display: grid;
      grid-template-columns: 2fr 1fr;
      grid-template-rows: 1fr 1fr;
      grid-template-areas:
        "info fav"
        "info fav";
    }
  }
`;

const InfoContainer = styled.div`
  display: flex;
  grid-area: info;
  @media only screen and (max-width: 400px) {
    & {
      flex-direction: column;
    }
  }
`;

const Info = styled.div`
  font-size: 1.5rem;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  
  &:nth-child(2) {
    width: 17.5rem;
  }

  &:first-child {
    margin-right: 4rem;
  }
`;

const InfoIcon = styled.svg`
  height: 2rem;
  width: 2rem;
  fill: #f59a83;
  margin-right: 1rem;
`;

const InfoData = styled.span`
  margin-right: 0.4rem;
  font-weight: 600;
`;

const Fav = styled.button`
  background: linear-gradient(
    315deg,
    rgba(221, 14, 80, 1) 22%,
    rgba(240, 169, 45, 1) 100%
  );
  border-radius: 50%;
  border: none;
  cursor: pointer;
  height: 4.5rem;
  width: 4.5rem;
  margin-left: auto;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  grid-area: fav;

  &:hover {
    transform: scale(1.07);
  }

  & svg {
    height: 2.75rem;
    width: 2.75rem;
    fill: #fff;
  }
`;

const Details = (props) => {
  return (
    <DetailsContainer>
      <InfoContainer>
        <Info>
          <InfoIcon>
            <use href="icons.svg#icon-stopwatch"></use>
          </InfoIcon>
          <InfoData>{props.data.readyInMinutes}</InfoData>
          <span>minutes</span>
        </Info>
        <Info>
          <InfoIcon>
            <use href="icons.svg#icon-man"></use>
          </InfoIcon>
          <InfoData>{props.servings}</InfoData>
          <span>servings</span>
          <InfoButtons>
            <ServingsButton onClick={props.handleDecreaseServings}>
              <svg>
                <use href="icons.svg#icon-circle-with-minus"></use>
              </svg>
            </ServingsButton>
            <ServingsButton onClick={props.handleIncreaseServings}>
              <svg>
                <use href="icons.svg#icon-circle-with-plus"></use>
              </svg>
            </ServingsButton>
          </InfoButtons>
        </Info>
      </InfoContainer>
      <Fav onClick={() => props.handleFavorites(props.data)}>
        <svg>
          <use
            href={
              props.favorites.some((item) => item.id === props.data.id)
                ? "icons.svg#icon-heart"
                : "icons.svg#icon-heart-outlined"
            }
          ></use>
        </svg>
      </Fav>
    </DetailsContainer>
  );
};

export default Details;
