import React from "react";
import {
  CartItemContainer,
  ItemImage,
  ItemDetails,
  ItemName,
  ItemPrice,
} from "./cart-item.styles.jsx";
const CartItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <CartItemContainer>
      <ItemImage src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <ItemName>{name}</ItemName>
        <ItemPrice>
          {quantity} x ${price}
        </ItemPrice>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;
