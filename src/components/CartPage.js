import React, { useState } from "react";
import {
  Text,
  OrderHeading,
  InputField,
  Button,
  Container,
  CartContainer,
  ShopName,
  CartItem,
  ItemDetails,
  ItemName,
  ItemQuantity,
  ItemPrice,
  RemoveButton,
  QuantityButton,
  Title,
} from "../styles/CardPage.styled";
import axios from "axios";

const CartPage = ({ cartItems, setCartItems }) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

const handleRemoveFromCart = (item, shop) => {
  setCartItems((prevCartItems) => {
    const updatedItems = { ...prevCartItems };
    const shopItems = updatedItems[shop];
    const updatedShopItems = shopItems.filter(
      (cartItem) => cartItem.name !== item.name
    );
    if (updatedShopItems.length === 0) {
      delete updatedItems[shop];
    } else {
      updatedItems[shop] = updatedShopItems;
    }
    return updatedItems;
  });
};

  const handleAddQuantity = (item, shop) => {
    setCartItems((prevCartItems) => {
      const updatedItems = { ...prevCartItems };
      const shopItems = updatedItems[shop];
      const updatedShopItems = shopItems.map((cartItem) => {
        if (cartItem.name === item.name) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        }
        return cartItem;
      });
      updatedItems[shop] = updatedShopItems;
      return updatedItems;
    });
  };

  const handleSubtractQuantity = (item, shop) => {
    setCartItems((prevCartItems) => {
      const updatedItems = { ...prevCartItems };
      const shopItems = updatedItems[shop];
      const updatedShopItems = shopItems.map((cartItem) => {
        if (cartItem.name === item.name) {
          const newQuantity = cartItem.quantity - 1;
          const quantity = newQuantity >= 0 ? newQuantity : 0;
          if (quantity === 0) {
            return null;
          }
          return { ...cartItem, quantity: quantity };
        }
        return cartItem;
      });
      updatedItems[shop] = updatedShopItems.filter(Boolean);
      return updatedItems;
    });
  };

const handleSubmitOrder = async () => {
  const orderData = {
    items: cartItems,
    email,
    phone,
    address,
  };

  const shops = Object.keys(cartItems);
  if (shops.length > 1) {
    alert("You can only order products from one shop");
    return;
  }

  if (Object.keys(cartItems).length === 0) {
    alert("Cart is empty");
    return;
  }

  if (!email || !phone || !address) {
    alert("Please fill in all the registration fields");
    return;
  }

  try {
    await axios.post("https://backend-ibh1.onrender.com/orders", orderData); // Використовуйте відповідний шлях до вашого серверного бекенду
    alert("Order submitted");
    setCartItems({});
    setEmail("");
    setPhone("");
    setAddress("");
  } catch (error) {
    console.error("Error submitting order:", error);
  }
};
const calculateTotalPrice = () => {
  let totalPrice = 0;

  Object.keys(cartItems).forEach((shop) => {
    cartItems[shop].forEach((item) => {
      const itemPrice = parseFloat(item.price);
      const itemQuantity = parseInt(item.quantity);

      if (!isNaN(itemPrice) && !isNaN(itemQuantity)) {
        totalPrice += itemPrice * itemQuantity;
      }
    });
  });

  return totalPrice.toFixed(2);
};

  return (
    <Container>
      <Title>Cart</Title>
      {Object.keys(cartItems).length === 0 ? (
        <Text>Your cart is empty</Text>
      ) : (
        <>
          <OrderHeading>Order Details</OrderHeading>
          {Object.keys(cartItems).map((shop) => (
            <CartContainer key={shop}>
              <ShopName>{shop}</ShopName>
              {cartItems[shop].map((item) => (
                <CartItem key={item.name}>
                  <ItemDetails>
                    <ItemName>{item.name}</ItemName>
                    <ItemQuantity>
                      <QuantityButton
                        onClick={() => handleSubtractQuantity(item, shop)}
                      >
                        -
                      </QuantityButton>
                      {item.quantity}
                      <QuantityButton
                        onClick={() => handleAddQuantity(item, shop)}
                      >
                        +
                      </QuantityButton>
                    </ItemQuantity>
                    <ItemPrice>{item.price}</ItemPrice>
                  </ItemDetails>
                  <RemoveButton
                    onClick={() => handleRemoveFromCart(item, shop)}
                  >
                    Remove
                  </RemoveButton>
                </CartItem>
              ))}
            </CartContainer>
          ))}
          <OrderHeading>Shipping Details</OrderHeading>
          <InputField
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <InputField
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button onClick={handleSubmitOrder}>Submit Order</Button>
          <div>Загальна вартість: ${calculateTotalPrice()}</div>
        </>
      )}
    </Container>
  );
};

export default CartPage;