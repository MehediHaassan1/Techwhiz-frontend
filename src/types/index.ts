import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface IInput {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  type?: string;
  label: string;
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
}
