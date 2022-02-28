import React, { useEffect, useState } from 'react';
// @ts-ignore
import { CartContainer } from '@components/Cart/StyledComponents';
import Image from 'next/image';

const Cart = ({ cart, removeFromCart, addToCart, clearCart }:
                {
                  cart: CartItem[]
                  removeFromCart: (id: TProduct) => void
                  addToCart: (id: TProduct) => void
                  clearCart: () => void
                }) => {

  return (
    <CartContainer>
      <h2 className='no-selection green-light'>Cart</h2>

      <ul>
        {(cart && cart.length > 0) ? (cart.map(({ product: item, quantity }) => (
          <li key={item.id}>
            <Image src={item.image} width={'80px'} height={'80px'} layout='fixed' />
            <p>    {item.name}</p>
            <div>
              <button onClick={() => removeFromCart(item)}>-</button>
              <button onClick={() => addToCart(item)}>+</button>
            </div>
            <span> {quantity}</span>

          </li>
        ))) : 'Cart is empty'}
      </ul>
      <div className='btn-container'>
        <button className='btn-clear bg-red' onClick={clearCart}>Clear Cart</button>
        <button className='btn-buy bg-green'
                onClick={() => alert('These are my avos, not yours, no matter if you pay! 😒 ')}>Buy
        </button>
      </div>
      <style jsx>

        {`

          .btn-container {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;

          }

          .btn-container > * + * {
            margin-left: 10px;
          }


          .btn-clear, .btn-buy {
            color: #fff;
            border: none;
            border-radius: 5px;
            padding: 10px;
            box-shadow: 0px 0px 5px #000;
          }

          .btn-clear:hover, .btn-buy:hover {
            transform: translateY(-3px) scale(1.1);
            box-shadow: 0px 0px 10px #000;

          }




        `}
      </style>

    </CartContainer>
  );
};
export default Cart;
