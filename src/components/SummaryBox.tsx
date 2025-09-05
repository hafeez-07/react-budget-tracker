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
    <div className="grid grid-cols-3 gap-3 font-bold  text-center min-w-0 max-w-150 my-4 sm:mx-auto mx-2 ">
      <div
        className="border   rounded p-2 hover:ring-2 ring-green-400
      dark:bg-green-800 dark:text-green-200 dark:border-green-700  bg-green-100 text-green-700"
      >
        <p>Income</p>
        <p className=" flex items-center justify-center gap-1 text-green-400 text-xs sm:text-lg">
          <FaRupeeSign />
          {income.toLocaleString("en-IN")}
        </p>
      </div>
      <div
        className="border rounded p-2 hover:ring-2 ring-red-400 bg-red-100 text-red-900 
      dark:bg-red-800  dark:text-red-200 dark:border-red-700"
      >
        <p>Expense</p>
        <p className="flex items-center gap-1 justify-center text-red-400 text-xs sm:text-lg">
          <FaRupeeSign />
          {expense.toLocaleString("en-IN")}
        </p>
      </div>
      <div
        className="border rounded p-2 hover:ring-2 ring-blue-400 bg-blue-100 text-blue-900
      dark:text-blue-200 dark:bg-blue-800 dark:border-blue-700 "
      >
        <p>Balance</p>
        <p className="flex items-center justify-center text-blue-400 gap-1 text-xs sm:text-lg">
          <FaRupeeSign />
          {balance.toLocaleString("en-IN")}
        </p>
      </div>
    </div>
  );
};

export default React.memo(SummaryBox);
