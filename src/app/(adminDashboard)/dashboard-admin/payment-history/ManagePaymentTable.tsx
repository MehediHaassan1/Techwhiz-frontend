"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";

import { IPayment } from "@/src/types";

import { paymentHistoryColumns } from "../adminConstant";

import ManagePaymentCell from "./ManagePaymentCell";

interface IProps {
  data: IPayment[];
}

const ManagePaymentTable = ({ data }: IProps) => {
  return (
    <div>
      <h1 className="text-3xl mb-5">Payment History</h1>
      <Table>
        <TableHeader columns={paymentHistoryColumns}>
          {(column) => (
            <TableColumn
              key={column?.uid}
              align={column?.uid === "actions" ? "center" : "start"}
            >
              {column?.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody className="rounded z-0" items={data}>
          {(item) => (
            <TableRow key={item?._id} className="z-0">
              {(columnKey) => (
                <TableCell>
                  <ManagePaymentCell
                    columnKey={columnKey as string}
                    payment={item}
                  />
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManagePaymentTable;
