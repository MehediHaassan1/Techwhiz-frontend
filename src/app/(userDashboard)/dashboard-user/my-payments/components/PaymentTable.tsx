"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";

import { useGetMyPaymentHistory } from "@/src/hooks/payment.hook";
import { IPayment } from "@/src/types";
import Loading from "@/src/components/Loading";

import { paymentColumns } from "../../userConstant";

import PaymentCell from "./PaymentCell";

const PaymentTable = () => {
  const { data, isLoading } = useGetMyPaymentHistory();

  if (isLoading) return <Loading />;

  return (
    <>
      {isLoading && <Loading />}
      {data?.data?.length > 0 ? (
        <>
          <h1 className="text-3xl mb-5">Payment History</h1>
          <Table className="">
            <TableHeader columns={paymentColumns}>
              {(column) => (
                <TableColumn key={column?.uid}>{column?.name}</TableColumn>
              )}
            </TableHeader>
            <TableBody className="rounded z-0" items={data?.data}>
              {(payment: IPayment) => (
                <TableRow key={payment?._id} className="z-0">
                  {(columnKey) => (
                    <TableCell>
                      <PaymentCell
                        columnKey={columnKey as string}
                        payment={payment}
                      />
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </>
      ) : (
        <p className="text-center text-gray-400 text-3xl">
          No payment history found.
        </p>
      )}
    </>
  );
};

export default PaymentTable;
