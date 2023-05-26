import React, { useState } from "react";
import {
  Container,
  Title,
  ShopList,
  ShopItem,
  SelectedShop,
  ProductsTitle,
  List,
  ListItem,
  ProductName,
  AddToCartButton,
  ProductPrice,
} from "../styles/ShopsPage.styled";

const ShopsPage = ({ handleAddToCart }) => {
  const [selectedShop, setSelectedShop] = useState(null);
  const [message, setMessage] = useState("");

  const handleShopSelect = (shop) => {
    setSelectedShop(shop);
    setMessage("");
  };

  const showMessage = (productName) => {
    setMessage(`Product "${productName}" added to cart`);
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const renderProducts = () => {
    switch (selectedShop) {
      case "Mc Donny":
        return (
          <List>
            <ListItem>
              <ProductName>Burgers</ProductName>
              <ProductPrice>$10</ProductPrice>

              <AddToCartButton
                onClick={() => {
                  handleAddToCart(
                    { id: 1, name: "Burgers", price: 10 },
                    selectedShop,
                    10
                  );
                  showMessage("Burgers");
                }}
              >
                add to Cart
              </AddToCartButton>
            </ListItem>
            <ListItem>
              <ProductName>Chicken & Fish Sandwiches</ProductName>
              <ProductPrice>$15</ProductPrice>

              <AddToCartButton
                onClick={() => {
                  handleAddToCart(
                    { id: 2, name: "Chicken & Fish Sandwiches", price: 15 },
                    selectedShop,
                    15
                  );
                  showMessage("Chicken & Fish Sandwiches");
                }}
              >
                add to Cart
              </AddToCartButton>
            </ListItem>
          </List>
        );
      case "CFK":
        return (
          <List>
            <ListItem>
              <ProductName>Ice</ProductName>
              <ProductPrice>$5</ProductPrice>

              <AddToCartButton
                onClick={() => {
                  handleAddToCart(
                    { id: 3, name: "Ice", price: 5 },
                    selectedShop,
                    5
                  );
                  showMessage("Ice");
                }}
              >
                add to Cart
              </AddToCartButton>
            </ListItem>
            <ListItem>
              <ProductName>Dessert</ProductName>
              <ProductPrice>$15</ProductPrice>

              <AddToCartButton
                onClick={() => {
                  handleAddToCart(
                    { id: 4, name: "Dessert", price: 15 },
                    selectedShop,
                    15
                  );
                  showMessage("Dessert");
                }}
              >
                add to Cart
              </AddToCartButton>
            </ListItem>
          </List>
        );
      case "Noa":
        return (
          <List>
            <ListItem>
              <ProductName>Ramen with smoked chicken</ProductName>
              <ProductPrice>$18</ProductPrice>

              <AddToCartButton
                onClick={() => {
                  handleAddToCart(
                    { id: 5, name: "Ramen with smoked chicken", price: 18 },
                    selectedShop,
                    18
                  );
                  showMessage("Ramen with smoked chicken");
                }}
              >
                add to Cart
              </AddToCartButton>
            </ListItem>
            <ListItem>
              <ProductName>Roll with salmon</ProductName>
              <ProductPrice>$20</ProductPrice>

              <AddToCartButton
                onClick={() => {
                  handleAddToCart(
                    { id: 6, name: "Roll with salmon", price: 18 },
                    selectedShop,
                    18
                  );
                  showMessage("Roll with salmon");
                }}
              >
                add to Cart
              </AddToCartButton>
            </ListItem>
          </List>
        );
      default:
        return null;
    }
  };

  return (
    <Container>
      <Title>Shops Page</Title>
      <ShopList>
        <ShopItem onClick={() => handleShopSelect("Mc Donny")}>
          Mc Donny
        </ShopItem>
        <ShopItem onClick={() => handleShopSelect("CFK")}>CFK</ShopItem>
        <ShopItem onClick={() => handleShopSelect("Noa")}>Noa</ShopItem>
      </ShopList>
      {selectedShop && (
        <div>
          <SelectedShop>
            You have selected: <strong>{selectedShop}</strong>
          </SelectedShop>
          <ProductsTitle>Menu</ProductsTitle>
          {renderProducts()}
        </div>
      )}
      {message && <div>{message}</div>}
    </Container>
  );
};

export default ShopsPage;
