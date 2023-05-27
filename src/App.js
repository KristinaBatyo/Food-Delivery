import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ShopsPage from "./components/ShopsPage";
import CartPage from "./components/CartPage";
import { Nav, Container, StyledNavLink } from "./styles/App.styled";

const App = () => {
    const [selectedShop, setSelectedShop] = useState(null);
const [cartItems, setCartItems] = useState(() => {
  const storedCartItems = localStorage.getItem("cartItems");
  return storedCartItems ? JSON.parse(storedCartItems) : {};
});


  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

const handleAddToCart = (product, shop, price) => {
  setCartItems((prevCartItems) => {
    const updatedItems = { ...prevCartItems };
    if (updatedItems.hasOwnProperty(shop)) {
      const shopItems = updatedItems[shop];
      const existingItem = shopItems.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        const newItem = { ...product, quantity: 1, price };
        shopItems.push(newItem);
      }
    } else {
      const newItem = { ...product, quantity: 1, price };
      updatedItems[shop] = [newItem];
    }
    return updatedItems;
  });
};





  return (
    <Container>
      <Nav>
        <StyledNavLink to="/" end>
          ShopsPage
        </StyledNavLink>
        <StyledNavLink to="/cart">Cart</StyledNavLink>
      </Nav>
      <Routes>
        <Route
          path="/"
          element={
            <ShopsPage
              selectedShop={selectedShop}
              handleAddToCart={handleAddToCart}
              setSelectedShop={setSelectedShop}
              cartItems={cartItems}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <CartPage cartItems={cartItems} setCartItems={setCartItems} />
          }
        />
      </Routes>
    </Container>
  );
};

export default App;
