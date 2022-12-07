import { View, Text } from 'react-native';
import React, { createContext, ReactNode, useContext, useState } from 'react';
import { CartContextTypes, CartItems, EventDataTypes } from '../types/typings';

const CartContext = createContext({} as CartContextTypes);

export function useCartContext() {
  return useContext(CartContext);
}

export default function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItems[]>([]);
  const [loading, setLoading] = useState(false);
  const [orderSummaryToggle, setOrderSummaryToggle] = useState(false);

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const cartTotal = cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const toggleOrderSummary = () => setOrderSummaryToggle(!orderSummaryToggle);

  const getItemQuantity = (id: string) => {
    const qty = cartItems.find((item) => item.id === id)?.quantity || 0;
    console.log(qty);
    return qty;
  };

  function increaseCartQuantity(
    id: string,
    price: number,
    title: string,
    eventId: string,
    eventItem: EventDataTypes
  ) {
    const AvailableTicket =
      eventItem?.total_ticket_count - eventItem?.total_sold_tickets;
    setCartItems((currItems) => {
      if (!currItems.find((item) => item.id === id)) {
        return [
          ...currItems,
          {
            id,
            title,
            event: eventId,
            price,
            quantity: 1,
            eventTitle: eventItem.title,
          },
        ];
      } else {
        return currItems.map((item) => {
          if (item.id === id && cartQuantity < AvailableTicket) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseCartQuantity(id: string) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartQuantity,
        cartTotal,
        decreaseCartQuantity,
        getItemQuantity,
        increaseCartQuantity,
        loading,
        orderSummaryToggle,
        setCartItems,
        setLoading,
        setOrderSummaryToggle,
        toggleOrderSummary,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
