"use server";

import axiosInstance from "@/src/lib/AxiosInstance";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const userRegister = async (registerData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post('/auth/register', registerData);
    if (data.success) {
      return data;
    }
  } catch (error: any) {
    throw new Error(error);
  }
}

export const userLogin = async (loginData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post('/auth/login', loginData);
    if (data.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      cookies().set("refreshToken", data?.data?.refreshToken);
    }
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
}

export const userLogout = async () => {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
}


export const getCurrentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;
  let decodedToken = null;

  if (accessToken) {
    const { data } = await axiosInstance.get('/users/get-me');
    if (data.success) {
      return data?.data;
    }
  }
  return decodedToken;
}

export const getNewAccessToken = async () => {
  try {
    const refreshToken = cookies().get("refreshToken")?.value;

    const res = await axiosInstance({
      url: "/auth/refresh-token",
      method: "POST",
      withCredentials: true,
      headers: {
        cookie: `refreshToken=${refreshToken}`,
      },
    });

    return res.data;
  } catch (error) {
    throw new Error("Failed to get new access token");
  }
};