"use client";

import moment from "moment";

interface PaymentCellProps {
  payment: any;
  columnKey: string;
}

const PaymentCell: React.FC<PaymentCellProps> = ({ payment, columnKey }) => {
  const cellValue = payment[columnKey];

  switch (columnKey) {
    case "packagePrice":
      return <p>$ {cellValue}</p>;
    case "trxID": {
      const firstPart = cellValue.split("-")[0];

      return <>{firstPart} - **** - ****</>;
    }
    case "startDate": {
      return <>{moment(cellValue).format("LL")}</>;
    }
    case "endDate": {
      return <>{moment(cellValue).format("LL")}</>;
    }
    default:
      return <>{cellValue}</>;
  }
};

export default PaymentCell;
