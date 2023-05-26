import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ShopsPage from "./components/ShopsPage";
import CartPage from "./components/CartPage";
import { Nav, Container, StyledNavLink } from "./styles/App.styled";

const App = () => {
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
    if (updatedItems[shop]) {
      const itemExists = updatedItems[shop].find(
        (item) => item.id === product.id
      );
      if (itemExists) {
        itemExists.quantity += 1;
      } else {
        updatedItems[shop].push({ ...product, quantity: 1, price });
      }
    } else {
      updatedItems[shop] = [{ ...product, quantity: 1, price }];
    }
    return updatedItems;
  });

  localStorage.setItem("cartItems", JSON.stringify(cartItems));
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
          element={<ShopsPage handleAddToCart={handleAddToCart} />}
        >
          <Route
            path="cart"
            element={
              <CartPage cartItems={cartItems} setCartItems={setCartItems} />
            }
          />
        </Route>
      </Routes>
    </Container>
  );
};

export default App;
