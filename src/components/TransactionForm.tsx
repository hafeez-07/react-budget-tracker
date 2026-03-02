import { useState } from "react";
import type { TransactionType } from "../App";

type Props = {
  setTransactions: React.Dispatch<
    React.SetStateAction<TransactionType[]>
  >;
};

const TransactionForm = ({ setTransactions }: Props) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!description.trim() || parseFloat(amount) <= 0 || !date) return;

    const newTransaction: TransactionType = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      date,
      type,
    };

    setTransactions((prev) => [...prev, newTransaction]);

    setDescription("");
    setAmount("");
    setDate("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
      bg-white border border-zinc-200
      dark:bg-zinc-900 dark:border-zinc-800
      rounded-2xl shadow-md
      p-8 space-y-8
      transition-colors duration-300
      "
    >
      <div className="grid sm:grid-cols-2 gap-6">
        <Input
          label="Description"
          value={description}
          onChange={setDescription}
        />

        <Input
          label="Amount"
          type="number"
          value={amount}
          onChange={setAmount}
        />

        <Input
          label="Date"
          type="date"
          value={date}
          onChange={setDate}
        />

        <div className="flex flex-col gap-2">
          <label className="text-sm text-zinc-500 dark:text-zinc-400">
            Type
          </label>
          <select
            value={type}
            onChange={(e) =>
              setType(e.target.value as "income" | "expense")
            }
            className="
            bg-zinc-100 border border-zinc-300
            dark:bg-zinc-800 dark:border-zinc-700
            rounded-xl px-4 py-2
            focus:outline-none focus:ring-2 focus:ring-orange-500
            transition
            "
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="
        w-full
        bg-orange-500 hover:bg-orange-600
        active:scale-95
        transition-all duration-200
        rounded-xl py-3
        font-semibold
        text-white
        shadow-md hover:shadow-lg
        "
      >
        Add Transaction
      </button>
    </form>
  );
};

type InputProps = {
  label: string;
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  type?: string;
};

const Input = ({
  label,
  value,
  onChange,
  type = "text",
}: InputProps) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm text-zinc-500 dark:text-zinc-400">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="
      bg-zinc-100 border border-zinc-300
      dark:bg-zinc-800 dark:border-zinc-700
      rounded-xl px-4 py-2
      focus:outline-none focus:ring-2 focus:ring-orange-500
      transition
      "
      required
    />
  </div>
);

export default TransactionForm;