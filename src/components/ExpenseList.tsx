import React from "react";
import type { ExpenseType } from "./UserInput";

type ExpenseListProps = {
  expense: ExpenseType[];
  deleteExpense: (id: number) => void;
};

type groupedExpenseType = Record<string, ExpenseType[]>;

const ExpenseList = ({ expense, deleteExpense }: ExpenseListProps) => {
  const groupedExpense: groupedExpenseType = expense.reduce((acc, cur) => {
    if (!acc[cur.date]) acc[cur.date] = [];
    acc[cur.date].push(cur);
    return acc;
  }, {} as groupedExpenseType);

  const sortedDates = Object.keys(groupedExpense).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <div className="border-2 mt-3 sm:w-150 mx-3 sm:mx-auto bg-[#B0DB9C]">
      <h2
        className="sm:text-2xl font-semibold  mb-3 
      text-center text-black p-2 dark:bg-slate-600 dark:text-slate-200"
      >
        Expenses
      </h2>
      {expense.length === 0 ? (
        <div className="text-center my-2 text-lg font-semibold text-red-400">
          No Expense Yet!{" "}
        </div>
      ) : (
        <div className=" space-y-10 my-3 ">
          {sortedDates.map((date) => (
            <div key={date}>
              <h3 className="font-semibold text-center mb-2">🗓️{date}</h3>
              <ol className="list-decimal pl-8 space-y-2">
                {groupedExpense[date].map((exp) => (
                  <li key={exp.id}>
                    <div className="flex items-center justify-between gap-4 font-semibold">
                      <span className="flex-1 break-all ml-4">
                        {exp.description}
                      </span>
                      <span>=</span>
                      <span className=" w-24 text-left">💲{exp.amount}</span>
                      <button
                        onClick={() => {
                          if (
                            confirm(
                              "Are you sure you want to delete this expense?"
                            )
                          )
                            deleteExpense(exp.id);
                        }}
                        className="border rounded mr-2 px-2 bg-red-500 hover:outline-2"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(ExpenseList);
