import { useState, useEffect, useCallback } from "react";
import ExpenseList from "./ExpenseList";
import BalanceBox from "./BalanceBox";
import { FaSun, FaMoon } from "react-icons/fa";

export type ExpenseType = {
  id: number;
  description: string;
  amount: number;
};

const UserInput = () => {
  console.log("userInput renders");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [expense, setExpense] = useState<ExpenseType[]>([]);
  const [balance, setBalance] = useState(0);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedExpense = localStorage.getItem("expense");
    const savedBalance = localStorage.getItem("balance");

    if (savedExpense) setExpense(JSON.parse(savedExpense));
    if (savedBalance) setBalance(JSON.parse(savedBalance));
  }, []);

  // Apply/remove the "dark" class on <html> whenever isDark changes
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
    };
    const updatedExpense = [...expense, newExpense];
    setDescription("");
    setAmount("");
    // setExpense(updatedExpense)
    updateExpenseData(updatedExpense);
  };

  const deleteExpense = useCallback(
    (deleteId: number) => {
      console.log("delete renders");
      const updatedExpense = expense.filter(
        (expense: ExpenseType) => expense.id !== deleteId
      );
      updateExpenseData(updatedExpense);
    },
    [expense]
  );

  const updateExpenseData = (updatedExpense: ExpenseType[]) => {
    console.log("update expense renders");
    setExpense(updatedExpense);
    const totalSum = updatedExpense.reduce((res, cur) => res + cur.amount, 0);
    setBalance(totalSum);
    localStorage.setItem("expense", JSON.stringify(updatedExpense));
    localStorage.setItem("balance", JSON.stringify(totalSum));
  };

  return (
    <div>
      <div
        className="flex flex-col items-center  justify-between mb-4
       dark:bg-gray-800 dark:text-white p-3 w-full shadow shadow-gray-500 "
      >
        <div className=" text-center  w-full">
          <h1 className="text-xl sm:text-3xl font-bold">Expense Tracker</h1>
        </div>

        <div className="flex w-full  justify-between mt-3 px-2  text-center">
          <button
            onClick={() => setIsDark(!isDark)}
            className="flex gap-3 items-center border rounded px-2 h-10 font-semibold"
          >
            Theme {isDark ? <FaSun color="yellow" /> : <FaMoon color="gray" />}
          </button>
          <BalanceBox balance={balance}></BalanceBox>
        </div>
      </div>

      <form onSubmit={submitHandler}>
        <div
          className="flex  w-[95%] max-w-md flex-col mx-2  sm:mx-auto sm:w-130
         font-semibold sm:gap-2 border-2 p-2 min-w-0 bg-[#CAE8BD]"
        >
          <div className=" flex gap-2 flex-col sm:flex-row justify-between my-3">
            <label className="text-xs sm:text-lg flex-1 sm:text-right sm:pr-5">
              Description :{" "}
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="border rounded flex-2 pl-2"
            ></input>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row  justify-between min-w-0 mb-3">
            <label className="flex-1 sm:text-right sm:pr-5 text-xs sm:text-lg">
              Amount :
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="border rounded flex-2"
            ></input>
          </div>
          <button
            type="submit"
            className="border-2  rounded  bg-amber-500 text-amber-50
             hover:bg-amber-500/80 w-15 mx-auto"
          >
            Add
          </button>
        </div>
      </form>
      <ExpenseList
        expense={expense}
        deleteExpense={deleteExpense}
      ></ExpenseList>
    </div>
  );
};

export default UserInput;
