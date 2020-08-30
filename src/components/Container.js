import React, { useEffect } from "react";
import useFetch from "use-http";
import styled from "styled-components";

import { apiKey } from "../api";
import usePersistedState from "../hooks/usePersistedState";
import useQuery from "../hooks/useQuery";

import Header, { Logo } from "./Header";
import SearchList from "./SearchList";
import Recipe from "./Recipe/RecipeContainer";
import ShoppingList from "./ShoppingList";
import { useHistory } from "react-router-dom";

const Wrapper = styled.div`
  max-width: 120rem;
  margin: 3vw auto;
  background-color: #fff;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 2rem 6rem 0.5rem rgba(101, 90, 86, 0.2);
  display: grid;
  grid-template-rows: 10rem minmax(100rem, auto);
  grid-template-columns: 1.1fr 2fr 1.1fr;
  grid-template-areas:
    "head head head"
    "list recipe shopping";

  @media only screen and (max-width: 68.75em) {
    .container {
      width: 100%;
      margin: 0;
      border-radius: 0;
    }
  }
`;

const Placeholder = styled.div`
  grid-area: recipe;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 35rem;

  & h1 {
    font-size: 2rem;
  }
`;

const Container = () => {
  const query = useQuery();

  const history = useHistory();

  const [shoppingList, setShoppingList] = usePersistedState("shopping", []);

  const [favorites, setFavorites] = usePersistedState("favorites", []);

  const [recipeData, setRecipeData] = usePersistedState("recipe", null);

  const [searchTerm, setSearchTerm] = usePersistedState("term", null);

  const [searchData, setSearchData] = usePersistedState("search", null);

  const [amounts, setAmounts] = usePersistedState("amounts", null);

  const [servings, setServings] = usePersistedState("servings", null);

  const { get, loading, response } = useFetch(
    "https://api.spoonacular.com/recipes"
  );

  const handleSearch = async (searchTerm) => {
    try {
      await get(
        `complexSearch?apiKey=${apiKey}&query=${searchTerm}&number=30&sort=popularity&addRecipeInformation=true`
      );
      const data = await response.data.results;
      setSearchData(data);
      history.push(`search?q=${searchTerm}&id=${query.get("id")}`);
    } catch (error) {
      alert(error);
    }
  };

  const handleRecipe = async (id) => {
    try {
      await get(`${id}/information?apiKey=${apiKey}`);
      const data = await response.data;
      setServings(data.servings);
      const ingredientsAmount = data.extendedIngredients.map(
        (item) => item.measures.metric.amount
      );
      setAmounts(ingredientsAmount);
      setRecipeData(data);
      history.push(`search?q=${query.get("q")}&id=${id}`);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (query.get("q")) {
      handleSearch(query.get("q"));
    } else {
      searchData &&
        history.push(`search?q=${searchTerm}&id=${query.get("id")}`);
    }
    if (query.get("id")) {
      handleRecipe(query.get("id"));
    } else {
      recipeData &&
        history.push(
          `search?q=${searchTerm}&id=${recipeData ? recipeData.id : ""}`
        );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDecreaseServings = () => {
    if (servings > 1) {
      let newServings = servings - 1;
      const newIngredients = amounts.map(
        (amount) => amount * (newServings / servings)
      );
      setServings(newServings);
      setAmounts(newIngredients);
    }
  };

  const handleIncreaseServings = () => {
    if (servings < 100) {
      let newServings = servings + 1;
      const newIngredients = amounts.map(
        (amount) => amount * (newServings / servings)
      );
      setServings(newServings);
      setAmounts(newIngredients);
    }
  };

  const handleFavorites = (data) => {
    if (favorites.some((item) => item.id === data.id)) {
      setFavorites(favorites.filter((item) => item.id !== data.id));
    } else
      setFavorites((favorites) => [
        ...favorites,
        {
          id: data.id,
          title: data.title,
          author: data.sourceName,
          image: data.image,
        },
      ]);
  };

  const handleShoppingList = (list) => {
    if (shoppingList.length === 0) return setShoppingList(list);
    let newList = [...shoppingList, ...list];
    for (let i = 0; i < newList.length; i++) {
      for (let j = i + 1; j < newList.length; j++) {
        if (newList[i].id === newList[j].id) {
          newList[i].amount += +newList[i].amount;
          newList.splice(j, 1);
          j--;
        }
      }
    }

    setShoppingList(newList);
  };

  const handleChangeShoppingItem = (event, listItem) => {
    const itemIndex = shoppingList.findIndex((item) => item.id === listItem.id);
    let newList = [...shoppingList];
    newList[itemIndex] = { ...newList[itemIndex], amount: event.target.value };
    setShoppingList(newList);
  };

  const handleDeleteShoppingItem = (listItem) => {
    if (shoppingList.some((item) => item.id === listItem.id)) {
      setShoppingList(shoppingList.filter((item) => item.id !== listItem.id));
    }
  };

  return (
    <Wrapper>
      <Header
        handleSearch={handleSearch}
        handleRecipe={handleRecipe}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        favorites={favorites}
        loading={loading}
      />
      {!searchData && !recipeData && (
        <Placeholder>
          <Logo
            src="logo.png"
            alt="Logo"
            style={{ marginLeft: 0, height: "8rem" }}
          />
          <h1>Search through hundreds of thousands of recipes.</h1>
        </Placeholder>
      )}
      {searchData && (
        <SearchList handleRecipe={handleRecipe} data={searchData} />
      )}
      {recipeData && (
        <Recipe
          servings={servings}
          amounts={amounts}
          data={recipeData}
          favorites={favorites}
          shoppingList={shoppingList}
          setShoppingList={setShoppingList}
          handleDecreaseServings={handleDecreaseServings}
          handleIncreaseServings={handleIncreaseServings}
          handleFavorites={handleFavorites}
          handleShoppingList={handleShoppingList}
        />
      )}
      <ShoppingList
        shoppingList={shoppingList}
        handleChangeShoppingItem={handleChangeShoppingItem}
        handleDeleteShoppingItem={handleDeleteShoppingItem}
      />
    </Wrapper>
  );
};

export default Container;
