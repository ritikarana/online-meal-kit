import React from 'react';

import { Row, Col } from '../../components/Grid';
import Flex from '../../components/Flex';
import Box from '../../components/Box';
import RecipeCard from './RecipeCard';
import PriceInfo from './PriceInfo';
import { parseRawPrice } from './price';
import useFetchHelloFreshBox from '../../hooks/useFetchHelloFreshBox';

const Recipes = () => {
  // This state stores the array of recipes with the changes performed by the customer.
  const [recipes, setRecipes] = React.useState([]);
  const { data, loading } = useFetchHelloFreshBox();
  // totalSelected stores the Total Selected recipes with the changes by the customer.
  const [totalSelected, setTotal] = React.useState(0);
  // totalAmount stores the Total Amount for all selected recipes with the changes by the customer.
  const [totalAmount, setTotalAmount] = React.useState(0);
  // summary stores the Object of recipes for all selected recipes with the changes by the customer.
  const [summary, setPriceSummary] = React.useState([]);

  // Handle add recipes , campare the recipeId with every item id , if it matched then it increment in selected recipe
  const handleAddRecipe = (recipeId) => {
    setRecipes(
      recipes.map((item) => {
        if (item.id === recipeId) {
          item.selected++;
          return {
            ...item,
          };
        }
        return item;
      })
    );
  };
  // Handle Remove recipes , campare the recipeId with every item id , if it matched then it decrement in selected recipe
  const handleRemoveRecipe = (recipeId) => {
    setRecipes(
      recipes.map((item) => {
        if (item.id === recipeId) {
          item.selected--;
          return {
            ...item,
          };
        }
        return item;
      })
    );
  };

  // useEfffect handles to get all recipes from data and sekt in recipes list
  React.useEffect(() => {
    const { recipes: fetchedRecipes } = data;
    if (fetchedRecipes) {
      setRecipes(fetchedRecipes);
    }

    // filteredRecepies stores the summary for selected recipes
    const filteredRecepies = recipes
      .filter((item) => item.selected > 0)
      .map((result) => {
        return {
          selected: result.selected,
          recipePrice: (data.baseRecipePrice + result.extraCharge) * result.selected,
          name: result.name,
          rawPrice: parseRawPrice((data.baseRecipePrice + result.extraCharge) * result.selected),
        };
      });

    // totalRecipesPrice gives total amount for selected recipes
    const totalRecipesPrice = filteredRecepies
      .map((item) => item.recipePrice)
      .reduce((prev, curr) => prev + curr, 0);
    // totalRecipesPrice gives total count for selected recipes
    const total = filteredRecepies
      .map((item) => item.selected)
      .reduce((prev, curr) => prev + curr, 0);

    //  Below function sets the Total count , Total price and Summary for recipes
    setTotal(total);
    setPriceSummary(filteredRecepies);
    setTotalAmount(totalRecipesPrice);
  }, [data, recipes, setRecipes]);
  if (loading) {
    return null;
  }
  // min/max recipe boundaries to disable and enable the add and remove icon
  const minRecipesSelected = totalSelected >= data.min;
  const maxRecipesSelected = totalSelected === data.max;
  // Store Shipping and total price
  const totalPrice = parseRawPrice(totalAmount + data.shippingPrice);
  const shippingPrice = parseRawPrice(data.shippingPrice);

  return (
    <>
      <Row>
        <Col sm={6}>
          <h3>{data.headline}</h3>
        </Col>
        <Col sm={6}>
          <Flex alignItems="center" justifyContent="flex-end">
            <Box textAlign="right" mr="xs">
              <h3>{totalPrice}</h3>
            </Box>
            <PriceInfo summary={summary} totalPrice={totalPrice} shippingPrice={shippingPrice} />
          </Flex>
        </Col>
      </Row>

      <Row>
        {recipes.map((recipe) => (
          <Col sm={12} md={6} xl={4} key={recipe.id}>
            <Box mb="md">
              <RecipeCard
                {...recipe}
                handleAddRecipe={handleAddRecipe}
                handleRemoveRecipe={handleRemoveRecipe}
                minRecipesSelected={minRecipesSelected}
                maxRecipesSelected={maxRecipesSelected}
              />
            </Box>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Recipes;
