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
    end_date: string;
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
  start_date: string;
  end_date: string;
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

export type ResponseType = {
  count: number | null;
  next: StringOrNull;
  previous: StringOrNull;
  results: EventDataTypes[];
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
