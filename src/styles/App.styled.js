import styled from "@emotion/styled";
import { NavLink} from "react-router-dom";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Nav = styled.nav`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export const StyledNavLink = styled(NavLink)`
  margin: 0 10px;
  padding: 5px;
  color: black;
  text-decoration: none;

  &.active {
    font-weight: bold;
  }
`;

;

