import React, { useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
// import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import pan from './assets/pan.png';
import { BiSearchAlt } from "react-icons/bi";
import "./index.css";

const APP_ID = "47915a59";
const APP_KEY = "daa28f2d2ccd74d661d0be4832236c41";


const RecipeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0rem 0rem 1.5rem 0rem;
  width: 18rem;
  border-radius: 1rem;
  background-color: #ffffff;
  box-shadow: 0.2rem 0.2rem 1rem 0.2rem #f5dec4;
`;

const CoverImage = styled.img`
  object-fit: cover;
  height: 15rem;
  border-radius: 1rem 1rem 0rem 0rem;
`;

const RecipeName = styled.span`
  font-size: 1.4rem;
  line-height: 120%;
  font-weight: 800;
  color: black;
  margin: 1rem 2rem;
  // white-space: nowrap;
  // overflow: hidden;
  // text-overflow: ellipsis;
`;

const SeeMoreText = styled.span`
  // color: #e43950;
  color: white;
  font-size: 1.1rem;
  font-weight: 800;
  text-align: center;
  border: solid 1px #e43950;
  background-color: #e43950;
  border-radius: 100px;
  margin-left: 2rem;
  margin-right: 2rem;
  padding: 0.8rem 0.8rem;
  cursor: pointer;
`;

const IngredientsText = styled(SeeMoreText)`
  color: #2cac8d;
  font-weight: 800;
  background-color: #FFFFFF;
  border: solid 2px #2cac8d;
  margin-bottom: 1rem;
`;

const SeeNewTab = styled(SeeMoreText)`
  color: #ffffff;
  // border: solid 1px green;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
`;

const Close = styled(SeeMoreText)`
  color: #2cac8d;
  background-color: white;
  border: solid 2px #2cac8d;
`;

const IngredientsContainer = styled.span`
  padding: 2rem;
  text-align: center;
`;

// const IngredientsTitle = styled.span`
//   font-size: 1.2rem;
// `;


const RecipeComponent = (props) => {
  const [show, setShow] = useState("");

  const { label, image, ingredients, url } = props.recipe;
  return (
    <RecipeContainer>
      <Dialog
        onClose={() => console.log("adsadad")}
        aria-labelledby="simple-dialog-title"
        open={!!show}
      >
        <IngredientsContainer>
        {/* <IngredientsTitle>Ingredients</IngredientsTitle> */}
        <DialogContent>
          <RecipeName>{label}</RecipeName>
          <table>
            <thead>
              <th>Ingredients</th>
              {/* <th>Weight</th> */}
            </thead>
            <tbody>
              {ingredients.map((ingredient, index) => (
                <tr key={index} className="ingredient-list">
                  <td>- {ingredient.text}</td>
                  {/* <td>{ingredient.weight}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </DialogContent>
        <DialogActions>
          <SeeNewTab onClick={() => window.open(url)}>
            Move to Recipe Site
            </SeeNewTab>
          <Close onClick={() => setShow("")}>
            Close
            </Close>
        </DialogActions>
        </IngredientsContainer>
      </Dialog>
      <CoverImage src={image} alt={label} />
      <RecipeName>{label}</RecipeName>
      <IngredientsText onClick={() => setShow(!show)}>
        Check Ingredients
      </IngredientsText>
      <SeeMoreText onClick={() => window.open(url)}>
        Move to Recipe Site
      </SeeMoreText>
    </RecipeContainer>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  background-color: #e43950;
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 1rem;
  font-size: 1.8rem;
  font-weight: bold;
  @media only screen and (max-width: 650px) {
    background-color: #29a083;
    color: white;
    display: block;
    justify-content: center;
    text-align: center;
    align-items: center;
    // padding: 1rem;
    // font-size: 1.6rem;
    // font-weight: bold;
  }
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1rem 1rem;
  border-radius: 0.8rem;
  margin-left: 1rem;
  width: 60%;
  background-color: #f3fffc;
  @media only screen and (max-width: 650px) {
    flex-direction: row;
    padding: 1.2rem 1.2rem;
    border-radius: 0.8rem;
    margin: auto;
    width: 60%;
    background-color: white;
  }
`;

const RecipeImage = styled.img`
  width: 4rem;
  height: auto;
  margin: 1rem;
  @media only screen and (max-width: 650px) {
    width: 4rem;
    height: auto;
    margin: 1rem 1rem 1rem 0rem;
    text-align: center;
  }
`;

const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  @media only screen and (max-width: 650px) {
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  text-align: center;
  }
`;

const Placeholder = styled.img`
  color: red;
  width: 120px;
  height: 120px;
  margin: 200px;
  opacity: 50%;
`;

const SearchInput = styled.input`
  color: #413a30;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;

const RecipeListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 3rem;
  gap: 3rem;
  justify-content: space-evenly;
`;

const AppComponent = () => {
  const [searchQuery, updateSearchQuery] = useState("");
  const [recipeList, updateRecipeList] = useState([]);
  const [timeoutId, updateTimeoutId] = useState();
  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `https://api.edamam.com/search?q=${searchString}&app_id=${APP_ID}&app_key=${APP_KEY}`,
    );
    updateRecipeList(response.data.hits);
  };

  const onTextChange = (e) => {
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    updateTimeoutId(timeout);
  };

  return (
    <Container>
      <Header>
        <AppName>
          <RecipeImage src={pan} />
          What To Cook Today
        </AppName>
        <SearchBox>
            <div className='searchIcon'>
              <BiSearchAlt />
            </div>
          <SearchInput
            placeholder="food name, ingredients"
            value={searchQuery}
            onChange={onTextChange}
          />
        </SearchBox>
      </Header>
      <RecipeListContainer>
        {recipeList?.length ? (
          recipeList.map((recipe, index) => (
            <RecipeComponent key={index} recipe={recipe.recipe} />
          ))
        ) : (
          <Placeholder src={pan} />
        )}
      </RecipeListContainer>
    </Container>
  );
};

export default AppComponent;
