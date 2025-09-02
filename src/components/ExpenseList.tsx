import React from "react";
import type { ExpenseType } from "./UserInput";

type ExpenseListProps = {
  expense: ExpenseType[];
  deleteExpense: (id: number) => void;
};

const ExpenseList = ({ expense, deleteExpense }: ExpenseListProps) => {
  console.log("expense list renders");
  return (
    <div className="border-2 mt-3 sm:w-150 mx-3 sm:mx-auto bg-[#B0DB9C]">
      <h2 className="sm:text-2xl font-semibold mt-2 mb-3 text-center">
        Expenses
      </h2>
      <ol className="list-decimal pl-6 space-y-3">
        {expense.map((expense: ExpenseType) => (
          <li className="list  pl-6 " key={expense.id}>
            <div className="flex items-center justify-between gap-4 mb-2 font-semibold">
              <span className="flex-1 break-all">{expense.description}</span>
              <span className="w-4 text-center">=</span>
              <span className=" w-24 text-left">💲{expense.amount}</span>
              <button
                onClick={() => deleteExpense(expense.id)}
                className="border rounded mr-2 px-2 bg-red-500 hover:bg-red-500/80"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default React.memo(ExpenseList);
