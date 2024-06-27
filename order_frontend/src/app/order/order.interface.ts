// order.model.ts

export interface OrderUnit {
  amount: number;
  price: number;
  product: number;
  order: number;
  product_name: string;  // Add product_name field
  // other fields if any
}
export interface Order {
  id: number;
  code: string;
  code_year: string;
  date_registered: string;
  customer: number;
  creator: number;
  customerDetails?: {
    first_name: string;
    last_name: string;
  };
  creatorDetails?: {
    username: string;
    last_name: string;
  };
}
export interface OrderResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Order[];
}

export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
}


export interface Product {
  id: number;
  name: string;
  // other fields if any
}
