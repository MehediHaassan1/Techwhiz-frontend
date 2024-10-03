import { ReactNode, SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface IInput {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  type?: string;
  label: string | ReactNode
  name: string;
  disabled?: boolean;
}

export interface IUser {
  _id: string
  name: string
  userName: string
  email: string
  phone: string
  role: string
  gender: string
  birthday: string
  profileImage: string
  isVerified: boolean
  isDeleted: boolean
  followers: any[]
  following: any[]
  bio: string
  subscription: string
  createdAt: string
  updatedAt: string
  __v: number
  passwordChangedAt: string
}

export interface IPost {
  _id: string
  title: string
  content: string
  author: IUser
  category: string
  tags: string[]
  isPremium: boolean
  upVotes: number
  downVotes: number
  images: string[]
  status: string
  pdfVersion: string
  isDeleted: boolean
  comments: IComment[]
  createdAt: string
  updatedAt: string
  __v: number
}

export interface IComment {
  user: IUser
  content: string
  _id: string
  createdAt: string
  updatedAt: string
}