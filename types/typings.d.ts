import React from 'react';

interface EventDataTypes {
  id: string;
  tickets: {
    id: string;
    price: number;
    lowest_price: number;
    highest_price: number;
    title: string;
    quantity: number;
    event: string;
    owner: string;
  }[];
  paid_tickets: {
    price: number;
    owner: string;
    event_name: string;
    title: string;
    ticket: string;
    user: string;
    event_admin: string;
    used: boolean;
    quantity: number;
    date: string;
    start_time: string;
    end_time: string;
    facebook: string;
    id: string;
    qr_code: string;
  }[];
  lowest_price: number;
  highest_price: number;
  title: string;
  description: string;
  image: string;
  location: string;
  date: string;
  participants: number;
  start_time: string;
  end_time: string;
  liked: boolean;
  featured: boolean;
  website: string;
  owner: string;
  organizer: string;
  total_ticket_count: number;
  total_sold_tickets: number;
}

export interface PaidTicketDataTypes {
  price: number;
  event: StringOrNull;
  event_name: StringOrNull;
  title: StringOrNull;
  ticket: StringOrNull;
  user: StringOrNull;
  ticket_admin: string;
  used: boolean;
  quantity: number;
  date: string;
  start_time: string;
  end_time: string;
  id: string;
  qr_code: string | undefined;
}

export type ResponseType = {
  count: number | null;
  next: StringOrNull;
  previous: StringOrNull;
  results: EventDataTypes[];
};

export type PaidTicketResponseType = {
  count: number | null;
  next: StringOrNull;
  previous: StringOrNull;
  results: PaidTicketDataTypes[];
};

export type StringOrNull = string | null;

export type User = {
  name: StringOrNull;
  email: StringOrNull;
  image: string | undefined;
  tokens: {
    refresh: string | null;
    access: string | null;
  };
  auth_provider: StringOrNull;
  id: StringOrNull;
} | null;

export interface CartItems {
  id: number;
  price: number;
  //   lowest_price: number;
  title: string;
  quantity: number;
  event: string;
  eventTitle: string;
}

interface CartContextTypes {
  cartItems: CartItems[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItems[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  orderSummaryToggle: boolean;
  setOrderSummaryToggle: React.Dispatch<React.SetStateAction<boolean>>;
  cartQuantity: number;
  cartTotal: number;
  toggleOrderSummary: () => void;
  getItemQuantity(id: number): number;
  increaseCartQuantity(
    id: number,
    price: number,
    title: string,
    event: string,
    eventItem: EventDataTypes
  ): void;
  decreaseCartQuantity(id: number): void;
}

interface TicketDataTypes {
  id: number;
  price: number;
  lowest_price: number;
  highest_price: number;
  title: string;
  quantity: number;
  event: string;
  owner: string;
}

export type TicketResponseType = {
  count: number | null;
  next: StringOrNull;
  previous: StringOrNull;
  results: TicketDataTypes[];
};
