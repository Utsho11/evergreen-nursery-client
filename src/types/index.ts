import { ReactNode, SVGProps } from "react";
import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type TError = {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};

export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
};

export type TResponse<T> = {
  data?: T;
  error?: TError;
  meta?: TMeta;
  success: boolean;
  message: string;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

export interface TPlant {
  _id: string;
  title: string;
  description: string;
  images: string[];
  price: number;
  discount: number;
  rating: number;
  category: TCategory;
  quantity: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface TCategory {
  _id: string;
  name: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
}

export type TRoute = {
  path: string;
  element: ReactNode;
};
export type TSidebarItem =
  | {
      key: string;
      label: ReactNode;
      children?: TSidebarItem[];
    }
  | undefined;

export type TUserPath = {
  name?: string;
  path?: string;
  element?: ReactNode;
  children?: TUserPath[];
};

export interface TProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  discount: number;
  inventoryCount: string;
  imageUrl: string;
  shopName?: string;
  categoryName?: string;
  shop?: TProductShop;
  category?: TProductCategory;
}

export interface TProductShop {
  id: string;
  name: string;
}

export interface TProductCategory {
  name: string;
}

export type TUsers = {
  id: string;
  name?: string;
  role: string;
  image?: string;
  email: string;
  password: string;
  needPasswordChange: boolean;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export interface TOrderItem {
  id: string;
  productId: string;
  product: IProduct;
}

export interface IProduct {
  name: string;
  imageUrl: string;
}

export interface TOrderHistory {
  quantity: number;
  productName: string;
  productImage: string;
  productPrice: string;
  transactionId: string;
  createdAt: string;
}

export interface TTNXHistory {
  orderId: string;
  transactionId: string;
  amount: string;
  paymentStatus: string;
  createdAt: string;
}

export interface TReview {
  rating: number;
  comment: string;
  username: string;
  image: string;
}
