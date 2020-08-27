import React from "react";
import styled from "styled-components";
import Search from "./Search";
import Favorites from "./Favorites";
import Loading from "./Loading";

const Wrapper = styled.header`
  grid-area: head;
  background-color: #f9f5f3;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  width: 150px
`;

const Logo = styled.img`
  margin-left: 4rem;
  height: 4.5rem;
  display: block;
`;

const Header = (props) => {
  return (
    <Wrapper>
      <LogoContainer>
        <Logo src="logo.png" alt="Logo" />
        {props.loading && <Loading />}
      </LogoContainer>
      <Search handleSearch={props.handleSearch} />
      <Favorites
        favorites={props.favorites}
        handleRecipe={props.handleRecipe}
      />
    </Wrapper>
  );
};

export default Header;
