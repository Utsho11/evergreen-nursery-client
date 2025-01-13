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

export interface TUnreviewedPlant {
  productId: string;
  name: string;
  image: string;
  quantity: number;
  discount: number;
  price: number;
  reviewed: boolean;
  _id: string;
}

export type TBlog = {
  _id: string;
  title: string;
  blog: string;
  image: string;
  author: TUsers;
  status: "ACTIVE" | "BLOCKED";
  createdAt?: string;
  updatedAt?: string;
};

export type TReview = {
  user: TUsers;
  plantId: string;
  review: string;
};

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

export type TUsers = {
  _id: string;
  name?: string;
  role: string;
  image?: string;
  email: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export interface TOrderHistory {
  userInfo: TUserInfo;
  _id: string;
  cartItems: ICartItem[];
  totalPrice: number;
  status: string;
  paymentStatus: string;
  transactionId: string;
  createdAt: string;
  updatedAt: string;
}

export interface TUserInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
}

export interface ICartItem {
  productId: string;
  name: string;
  image: string;
  quantity: number;
  discount: number;
  price: number;
  reviewed: boolean;
  _id: string;
}
