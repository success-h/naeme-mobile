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
  sold_ticket_count: number;
}

export interface TicketDataTypes {
  price: number;
  event: StringOrNull;
  event_name: StringOrNull;
  title: StringOrNull;
  ticket: StringOrNull;
  user: StringOrNull;
  event_admin: string;
  used: boolean;
  quantity: number;
  date: StringOrNull;
  start_time: StringOrNull;
  end_time: StringOrNull;
  id: string;
  qr_code: StringOrNull;
}

export type ResponseType = {
  count: number | null;
  next: StringOrNull;
  previous: StringOrNull;
  results: EventDataTypes[];
};

export type TicketResponseType = {
  count: number | null;
  next: StringOrNull;
  previous: StringOrNull;
  results: TicketDataTypes[];
};

type StringOrNull = string | null;

export type User = {
  username: StringOrNull;
  email: StringOrNull;
  image: string | undefined;
  tokens: {
    refresh: StringOrNull;
    access: StringOrNull;
  };
  auth_provider: StringOrNull;
  id: StringOrNull;
};
