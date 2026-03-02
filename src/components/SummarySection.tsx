import type { TransactionType } from "../App";

type Props = {
  transactions: TransactionType[];
  balance: number;
};

const SummarySection = ({ transactions, balance }: Props) => {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-3 gap-6">
        <Card title="Income" value={income} variant="income" />
        <Card title="Expense" value={expense} variant="expense" />
        <Card title="Balance" value={balance} variant="balance" />
      </div>
    </div>
  );
};

type CardProps = {
  title: string;
  value: number;
  variant: "income" | "expense" | "balance";
};

const Card = ({ title, value, variant }: CardProps) => {
  const variantStyles = {
    income: "text-emerald-500 dark:text-emerald-400",
    expense: "text-red-500 dark:text-red-400",
    balance: "text-blue-500 dark:text-blue-400",
  };

  return (
    <div
      className="
     
      bg-white border border-zinc-200
      dark:bg-zinc-900 dark:border-zinc-800
      rounded-2xl p-6 shadow-md
      hover:-translate-y-1 hover:shadow-xl
      transition-all duration-200
      "
    >
      <p className="text-sm text-zinc-500 dark:text-zinc-400">{title}</p>

      <p className={`text-2xl font-semibold mt-2 ${variantStyles[variant]}`}>
        ₹{value.toLocaleString("en-IN")}
      </p>
    </div>
  );
};

export default SummarySection;
