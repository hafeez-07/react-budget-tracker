import { useState, useEffect, useCallback } from "react";
import ExpenseList from "./ExpenseList";
import BalanceBox from "./BalanceBox";
import { FaSun, FaMoon } from "react-icons/fa";

export type ExpenseType = {
  id: number;
  description: string;
  amount: number;
  date: string;
};

const UserInput = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [expense, setExpense] = useState<ExpenseType[]>([]);
  const [balance, setBalance] = useState(0);
  const [isDark, setIsDark] = useState(true);
  const [date, setDate] = useState("");

  useEffect(() => {
    const savedExpense = localStorage.getItem("expense");
    const savedBalance = localStorage.getItem("balance");
    const savedTheme = localStorage.getItem("savedTheme");
    if (savedExpense) setExpense(JSON.parse(savedExpense));
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
      alert("please enter valid inputs");
      return;
    }
    const newExpense = {
      id: Date.now(),
      description: description,
      amount: parseFloat(amount),
      date,
    };
    const updatedExpense = [...expense, newExpense];
    setDescription("");
    setAmount("");
    setDate("");
    updateExpenseData(updatedExpense);
  };

  const themeToggle = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("savedTheme", JSON.stringify(newTheme));
  };

  const deleteExpense = useCallback(
    (deleteId: number) => {
      const updatedExpense = expense.filter(
        (expense: ExpenseType) => expense.id !== deleteId
      );
      updateExpenseData(updatedExpense);
    },
    [expense]
  );

  const updateExpenseData = (updatedExpense: ExpenseType[]) => {
    setExpense(updatedExpense);
    const totalSum = updatedExpense.reduce((res, cur) => res + cur.amount, 0);
    setBalance(totalSum);
    localStorage.setItem("expense", JSON.stringify(updatedExpense));
    localStorage.setItem("balance", JSON.stringify(totalSum));
  };

  return (
    <div>
      {/* Header */}
      <div
        className="flex flex-col items-center justify-between mb-4
       dark:bg-gray-800 dark:text-white p-3 w-full shadow shadow-gray-500"
      >
        <h1 className="text-xl sm:text-3xl font-bold text-center">
          Expense Tracker
        </h1>

        <div className="flex w-full justify-between mt-3 px-2 text-center">
          <button
            onClick={themeToggle}
            className="flex gap-3 items-center border rounded px-3 py-2 font-semibold
            hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            Theme {isDark ? <FaSun color="yellow" /> : <FaMoon color="gray" />}
          </button>
          <BalanceBox balance={balance}></BalanceBox>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={submitHandler}>
        <div
          className="flex w-[95%] max-w-md flex-col mx-2 sm:mx-auto sm:w-130
         font-semibold gap-4 border-2 p-6 min-w-0 rounded-2xl
         shadow-md bg-gradient-to-br from-[#CAE8BD] to-[#A8D5BA]
         dark:from-gray-700 dark:to-gray-800"
        >
          {/* Description */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <label className="sm:w-40 text-xs sm:text-base font-medium text-gray-700 dark:text-gray-300">
              Enter Description:
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="flex-1 border rounded-lg px-3 py-2 shadow-sm
              focus:outline-none focus:ring-2 focus:ring-amber-400
              dark:bg-gray-900 dark:text-white"
            />
          </div>

          {/* Amount */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <label className="sm:w-40 text-xs sm:text-base font-medium text-gray-700 dark:text-gray-300">
              Enter Amount:
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="flex-1 border rounded-lg px-3 py-2 shadow-sm
              focus:outline-none focus:ring-2 focus:ring-amber-400
              dark:bg-gray-900 dark:text-white"
            />
          </div>

          {/* Date */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <label className="sm:w-40 text-xs sm:text-base font-medium text-gray-700 dark:text-gray-300">
              Enter Date:
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="flex-1 border rounded-lg px-3 py-2 shadow-sm
              focus:outline-none focus:ring-2 focus:ring-amber-400
              dark:bg-gray-900 dark:text-white"
            />
          </div>

          {/* Add button */}
          <button
            type="submit"
            className="border-2 rounded-lg bg-amber-500 text-white font-semibold px-4 py-2
             hover:bg-amber-600 transition duration-200 shadow-md w-fit mx-auto"
          >
            Add Expense
          </button>
        </div>
      </form>

      {/* Expense list */}
      <ExpenseList
        expense={expense}
        deleteExpense={deleteExpense}
      ></ExpenseList>
    </div>
  );
};

export default UserInput;
