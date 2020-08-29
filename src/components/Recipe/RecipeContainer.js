import React, { useState } from "react";
import styled from "styled-components";
import Figure from "./Figure";
import Details, { InfoButtons } from "./Details";
import Ingredients from "./Ingredients";
import Directions from "./Directions";

const RecipeContainer = styled.div`
  background-color: #f9f5f3;
  border-top: 1px solid #fff;
  grid-area: "recipe";
  &:hover ${InfoButtons} {
    visibility: visible;
    opacity: 1;
    transform: translateY(0);
  }
`;

const SwitchContainer = styled.div`
  padding: 1.2rem 0;
  display: flex;
  justify-content: center;
`;

const MenuButton = styled.button`
  background: linear-gradient(
    315deg,
    rgba(221, 14, 80, 1) 22%,
    rgba(240, 169, 45, 1) 100%
  );
  border-radius: 0 10rem 10rem 0;
  border: none;
  text-transform: uppercase;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s;
  font-size: 1.3rem;
  padding: 1rem 1.75rem;
  text-decoration: none;
  filter: ${(props) => (props.active ? "none" : "grayscale(90%) opacity(50%)")};

  &:first-child {
    border-radius: 10rem 0 0 10rem;
    background: linear-gradient(
      -315deg,
      rgba(221, 14, 80, 1) 22%,
      rgba(240, 169, 45, 1) 100%
    );
  }

  &:hover {
    transform: ${(props) => (props.active ? "none" : "scale(1.02)")};
  }

  &:active {
    transform: scale(1);
  }

  & svg {
    height: 1.5rem;
    width: 1.5rem;
    fill: currentColor;
  }
`;

const Recipe = (props) => {
  const [info, setInfo] = useState(true);

  return (
    <RecipeContainer>
      <Figure data={props.data} />
      <Details
        servings={props.servings}
        data={props.data}
        favorites={props.favorites}
        handleDecreaseServings={props.handleDecreaseServings}
        handleIncreaseServings={props.handleIncreaseServings}
        handleFavorites={props.handleFavorites}
      />
      <SwitchContainer>
        <MenuButton active={info} onClick={() => setInfo(true)}>
          Ingredients
        </MenuButton>
        <MenuButton active={!info} onClick={() => setInfo(false)}>
          Directions
        </MenuButton>
      </SwitchContainer>
      {info ? (
        <Ingredients
          amounts={props.amounts}
          data={props.data}
          shoppingList={props.shoppingList}
          setShoppingList={props.setShoppingList}
          handleShoppingList={props.handleShoppingList}
        />
      ) : (
        <Directions data={props.data} />
      )}
    </RecipeContainer>
  );
};

export default Recipe;
