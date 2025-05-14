import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find(item => item.name === product.name);
      if (existing) {
        return prevItems.map(item =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productName) => {
    setCartItems((prevItems) =>
      prevItems.filter(item => item.name !== productName)
    );
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    isCartOpen,
    toggleCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

