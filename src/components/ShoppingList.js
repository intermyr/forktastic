import React from "react";
import styled from "styled-components";

const Delete = styled.button`
  margin-top: 0.5rem;
  position: absolute;
  right: 0;
  background: linear-gradient(
    315deg,
    rgba(221, 14, 80, 1) 22%,
    rgba(240, 169, 45, 1) 100%
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

const DeleteAll = styled.button`
  visibility: hidden;
  opacity: 0;
  transition: all 0.5s;
  border: none;
  background: none;
  height: 1.5rem;
  cursor: pointer;

  & svg {
    margin-left: 1rem;
    width: 1.5rem;
    height: 1.5rem;
    fill: #f59a83;
  }
`;

const Container = styled.div`
  min-height: 85vh;
  padding: 3rem 2rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  grid-area: shopping;

  &:hover ${DeleteAll} {
    opacity: 1;
    visibility: visible;
  }
`;

const Heading = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  color: #f59a83;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 1.5rem;
  margin-left: 2.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
`;

const Placeholder = styled.p`
  font-weight: 600;
  color: #968b87;
  text-transform: uppercase;
  margin-bottom: 2.5rem;
  text-align: center;
`;

const List = styled.ul`
  list-style: none;
  width: 25rem;
  max-height: 90rem;
  overflow: auto;
  scrollbar-width: none;
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
    border-radius: 3px;
    max-width: 6.5rem;
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

  @media only screen and (max-width: 900px) {
    & {
      display: none;
    }
  }
`;

const ApiLink = styled.a`
  &:link {
    color: #968b87;
  }
  &:visited {
    color: #968b87;
  }
`;

const ShoppingList = ({
  shoppingList,
  handleDeleteShoppingItem,
  handleChangeShoppingItem,
  handleDeleteAllShoppingItems,
}) => {
  const listItems = shoppingList
    ? shoppingList.map((item, i) => (
        <Item key={i}>
          <Count>
            <input
              type="number"
              value={item.amount}
              onChange={(event) => handleChangeShoppingItem(event, item)}
              min={0}
            />
            <p>{item.unit}</p>
          </Count>
          <Description>{item.name}</Description>
          <Delete
            onClick={() => {
              handleDeleteShoppingItem(item);
              console.log(shoppingList);
            }}
          >
            <svg>
              <use href="icons.svg#icon-circle-with-cross"></use>
            </svg>
          </Delete>
        </Item>
      ))
    : null;
  return (
    <Container>
      <Heading>
        Shopping List
        <DeleteAll onClick={handleDeleteAllShoppingItems}>
          <svg>
            <use href="icons.svg#icon-circle-with-cross"></use>
          </svg>
        </DeleteAll>
      </Heading>
      {!shoppingList.length && (
        <Placeholder>You can add items at ingredients tab</Placeholder>
      )}
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
