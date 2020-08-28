import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 4rem 5rem;
  font-size: 1.5rem;
  line-height: 1.4;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const List = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 4rem;
  grid-row-gap: 2.5rem;
  list-style: none;
  margin-bottom: 3rem;
`;

const Item = styled.li`
  display: flex;
`;

const Icon = styled.svg`
  height: 1.8rem;
  width: 1.8rem;
  fill: #f59a83;
  border: 1px solid #f59a83;
  border-radius: 50%;
  padding: 2px;
  margin-right: 1rem;
  flex: 0 0 auto;
  margin-top: 0.1rem;
`;

const Count = styled.div`
  margin-right: 0.5rem;
  flex: 0 0 auto;
`;

const Button = styled.button`
background: linear-gradient(315deg, rgba(221,14,80,1) 22%, rgba(240,169,45,1) 100%);
  border-radius: 10rem;
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

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(1);
  }

  & svg {
    height: 1.5rem;
    width: 1.5rem;
    fill: currentColor;
  }

  & > *:first-child {
    margin-right: 1rem;
  }
`;

const Ingredients = (props) => {
  const listIngredients = props.data
    ? props.data.extendedIngredients.map((item, i) => (
        <Item>
          <Icon>
            <use href="icons.svg#icon-check"></use>
          </Icon>
          <Count>
            {Math.round((props.amounts[i] + Number.EPSILON) * 10) / 10}
          </Count>
          <div>
            <span
              style={{
                marginRight: "0.5rem",
                fontWeight: "600",
                fontStyle: "italic",
              }}
            >
              {item.measures.metric.unitShort.toLowerCase()}
            </span>
            {`${item.name}`}
          </div>
        </Item>
      ))
    : null;

  const listShopping = props.data
    ? props.data.extendedIngredients.map((item, i) => ({
        id: item.id,
        amount: Math.round((props.amounts[i] + Number.EPSILON) * 10) / 10,
        unit: item.measures.metric.unitShort.toLowerCase(),
        name: item.name,
      }))
    : null;

  return (
    <Container>
      <List>{listIngredients}</List>
      <Button
        onClick={() => {
          console.log(listShopping);
          props.handleShoppingList(listShopping);
        }}
      >
        <svg>
          <use href="icons.svg#icon-shopping-cart"></use>
        </svg>
        <span>Add to shoping list</span>
      </Button>
    </Container>
  );
};

export default Ingredients;
