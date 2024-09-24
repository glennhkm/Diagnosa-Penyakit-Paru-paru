import React from "react";

export const YesButton = ({ setGejala }: { setGejala: () => void }) => {
  return (
    <button onClick={setGejala} className="rounded-xl text-sm w-32 py-2 bg-green-600 text-white">
      Ya
    </button>
  );
};
