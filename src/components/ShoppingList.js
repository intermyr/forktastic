import React from "react";
import styled from "styled-components";

const Delete = styled.button`
  margin-top: 0.5rem;
  position: absolute;
  right: 0;
  background-image: linear-gradient(
    to right,
    transparent 0%,
    #fff 40%,
    #fff 100%
  );
  width: 3.75rem;
  padding-left: 2rem;
  visibility: hidden;
  opacity: 0;
  transition: all 0.5s;
  height: 1.75rem;
  border: none;
  background: none;
  cursor: pointer;

  & svg {
    height: 100%;
    width: 100%;
    fill: #f59a83;
    transition: all 0.3s;
  }
`;

const Container = styled.div`
  padding: 3rem 2rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  grid-area: shopping;
`;

const Heading = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  color: #f59a83;
  text-transform: uppercase;
  margin-bottom: 2.5rem;
  text-align: center;
`;

const List = styled.ul`
  list-style: none;
  max-height: 77rem;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Item = styled.li`
  display: flex;
  align-items: flex-start;
  padding: 1.3rem 0;
  border-bottom: 1px solid #f2efee;
  position: relative;

  &:hover ${Delete} {
    opacity: 1;
    visibility: visible;
  }
`;

const Count = styled.div`
  flex: 0 0 7.5rem;
  padding: 0.4rem 0.5rem;
  border: 1px solid #f2efee;
  border-radius: 3px;
  margin-right: 2rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;

  & input {
    color: inherit;
    font-family: inherit;
    font-size: 1.2rem;
    text-align: center;
    border: none;
    width: 3.7rem;
    border-radius: 3px;
  }

  & p {
    font-size: 1.2rem;
  }
`;

const Description = styled.p`
  flex: 1;
  font-size: 1.3rem;
  margin-top: 0.4rem;
  margin-right: 1.5rem;
`;

const Copyright = styled.div`
  color: #968b87;
  font-size: 1.2rem;
  margin-top: auto;
`;

const ApiLink = styled.a`
  &:visited {
    color: #968b87;
  }
`;

const ShoppingList = ({ shoppingList }) => {
  const listItems = shoppingList
    ? shoppingList.map((item) => (
        <Item key={item.id}>
          <Count>
            <input type="number" defaultValue={item.amount} step={item.amount} />
            <p>{item.unit}</p>
          </Count>
          <Description>{item.name}</Description>
          <Delete>
            <svg>
              <use href="icons.svg#icon-circle-with-cross"></use>
            </svg>
          </Delete>
        </Item>
      ))
    : null;
  return (
    <Container>
      <Heading>{!!listItems.length && `Shopping List`}</Heading>
      <List>{listItems}</List>
      <Copyright>
        © by Alexander Muratidi
        <br /> Powered by{" "}
        <ApiLink href="https://spoonacular.com/" target="_blank">
          spoonacular.com
        </ApiLink>
      </Copyright>
    </Container>
  );
};

export default ShoppingList;
