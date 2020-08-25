import React from "react";
import styled from "styled-components";
import {
  ResultAuthor,
  ResultImg,
  ResultLink,
  ResultFig,
  ResultName,
} from "./SearchList";

const FavoritesContainer = styled.div`
  position: relative;
  align-self: stretch;
  padding: 0;
`;

const FavField = styled.div`
  cursor: pointer;
  padding: 0 4rem;
  display: flex;
  align-items: center;
  height: 100%;
  transition: all 0.3s;

  &:hover {
    background-color: #f2efee;
  }
`;

const FavIcon = styled.svg`
  fill: #f59a83;
  height: 3.75rem;
  width: 3.75rem;
`;

const FavPanel = styled.div`
  position: absolute;
  right: 0;
  top: 10rem;
  z-index: 10;
  padding: 2rem 0;
  width: 34rem;
  background-color: #fff;
  box-shadow: 0 0.8rem 5rem 2rem rgba(101, 90, 86, 0.1);
  visibility: hidden;
  opacity: 0;
  transition: all 0.5s 0.2s;
  
  &:hover,
  ${FavField}:hover + & {
    visibility: ${(props) => (props.open ? "visible" : "hidden")};
    opacity: 1;
  }
`;

const FavList = styled.ul`
  list-style: none;
`;
const Favorites = (props) => {
  const listFavs = props.favorites
    ? props.favorites.map((item) => (
        <li onClick={() => props.handleRecipe(item.id)}>
          <ResultLink>
            <ResultFig>
              <ResultImg src={item.image} alt={item.title} />
            </ResultFig>
            <div>
              <ResultName>{item.title}</ResultName>
              <ResultAuthor>{item.author}</ResultAuthor>
            </div>
          </ResultLink>
        </li>
      ))
    : null;
  return (
    <FavoritesContainer>
      <FavField>
        <FavIcon>
          <use href="icons.svg#icon-heart"></use>
        </FavIcon>
      </FavField>
      <FavPanel open={props.favorites.length}>
        <FavList>{listFavs}</FavList>
      </FavPanel>
    </FavoritesContainer>
  );
};

export default Favorites;
