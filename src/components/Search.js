import React from "react";
import styled from "styled-components";

const SearchForm = styled.form`
  background-color: #fff;
  border-radius: 10rem;
  display: flex;
  align-items: center;
  align-self: center;
  transition: all 0.3s;
  height: 5rem;
  &:focus-within {
    transform: translateY(-2px);
    box-shadow: 0 0.7rem 3rem rgba(101, 90, 86, 0.08);
  }
`;

const SearchInput = styled.input`
  text-indent: 1.5em;
  border: none;
  background: none;
  font-family: inherit;
  color: inherit;
  font-size: 1.7rem;
  width: 30rem;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #dad0cc;
  }

  @media only screen and (max-width: 450px) {
    & {
      width: auto;
    }

    &::placeholder {
      color: white;
    }
  }
`;

const SearchButton = styled.button`
  padding: 1.3rem 3rem;
  font-size: 1.4rem;
  background: linear-gradient(
    315deg,
    rgba(221, 14, 80, 1) 22%,
    rgba(240, 169, 45, 1) 100%
  );
  border-radius: 10rem;
  border: none;
  text-transform: uppercase;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s;

  @media only screen and (max-width: 600px) {
    & svg {
      margin-right: 0;
    }

    & {
      padding: 1.3rem 1.3rem;
    }

    & span {
      display: none;
    }
  }
`;

const SearchIcon = styled.svg`
  margin-right: 1rem;
  height: 2.25rem;
  width: 2.25rem;
  fill: currentColor;
`;

const Search = (props) => {
  const handleChange = (event) => {
    props.setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    props.handleSearch(props.searchTerm);
    event.preventDefault();
  };

  return (
    <SearchForm>
      <SearchInput
        placeholder="Search over 100,000 recipes..."
        value={props.searchTerm}
        onChange={handleChange}
      />
      <SearchButton onClick={handleSubmit}>
        <SearchIcon>
          <use href="icons.svg#icon-magnifying-glass"></use>
        </SearchIcon>
        <span>Search</span>
      </SearchButton>
    </SearchForm>
  );
};

export default Search;
