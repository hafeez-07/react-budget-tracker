import React from "react";

type BalanceBoxProps = {
  balance: number;
};

const BalanceBox = ({ balance }: BalanceBoxProps) => {
  return (
    <div
      className="text-xs sm:text-lg text-center ml-auto font-semibold 
    border p-1 rounded hover:outline-2"
    >
      <p>Total </p>
      <p> 💲{balance}</p>
    </div>
  );
};

export default React.memo(BalanceBox);
