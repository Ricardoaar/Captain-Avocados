import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Cart from '@components/SVG/Cart';
import Avocado from '@components/SVG/Avocado';
// @ts-ignore
import useCart from '@hooks/useCart';
// @ts-ignore
import styled from 'styled-components';

const LinkContainer = styled.a`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.5rem;
  user-select: none;

  &:hover {
    background-color: rgba(103, 185, 79, 0.45);
    cursor: pointer;
  }

  > * + * {
    margin-left: 0.5rem;
  }

  @media (max-width: 350px) {
    padding: 0.4rem 0.5rem;
  }
`;
const StyledNavbar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  z-index: 10;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(119, 217, 84, 0.33);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding-left: 2.5rem;
  padding-right: 2.5rem;
  box-sizing: border-box;
  @media (max-width: 350px) {
    padding-left: 0;
    padding-right: 0;
  }
`;

const Navbar = ({ cart }: { cart: CartItem[] }) => {

  const currentSize = cart ? cart.reduce((acc, curr) => acc + curr.quantity, 0) : 0;
  return (
    <StyledNavbar className='navbar'>
      <Link href='/'>
        <LinkContainer>
          <Avocado width='32px' height='32px' />
          <p className='text-center'> The &nbsp;<b className='green-light'>Captain's</b> &nbsp;Avocados</p>
        </LinkContainer>
      </Link>
      <Link href='/cart'>
        <LinkContainer>
          <Cart />
          <p className='text-center'> Cart
            ({cart ? (currentSize < 10 ? currentSize : '9+') : ''})</p>
        </LinkContainer>
      </Link>
      <style jsx>
        {`
          .text-center {
            text-align: center;
          }
        `
        }
      </style>

    </StyledNavbar>
  )
    ;
};

export default Navbar;
