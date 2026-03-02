import { useState, useEffect, useCallback, useRef } from "react";
import Navbar from "./components/Navbar";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import SummarySection from "./components/SummarySection";
import Footer from "./components/Footer";
import { Toaster, toast } from "sonner";

export type TransactionType = {
  id: number;
  description: string;
  amount: number;
  date: string;
  type: "income" | "expense";
};

function App() {
  const [transactions, setTransactions] = useState<TransactionType[]>(() => {
    try {
      const saved = localStorage.getItem("transactions");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const savedTheme = localStorage.getItem("theme");
      return savedTheme ? JSON.parse(savedTheme) : true;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(isDark));

    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const deleteTransaction = useCallback((id: number) => {
    toast("confirm delete?", {
      duration: 3000,
      description: "This will permanently delete the data",
      action: {
        label: "confirm",
        onClick: () => {
          setTransactions((prev) => prev.filter((tx) => tx.id !== id));
        },
      },
      cancel: {
        label: "cancel",
        onClick: () => {},
      },
    });
  }, []);

  const balance = transactions.reduce((acc, tx) => {
    return tx.type === "expense" ? acc - tx.amount : acc + tx.amount;
  }, 0);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-100 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 transition-colors duration-300">
      <Toaster position="top-center" />
      <Navbar isDark={isDark} setIsDark={setIsDark} />

      <div className="w-full max-w-6xl mx-auto px-4 py-10 space-y-12">
        <SummarySection transactions={transactions} balance={balance} />

        <TransactionForm setTransactions={setTransactions} />

        <TransactionList
          transactions={transactions}
          setTransactions={setTransactions}
          deleteTransaction={deleteTransaction}
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;
