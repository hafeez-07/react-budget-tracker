import React from "react";
import SummaryBox from "./SummaryBox";
import type { TransactionType } from "./UserInput";
import { FaRupeeSign, FaRegCalendarAlt } from "react-icons/fa";

type TransactionListProps = {
  transactions: TransactionType[];
  deleteTransaction: (id: number) => void;
  balance: number;
  summaryRef: React.RefObject<HTMLDivElement | null>;
};

type GroupedTransactionType = Record<string, TransactionType[]>;

const TransactionList = ({
  transactions,
  deleteTransaction,
  balance,
  summaryRef,
}: TransactionListProps) => {
  const groupedTransactions: GroupedTransactionType = transactions.reduce(
    (acc, cur) => {
      if (!acc[cur.date]) acc[cur.date] = [];
      acc[cur.date].push(cur);
      return acc;
    },
    {} as GroupedTransactionType
  );

  const sortedDates = Object.keys(groupedTransactions).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <div>
      <div className="mt-4 sm:w-150 mx-3 sm:mx-auto bg-gray-100 rounded-xl shadow p-4 dark:bg-gray-800">
        <h2 className="sm:text-2xl p-2 font-bold mb-4 text-center text-gray-800 dark:bg-slate-600 dark:text-slate-200">
          Transactions
        </h2>

        {transactions.length === 0 ? (
          <div className="text-center my-6 text-lg font-semibold text-red-400">
            No Transactions Yet! 📝
          </div>
        ) : (
          <div className="space-y-8">
            {sortedDates.map((date) => (
              <div key={date} className="rounded-lg bg-green-100 p-3 shadow-sm">
                <h3 className="font-bold text-green-800 mb-3 text-center">
                  <div className="flex justify-center items-center gap-x-2">
                    <FaRegCalendarAlt /> {date}
                  </div>
                </h3>
                <ul className="space-y-3">
                  {groupedTransactions[date].map((tx) => (
                    <li
                      key={tx.id}
                      className="flex items-center justify-between gap-4 bg-white p-3 rounded-lg shadow hover:bg-green-50 transition"
                    >
                      <span className="flex-1 break-all text-gray-800">
                        {tx.description}
                      </span>

                      <span
                        className={`flex items-center font-bold ${
                          tx.type === "income"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {tx.type === "income" ? "+" : "-"}
                        <FaRupeeSign className="mx-1" />
                        {tx.amount.toLocaleString("en-IN")}
                      </span>

                      <button
                        onClick={() =>
                          confirm(
                            "Are you sure you want to delete this transaction?"
                          ) && deleteTransaction(tx.id)
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
      <div ref={summaryRef}>
        <SummaryBox balance={balance} transactions={transactions} />
      </div>
    </div>
  );
};

export default React.memo(TransactionList);
