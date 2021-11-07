import React from 'react';
import Box from '../../components/Box';
import List, { ListItem, TotalPrice } from '../../components/List';
 
//  PriceSummary user interface
const PriceSummary = ({ summary, totalPrice, shippingPrice }) => (
  <Box width={['290px', '450px']} margin={16}>
    <List>
      {summary.map((recipe, index) => (
        <ListItem key={index}>
          <span>
            {recipe.name} {recipe.selected > 1 && <span> * {recipe.selected}</span>}
          </span>
          <span>{recipe.rawPrice}</span>
        </ListItem>
      ))}
      <ListItem key="shipping">
        <span>Shipping</span> {shippingPrice}
      </ListItem>
      <ListItem key="total">
        <TotalPrice>  <span>Total</span>{totalPrice}</TotalPrice>
      </ListItem>
    </List>
  </Box>
);

export default PriceSummary;
