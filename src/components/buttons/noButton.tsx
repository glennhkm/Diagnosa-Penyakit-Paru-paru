import React from "react";

export const NoButton = ({ setGejala }: { setGejala: () => void }) => {
  return (
    <button onClick={setGejala} className="rounded-xl text-sm py-2 w-32 bg-amber-500 text-white">
      Tidak
    </button>
  );
};
