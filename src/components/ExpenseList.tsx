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
    <div className="mt-4 sm:w-150 mx-3 sm:mx-auto bg-gray-100 rounded-xl shadow p-4">
      <h2 className="sm:text-2xl p-2 font-bold mb-4 text-center text-gray-800 dark:bg-slate-600 dark:text-slate-200">
        Expenses
      </h2>

      {expense.length === 0 ? (
        <div className="text-center my-6 text-lg font-semibold text-red-400">
          No Expense Yet! 📝
        </div>
      ) : (
        <div className="space-y-8">
          {sortedDates.map((date) => (
            <div key={date} className="rounded-lg bg-green-100 p-3 shadow-sm">
              <h3 className="font-bold text-green-800 mb-3 text-center">
                🗓️ {date}
              </h3>
              <ul className="space-y-3">
                {groupedExpense[date].map((exp) => (
                  <li
                    key={exp.id}
                    className="flex items-center justify-between gap-4 bg-white p-3 rounded-lg shadow hover:bg-green-50 transition"
                  >
                    <span className="flex-1 break-all text-gray-800">
                      {exp.description}
                    </span>
                    <span className="text-red-600 font-bold">
                      💲{exp.amount}
                    </span>
                    <button
                      onClick={() =>
                        confirm(
                          "Are you sure you want to delete this expense?"
                        ) && deleteExpense(exp.id)
                      }
                      className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white font-medium transition"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(ExpenseList);
