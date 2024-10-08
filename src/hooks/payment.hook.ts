import { useMutation, useQuery } from "@tanstack/react-query";

import {
  createPayment,
  getMyPaymentHistory,
  getPaymentHistory,
} from "../services/PaymentService";
import { IPayment } from "../types";

export const useGetPaymentHistory = () => {
  return useQuery({
    queryKey: ["payment-history"],
    queryFn: async () => await getPaymentHistory(),
  });
};

export const useGetMyPaymentHistory = () => {
  return useQuery({
    queryKey: ["my-payment-history"],
    queryFn: async () => await getMyPaymentHistory(),
  });
};

export const useCreatePayment = () => {
  return useMutation({
    mutationKey: ["create-payment"],
    mutationFn: async (paymentData: IPayment) =>
      await createPayment(paymentData),
    onSuccess: (data) => {
      if (data?.success) {
        window.location.href = data?.data?.payment_url;
      }
    },
    onError(error: any) {
      throw new Error(error.message);
    },
  });
};
