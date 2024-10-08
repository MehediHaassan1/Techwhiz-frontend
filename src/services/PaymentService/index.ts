"use server";

import axiosInstance from "@/src/lib/AxiosInstance";
import { IPayment } from "@/src/types";

export const getPaymentHistory = async () => {
  try {
    const { data } = await axiosInstance.get("/payment");

    if (data.success) {
      return data;
    }
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message || "Payment retrieved failed!";

    throw new Error(errorMessage);
  }
};

export const getMyPaymentHistory = async () => {
  try {
    const { data } = await axiosInstance.get("/payment/my-payment-history");

    if (data.success) {
      return data;
    }
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message || "Payment retrieved failed!";

    throw new Error(errorMessage);
  }
};

export const createPayment = async (paymentData: IPayment) => {
  try {
    const { data } = await axiosInstance.post(
      "/payment/create-payment",
      paymentData,
    );

    if (data.success) {
      return data;
    }
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message || "Payment failed!";

    throw new Error(errorMessage);
  }
};
