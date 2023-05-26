import styled from "@emotion/styled";

export const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
  text-align: center;
`;

export const Text = styled.p`
  color: red;
  font-size: 18px;
  text-align: center;
margin - top: 20px;
`;



export const OrderHeading = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;


export const InputField = styled.input`
  width: 90%;
  padding: 0.5rem;
  margin-bottom: 1rem;
`;

export const Button = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
`;

export const Container = styled.div`
  background-color: #f2f2f2;
  padding: 1rem;
  border-radius: 4px;
  margin-top: 1rem;
  max-width: 500px;

`;

export const CartContainer = styled.div`
  margin-top: 20px;
`;

export const ShopName = styled.h3`
  margin-bottom: 10px;
`;

export const CartItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;

export const ItemName = styled.span`
  margin-right: 10px;
`;

export const RemoveButton = styled.button`
  padding: 3px 8px;
  background-color: lightcoral;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

export const QuantityButton = styled.button`
  padding: 3px 8px;
  background-color: lightcoral;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  margin-right: 5px;
  margin-left: 5px;
`;

export const ItemPrice = styled.span`
  font-weight: bold;
  color: #333;
`;

export const ItemQuantity = styled.span`
  font-weight: bold;
  color: #333;
`;

export const ItemDetails = styled.div`
  display: flex;
  align-items: center;
`;