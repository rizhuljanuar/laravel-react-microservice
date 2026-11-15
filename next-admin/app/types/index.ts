export interface Role {
  id: number;
  name: string;
  permissions: Permission[];
}

export interface Permission {
  id: number;
  name: string;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: Role;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
}
