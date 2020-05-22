import React from 'react';
import { bool, func } from 'prop-types';
import styled from 'styled-components';
import {colors,mobile} from "../../styles/globalStyle";
import {css} from 'styled-components';


const StyledBurger = styled.button`
  position: absolute;
  top: 2rem;
  left: 2rem;
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 35px;
  height: 30px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
  &:focus {
    outline: none;
  }
  ${mobile(css`display:flex;`)}

  div {
    width: 2rem;
    height: 0.25rem;
    background: ${({ open }) => open ? colors.brandDarker : colors.brandDarker};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;
    
    :first-child {
      transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }

    :nth-child(2) {
      opacity: ${({ open }) => open ? '0' : '1'};
      transform: ${({ open }) => open ? 'translateX(20px)' : 'translateX(0)'};
    }

    :nth-child(3) {
      transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
`;

const Burger = ({ open, setOpen }) => {
    return (
        <StyledBurger open={open} onClick={() => setOpen(!open)}>
            <div />
            <div />
            <div />
        </StyledBurger>
    )
}
Burger.propTypes = {
    open: bool.isRequired,
    setOpen: func.isRequired,
};

export default Burger;