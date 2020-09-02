import React, { useState } from "react";
import styled from "styled-components";

const Results = styled.div`
  padding: 2rem 0;
  grid-area: list;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ResultsList = styled.ul`
  list-style: none;
`;

export const ResultLink = styled.a`
  height: 9rem;
  display: flex;
  align-items: center;
  padding: 1.5rem 3rem;
  transition: all 0.3s;
  border-right: 1px solid #fff;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background-color: #f9f5f3;
    transform: translateY(-2px);
  }
`;

export const ResultFig = styled.figure`
  flex: 0 0 5.5rem;
  border-radius: 50%;
  overflow: hidden;
  height: 5.5rem;
  margin-right: 2rem;
  position: relative;
  backface-visibility: hidden;
`;

export const ResultImg = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.3s;
`;

export const ResultName = styled.h4`
  font-size: 1.3rem;
  color: #f59a83;
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: 0.3rem;
`;

export const ResultAuthor = styled.p`
  font-size: 1.1rem;
  color: #968b87;
  text-transform: uppercase;
  font-weight: 600;
`;

//Pagination

const PaginationButton = (props) => {
  const onPageButtonClick = () => {
    if (props.prev) {
      props.setPage(props.page - 1);
    } else {
      props.setPage(props.page + 1);
    }
  };
  return (
    <button onClick={onPageButtonClick} className={props.className}>
      <span>{props.prev ? "Prev" : "Next"}</span>
      <svg>
        <use
          href={
            props.prev
              ? "icons.svg#icon-triangle-left"
              : "icons.svg#icon-triangle-right"
          }
        ></use>
      </svg>
    </button>
  );
};

const StyledPaginationButton = styled(PaginationButton)`
  color: #f59a83;
  font-size: 1.2rem;
  border: none;
  background-color: #f9f5f3;
  padding: 0.8rem 1.2rem;
  border-radius: 10rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s;
  float: ${(props) => (props.prev ? "left" : "right")};
  flex-direction: ${(props) => (props.prev ? "row-reverse" : "row")};
  &:hover {
    color: #f48982;
    background-color: #f2efee;
  }

  & svg {
    height: 1.5rem;
    width: 1.5rem;
    fill: currentColor;
    margin: 0 0.2rem;
  }
`;

const Pagination = (props) => {
  const renderPaginationButtons = () => {
    if (props.page === 1 && props.noOfPages > 1) {
      return (
        <StyledPaginationButton setPage={props.setPage} page={props.page} />
      );
    } else if (props.page < props.noOfPages) {
      return (
        <>
          <StyledPaginationButton
            prev
            setPage={props.setPage}
            page={props.page}
          />
          <StyledPaginationButton setPage={props.setPage} page={props.page} />
        </>
      );
    } else if (props.page === props.noOfPages && props.noOfPages > 1) {
      return (
        <StyledPaginationButton
          prev
          setPage={props.setPage}
          page={props.page}
        />
      );
    }
  };

  return (
    <div style={{ marginTop: "3rem", padding: "0 3rem" }}>
      {renderPaginationButtons()}
    </div>
  );
};

const SearchList = (props) => {
  const itemsPerPage = 10;
  const [page, setPage] = useState(1);
  const [noOfPages] = useState(Math.ceil(props.data.length / itemsPerPage));

  const listItems = props.data
    ? props.data
        .slice((page - 1) * itemsPerPage, page * itemsPerPage)
        .map((item) => (
          <li key={item.id} onClick={() => props.handleRecipe(item.id)}>
            <ResultLink>
              <ResultFig>
                <ResultImg src={item.image} alt={item.title} />
              </ResultFig>
              <div>
                <ResultName>
                  {item.title.length > 50
                    ? item.title.substring(0, 50) + "..."
                    : item.title}
                </ResultName>
                <ResultAuthor>{item.sourceName}</ResultAuthor>
              </div>
            </ResultLink>
          </li>
        ))
    : null;

  return (
    <>
      <Results>
        <ResultsList>
          {listItems}
          <Pagination page={page} noOfPages={noOfPages} setPage={setPage} />
        </ResultsList>
      </Results>
    </>
  );
};

export default SearchList;
