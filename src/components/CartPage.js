import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
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


const firebaseConfig = {
  apiKey: "AIzaSyBMYhG6guU7L4-T8R95Z4vWRfj25G72Guo",
  authDomain: "my-project-8492-1684659473943.firebaseapp.com",
  projectId: "my-project-8492-1684659473943",
  storageBucket: "my-project-8492-1684659473943.appspot.com",
  messagingSenderId: "319870936933",
  appId: "1:319870936933:web:b77547d18570db5f8f638c",
  measurementId: "G-7MQHE06E0D",
};


initializeApp(firebaseConfig);
const db = getFirestore();

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

    try {
      const docRef = await addDoc(collection(db, "orders"), orderData);
      console.log("Order saved with ID:", docRef.id);
      alert("Order submitted");
      setCartItems({});
      setEmail("");
      setPhone("");
      setAddress("");
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Error submitting order");
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
    <div>
      <Title>Shopping Cart</Title>
      {Object.keys(cartItems).length === 0 ? (
        <Text>Cart is empty</Text>
      ) : (
        <CartContainer>
          {Object.keys(cartItems).map((shop) => (
            <div key={shop}>
              <ShopName>{shop}</ShopName>
              <ul>
                {cartItems[shop].map((item) => (
                  <CartItem key={item.id}>
                    <ItemDetails>
                      <ItemName>{item.name}</ItemName>
                      <ItemQuantity>
                        Quantity: {item.quantity}
                        <QuantityButton
                          onClick={() => handleAddQuantity(item, shop)}
                        >
                          +
                        </QuantityButton>
                        <QuantityButton
                          onClick={() => handleSubtractQuantity(item, shop)}
                        >
                          -
                        </QuantityButton>
                      </ItemQuantity>
                      <ItemPrice>Price: ${item.price}</ItemPrice>
                    </ItemDetails>
                    <RemoveButton
                      onClick={() => handleRemoveFromCart(item, shop)}
                    >
                      Remove
                    </RemoveButton>
                  </CartItem>
                ))}
              </ul>
            </div>
          ))}
        </CartContainer>
      )}
      <Container>
        <OrderHeading>Order Details</OrderHeading>
        <label>
          Email:
          <InputField
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Phone Number:
          <InputField
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
        <label>
          Address:
          <InputField
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <Button onClick={handleSubmitOrder}>Submit</Button>
        <div>Загальна вартість: ${calculateTotalPrice()}</div>
      </Container>
    </div>
  );
};

export default CartPage;