import React from "react";
import styled from "styled-components";
import Figure from "./Figure";
import Details, { InfoButtons } from "./Details";
import Ingredients from "./Ingredients";
import Directions from "./Directions";

const RecipeContainer = styled.div`
  background-color: #f9f5f3;
  border-top: 1px solid #fff;

  &:hover ${InfoButtons} {
    visibility: visible;
    opacity: 1;
    transform: translateY(0);
  }
`;

const Recipe = (props) => {
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
      <Ingredients
        amounts={props.amounts}
        data={props.data}
        shoppingList={props.shoppingList}
        setShoppingList={props.setShoppingList}
        handleShoppingList={props.handleShoppingList}
      />
      <Directions data={props.data} />
    </RecipeContainer>
  );
};

export default Recipe;
