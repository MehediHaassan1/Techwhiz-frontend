import { ReactNode, SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface IInput {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  type?: string;
  label: string | ReactNode;
  name: string;
  disabled?: boolean;
}

export interface IUser {
  _id: string;
  name: string;
  userName: string;
  email: string;
  phone: string;
  role: string;
  gender: string;
  birthday: string;
  profileImage: string;
  isVerified: boolean;
  isDeleted: boolean;
  followers: any[];
  following: any[];
  bio: string;
  subscription: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  status: "active" | "block";
  passwordChangedAt: string;
  address: string;
  coverImage: string;
}

export interface IPost {
  _id: string;
  title: string;
  description: string;
  content: string;
  thumbnail: string;
  author: IUser;
  category: string;
  tags: string[];
  isPremium: boolean;
  upVotes: string[];
  downVotes: string[];
  status: string;
  pdfVersion: string;
  isDeleted: boolean;
  comments: IComment[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IComment {
  user: IUser;
  content: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICreatePost {
  title: string;
  description: string;
  content: string;
  thumbnail: string;
  category: string;
  tags: string[];
  pdfVersion?: string;
  isPremium: boolean;
  author: string;
}
export interface IUpdatePost {
  title?: string;
  description?: string;
  content?: string;
  thumbnail?: string;
  category?: string;
  tags?: string[];
  pdfVersion?: string;
  isPremium?: boolean;
  author?: string;
}

export interface IPayment {
  _id: string;
  user: IUser;
  packageName: string;
  packagePrice: number;
  startDate: string;
  endDate: string;
  trxID: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IPlan {
  name: string;
  price: number;
  description: string;
  features: string[];
}

export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
}

export type IMonthlyAnalytics = {
  month: string;
  totalFollowers: number;
  totalFollowings: number;
  totalPayments: number;
  totalPosts: number;
};

export type IAggregatedTotals = {
  totalFollowers: number;
  totalFollowings: number;
  totalPayments: number;
  totalPosts: number;
};
