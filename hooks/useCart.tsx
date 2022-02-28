import React from 'react';
import useLocalStorage from './useLocalStorage';

const useCart = (): TCartHook => {

  const {
    items: cart,
    saveItem: setCart,
  } = useLocalStorage('cart', []);

  const addToCart = (product: TProduct, quantity: number = 1) => {
    const index = cart.findIndex((item: CartItem) => item.product.id === product.id);
    const newCart = [...cart];
    if (index !== -1) {
      newCart[index].quantity += quantity;
    } else {
      newCart.push({
        'product': product,
        quantity: quantity,
      });
    }
    setCart(newCart);
  };


  const removeFromCart = (product: TProduct) => {
    const index = cart.findIndex((item: CartItem) => item.product.id === product.id);
    const newCart = [...cart];
    if (index !== -1) {
      newCart[index].quantity--;

      if (newCart[index].quantity === 0) {
        newCart.splice(index, 1);
      }
    }

    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
  };
};

export default useCart;
