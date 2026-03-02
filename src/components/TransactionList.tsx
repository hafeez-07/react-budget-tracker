import { useRef } from "react";
import type { TransactionType } from "../App";
import { toast } from "sonner";

type Props = {
  transactions: TransactionType[];
  setTransactions: React.Dispatch<React.SetStateAction<TransactionType[]>>;
  deleteTransaction: (id: number) => void;
};

const TransactionList = ({
  transactions,
  deleteTransaction,
  setTransactions,
}: Props) => {
  const backupRef = useRef<TransactionType[] | null>(null);

  //sort transactions by dates
  const sortedTransactions = [...transactions].sort(
    (a: TransactionType, b: TransactionType) => {
      //if entered in different changes , sort
      const diff = new Date(b.date).getTime() - new Date(a.date).getTime();
      if (diff != 0) return diff;

      //if the entries are in the same date , recent or last entered will come on top
      return b.id - a.id;
    },
  );

  const deleteAll = () => {
    if (transactions.length === 0) {
      return toast.error("No transactions to delete", {
        duration: 2000,
      });
    }

    toast("Confirm delete?", {
      duration: 4000,
      description: "You will lose all transactions permanently",
      action: {
        label: "confirm",
        onClick: () => {
          //store backup
          backupRef.current = [...transactions];

          setTransactions([]);

          toast.success("All transactions cleared", {
            duration: 6000,
            action: {
              label: "undo",
              onClick: () => {
                if (backupRef.current) {
                  setTransactions(backupRef.current);
                  backupRef.current = null;
                }
              },
            },
          });
        },
      },
      cancel: {
        label: "cancel",
        onClick: () => {},
      },
    });
  };

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
      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-semibold ">Transactions</h2>
        <button
          className="border-2border-red-600  bg-red-500  p-1 rounded hover:bg-red-600 hover:border-red-700"
          onClick={deleteAll}
        >
          Clear All
        </button>
      </div>

      {transactions.length === 0 ? (
        <p className="text-zinc-500 dark:text-zinc-400 text-center py-8">
          No transactions yet.
        </p>
      ) : (
        <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {sortedTransactions.map((tx) => (
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
                  transition"
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
