import React from "react";
import { FaRupeeSign } from "react-icons/fa";
import type { TransactionType } from "./UserInput";

type SummaryBoxProps = {
  balance: number;
  transactions: TransactionType[];
};

const SummaryBox = ({ balance, transactions }: SummaryBoxProps) => {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((res, cur) => {
      return res + cur.amount;
    }, 0);
  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((res, cur) => {
      return res + cur.amount;
    }, 0);
  return (
    <div className="flex gap-x-3 font-bold">
      <div className="border rounded p-2 hover:ring-2 ring-green-400">
        <p>Income</p>
        <p className="flex items-center justify-center gap-x-1 text-green-400">
          <FaRupeeSign className="sm:text-md text-xs" />
          {income.toLocaleString("en-IN")}
        </p>
      </div>
      <div className="border rounded p-2 hover:ring-2 ring-red-400">
        <p>Expense</p>
        <p className="flex items-center gap-x-1 justify-center text-red-400 ">
          <FaRupeeSign className="sm:text-md text-xs" />
          {expense.toLocaleString("en-IN")}
        </p>
      </div>
      <div className="border rounded p-2 hover:ring-2 ring-blue-400 mr-2">
        <p>Balance</p>
        <p className="flex items-center justify-center text-blue-400 gap-x-1">
          <FaRupeeSign className="sm:text-md text-xs" />
          {balance.toLocaleString("en-IN")}
        </p>
      </div>
    </div>
  );
};

export default React.memo(SummaryBox);
