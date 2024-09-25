import React from "react";
import { XIcon } from "../icons/xIcon";
import { PenyakitDanSolusi } from "@/types/penyakitDanSolusi";

interface DiagnosaModalProps {
    setShowDiagnosa: React.Dispatch<React.SetStateAction<boolean>>;
    diagnosaInfo: string;
    diagnosa: PenyakitDanSolusi[];
}

export const DiagnosaModal = (props: DiagnosaModalProps) => {
  return (
    <div className="w-screen h-screen bg-black/60 fixed top-0 left-0 flex justify-center items-center z-50">
      <div className="bg-[#151515] shadow-lg shadow-black rounded-xl px-12 py-10 relative text-white">
        <button onClick={() => props.setShowDiagnosa(false)} className="absolute -top-2 -right-2 bg-red-800 rounded-full p-1 pb-[0.29rem] hover:scale-110 duration-150">
          <XIcon className="size-4 " />
        </button>
        <h2 className="font-bold text-4xl text-center">Diagnosa</h2>
        <p className="">{props.diagnosaInfo}</p>
        <ul className="list-disc list-inside">
          {props.diagnosa.map((penyakit, index) => (
            <li key={index} className="">
              <p>{penyakit.namaPenyakit}</p>
              <p>{penyakit.solusi}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
