import React from "react";
import styled from "styled-components";
import { ReactComponent as RecipeSvg } from "../icons/recipe.svg";

const Container = styled.nav`
  height: 7rem;
  width: 100%;
  background-color: #f9f5f3;
  position: sticky;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const Button = styled.button`
  color: #968b87;
  background: none;
  border-radius: 2rem;
  padding: 1rem 1rem;
  border: none;
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.2s;
  font-size: 1rem;
  text-decoration: none;
  flex: 1 0 2;

  & svg {
    height: 2.5rem;
    width: 2.5rem;
    fill: currentColor;
    margin-bottom: 2px;
  }

  &:hover {
    background-color: #70707025;
  }
`;

const MobileMenu = ({ handleMobileMenu }) => {
  return (
    <Container>
      <Button onClick={() => handleMobileMenu("search")}>
        <svg>
          <use href="icons.svg#icon-magnifying-glass"></use>
        </svg>
      </Button>
      <Button onClick={() => handleMobileMenu("recipe")}>
        <RecipeSvg />
      </Button>
      <Button onClick={() => handleMobileMenu("list")}>
        <svg>
          <use href="icons.svg#icon-shopping-cart"></use>
        </svg>
      </Button>
    </Container>
  );
};

export default MobileMenu;
