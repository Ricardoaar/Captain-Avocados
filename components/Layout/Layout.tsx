import React, { ComponentProps, DetailedReactHTMLElement } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import useCart from '@hooks/useCart';
// @ts-ignore
import styled from 'styled-components';

const Layout: React.FC = ({ children }: ComponentProps<any>) => {

  const {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
  } = useCart();

  const FixerDiv = styled.div`
    margin-top: 100px;
  `;

  const childArr = React.Children.toArray(children);

  return (
    <div>
      <Navbar cart={cart} />
      <FixerDiv />
      {childArr.map((child: any) => {
        return React.cloneElement(child, { cart, addToCart, removeFromCart, clearCart });
      })}

      <Footer />
    </div>
  );
};

export default Layout;
