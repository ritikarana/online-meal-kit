import React from 'react';
import Box from '../../components/Box';
import List, { ListItem } from '../../components/List';
import styles from './price.module.css';

//  PriceSummary user interface
const PriceSummary = ({ summary, totalPrice, shippingPrice }) => (
  <Box width={['290px', '450px']} margin={16}>
    <List className={styles.priceList}>
      {summary.map((recipe, index) => (
        <ListItem key={index} className={styles.priceListItem}>
          <span className={styles.recipeName}>
            {recipe.name} {recipe.selected > 1 && <span> * {recipe.selected}</span>}
          </span>
          <span className={styles.recipePrice}>{recipe.rawPrice}</span>
        </ListItem>
      ))}
      <ListItem key="shipping" className={styles.priceListItem}>
        <span className="shipping">Shipping</span> {shippingPrice}
      </ListItem>
      <ListItem key="total" className={styles.totalPrice}>
        <span className="total">Total</span>
        {totalPrice}
      </ListItem>
    </List>
  </Box>
);

export default PriceSummary;
