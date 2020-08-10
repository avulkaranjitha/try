export interface Product {
  id: number;
  name: string;
  qty: number;
  price: number;
}

export interface UpdateProduct {
  name: string;
  qty: number;
  price: number;
}
