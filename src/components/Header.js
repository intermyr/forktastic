import React from "react";
import styled from "styled-components";
import Search from "./Search";
import Favorites from "./Favorites";
import Loading from "./Loading";
import useWindowSize from "../hooks/useWindowSize";

const Wrapper = styled.header`
  grid-area: head;
  background-color: #f9f5f3;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  width: 150px;
  margin-left: 4rem;
  @media only screen and (max-width: 600px) {
    & {
      margin-left: 3.5rem;
      width: 0px;
    }
  }
`;

export const Logo = styled.img`
  height: 4.5rem;
  display: block;
`;

const Header = (props) => {
  const width = useWindowSize().width;
  return (
    <Wrapper>
      <LogoContainer>
        <Logo src={width < 600 ? "logo-short.png" : "logo.png"} alt="Logo" />
        {props.loading && <Loading />}
      </LogoContainer>
      <Search
        handleSearch={props.handleSearch}
        searchTerm={props.searchTerm}
        setSearchTerm={props.setSearchTerm}
      />
      <Favorites
        favorites={props.favorites}
        handleRecipe={props.handleRecipe}
      />
    </Wrapper>
  );
};

export default Header;
