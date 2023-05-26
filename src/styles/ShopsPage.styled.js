import styled from "@emotion/styled";


export const Container = styled.div`
  text-align: center;
`;

export const Title = styled.h2`
  font-size: 24px;
  color: #333;
`;

export const ShopList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const ShopItem = styled.li`
  margin-bottom: 10px;
  cursor: pointer;
  color: #666;

  &:hover {
    color: #000;
    font-weight: bold;
  }
`;

export const SelectedShop = styled.p`
  margin-top: 20px;
`;

export const ProductsTitle = styled.h3`
  margin-top: 20px;
`;

export const ProductPrice = styled.span`
  font-weight: bold;
  margin-right: 20px;
`;

export const List = styled.ul`
  list-style-type: none;

`;

export const ListItem = styled.li`
  margin-bottom: 20px;
  border: 1px solid black;
  padding: 10px;
`;

export const ProductName = styled.p`
  font-weight: bold;
`;

export const AddToCartButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;