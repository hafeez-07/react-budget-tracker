import { useState, useEffect, useCallback, useRef } from "react";
import TransactionList from "./TransactionList";

import { FaSun, FaMoon } from "react-icons/fa";

export type TransactionType = {
  id: number;
  description: string;
  amount: number;
  date: string;
  type: "income" | "expense";
};

const UserInput = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [balance, setBalance] = useState(0);
  const [isDark, setIsDark] = useState(true);
  const [date, setDate] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");
  const summaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedTransactions = localStorage.getItem("transactions");
    const savedBalance = localStorage.getItem("balance");
    const savedTheme = localStorage.getItem("savedTheme");
    if (savedTransactions) setTransactions(JSON.parse(savedTransactions));
    if (savedBalance) setBalance(JSON.parse(savedBalance));
    if (savedTheme) setIsDark(JSON.parse(savedTheme));
  }, []);

  useEffect(() => {
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDark]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (description === "" || parseFloat(amount) <= 0) {
      alert("Please enter valid inputs");
      return;
    }
    const newTransaction: TransactionType = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      date,
      type,
    };
    const updatedTransactions = [...transactions, newTransaction];
    setDescription("");
    setAmount("");
    setDate("");
    updateTransactionData(updatedTransactions);
  };

  const themeToggle = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("savedTheme", JSON.stringify(newTheme));
  };

  const deleteTransaction = useCallback(
    (deleteId: number) => {
      const updatedTransactions = transactions.filter(
        (transaction) => transaction.id !== deleteId
      );
      updateTransactionData(updatedTransactions);
    },
    [transactions]
  );

  const updateTransactionData = (updatedTransactions: TransactionType[]) => {
    setTransactions(updatedTransactions);

    const totalSum = updatedTransactions.reduce((res, cur) => {
      return cur.type === "expense" ? res - cur.amount : res + cur.amount;
    }, 0);

    setBalance(totalSum);
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
    localStorage.setItem("balance", JSON.stringify(totalSum));
  };

  return (
    <div>
      <div
        className="flex flex-col items-center justify-between mb-4
       dark:bg-gray-800 dark:text-white p-3 w-full shadow shadow-gray-500"
      >
        <h1 className="text-xl sm:text-3xl font-bold text-center">
          Budget Tracker
        </h1>

        <div className="flex w-full justify-between mt-3 px-2 text-center">
          <button
            onClick={themeToggle}
            className="flex gap-3 items-center border rounded p-2  font-semibold
            hover:ring-2 dark:hover:bg-gray-700 transition mr-2"
          >
            Theme {isDark ? <FaSun color="yellow" /> : <FaMoon color="gray" />}
          </button>
          <button
            onClick={() => {
              if (transactions.length === 0) alert("No transactions yet!");
              else summaryRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
            className="border rounded p-2 font-semibold hover:ring-3 ring-orange-300"
          >
            View summary
          </button>
        </div>
      </div>

      <form onSubmit={submitHandler}>
        <div
          className="flex w-[95%] max-w-md flex-col mx-2 sm:mx-auto sm:w-130
         font-semibold gap-4 border-2 p-6 min-w-0 rounded-2xl
         shadow-md bg-gradient-to-br from-[#CAE8BD] to-[#A8D5BA]
         dark:from-gray-700 dark:to-gray-800"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <label className="sm:w-40 text-xs sm:text-base font-medium text-gray-700 dark:text-gray-300">
              Enter Description :
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="flex-1 h-10 border rounded-lg px-3 py-2 shadow-sm
              focus:outline-none focus:ring-2 focus:ring-amber-400
              dark:bg-gray-900 dark:text-white"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <label className="sm:w-40 text-xs sm:text-base font-medium text-gray-700 dark:text-gray-300">
              Enter Amount :
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="flex-1 h-10 border rounded-lg px-3 py-2 shadow-sm
              focus:outline-none focus:ring-2 focus:ring-amber-400
              dark:bg-gray-900 dark:text-white"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <label className="sm:w-40 text-xs sm:text-base font-medium text-gray-700 dark:text-gray-300">
              Enter Type :
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as "income" | "expense")}
              className="flex-1 h-10 border rounded-lg px-3 py-2 shadow-sm
              focus:outline-none focus:ring-2 focus:ring-amber-400
              dark:bg-gray-900 dark:text-white"
              required
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <label className="sm:w-40 text-xs sm:text-base font-medium text-gray-700 dark:text-gray-300">
              Enter Date :
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="flex-1 h-10 border rounded-lg px-3 py-2 shadow-sm
              focus:outline-none focus:ring-2 focus:ring-amber-400
              dark:bg-gray-900 dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="border-2 rounded-lg bg-amber-500 text-white font-semibold px-4 py-2
             hover:bg-amber-600 transition duration-200 shadow-md w-fit mx-auto"
          >
            Add Transaction
          </button>
        </div>
      </form>

      <TransactionList
        transactions={transactions}
        deleteTransaction={deleteTransaction}
        balance={balance}
        summaryRef={summaryRef}
      />
    </div>
  );
};

export default UserInput;
