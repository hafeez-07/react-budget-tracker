import type { TransactionType } from "../App";

type Props = {
  transactions: TransactionType[];
  deleteTransaction: (id: number) => void;
};

const TransactionList = ({ transactions, deleteTransaction }: Props) => {
  return (
    <div
      className="
      bg-white border border-zinc-200
      dark:bg-zinc-900 dark:border-zinc-800
      rounded-2xl shadow-md
      p-6
      transition-colors duration-300
      "
    >
      <h2 className="text-xl font-semibold mb-6">Transactions</h2>

      {transactions.length === 0 ? (
        <p className="text-zinc-500 dark:text-zinc-400 text-center py-8">
          No transactions yet.
        </p>
      ) : (
        <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="
              flex justify-between items-center
              py-4
              group
              "
            >
              {/* Left Side */}
              <div className="flex flex-col">
                <span className="font-medium text-zinc-800 dark:text-zinc-200">
                  {tx.description}
                </span>
                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                  {tx.date}
                </span>
              </div>

              {/* Right Side */}
              <div className="flex items-center gap-4">
                <span
                  className={`font-semibold ${
                    tx.type === "income"
                      ? "text-emerald-500 dark:text-emerald-400"
                      : "text-red-500 dark:text-red-400"
                  }`}
                >
                  {tx.type === "income" ? "+" : "-"}₹
                  {tx.amount.toLocaleString("en-IN")}
                </span>

                <button
                  onClick={() => deleteTransaction(tx.id)}
              className="
text-sm
text-zinc-400
hover:text-red-500
dark:hover:text-red-400
transition

"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionList;
