"use client";

import Loading from "@/src/components/Loading";
import { useGetPaymentHistory } from "@/src/hooks/payment.hook";

import ManagePaymentTable from "./ManagePaymentTable";

const ManagePayment = () => {
  const { data, isLoading } = useGetPaymentHistory();

  return (
    <>
      {isLoading && <Loading />}
      {data?.data && (
        <div>
          <ManagePaymentTable data={data?.data} />
        </div>
      )}
    </>
  );
};

export default ManagePayment;
