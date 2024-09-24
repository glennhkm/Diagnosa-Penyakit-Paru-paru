"use client";

import { QuestionWrapper } from "@/components/questionWrapper/questionWrapper";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { useState } from "react";
import { defaultGejala } from "@/data/defaultGejala";
import { informasiGejala } from "@/data/informasiGejala";
import { informasiPenyakit } from "@/data/informasiPenyakit";
import Marquee from "react-fast-marquee";

const Main = () => {
  const [gejalaUser, setGejalaUser] = useState(defaultGejala);
  const [diagnosa, setDiagnosa] = useState([]);

  const onSubmit = () => {};

  const handleYesButton = (gejala: string) => {
    setGejalaUser((prevGejalaUser) => ({
      ...prevGejalaUser,
      [gejala]: true,
    }));
  };

  const handleNoButton = (gejala: string) => {
    setGejalaUser((prevGejalaUser) => ({
      ...prevGejalaUser,
      [gejala]: false,
    }));
  };

  return (
    <div>
      {/* <div className="bg-[#151515] w-screen h-screen z-50 fixed top-0 left-0 text-white flex justify-center items-center">
        <p className="text-[10rem] font-bold">KELOMPOK 6</p>
      </div> */}
      <div className="fixed top-0 left-0 w-screen z-20">
        <Marquee
          direction="left"
          className="bg-white text-black text-xs p-2"
        >
          <p>Program ini hanya berfungsi sebagai alat bantu diagnosa dan telah dihitung memiliki akurasi sebesar 80%. Penting untuk dipahami bahwa hasil yang diberikan bukanlah jaminan kebenaran 100%, dan masih ada kemungkinan adanya kondisi medis lain yang tidak terdeteksi oleh program ini. Oleh karena itu, disarankan untuk tetap berkonsultasi dengan tenaga medis profesional guna mendapatkan diagnosis yang lebih akurat dan menyeluruh.</p>
          <p className="w-[50vw] h-full"></p>
        </Marquee>
      </div>
      <div className="flex flex-col w-full py-12 px-16 bg-[#151515] h-full">
        <div className="w-full h-full z-10 flex flex-col gap-3">
          <h1 className="font-bold text-6xl text-center text-white mb-11 mt-8">
            Sistem Pakar Diagnosis Penyakit Paru-Paru
          </h1>
          <div className="grid grid-cols-2 gap-4 w-full">
            {informasiGejala.map((infoGejala, index) => (
              <QuestionWrapper
                key={index}
                question={infoGejala.pertanyaan}
                setToYes={() => handleYesButton(infoGejala.gejala)}
                setToNo={() => handleNoButton(infoGejala.gejala)}
              />
            ))}
          </div>
        </div>
      </div>
      <BackgroundBeams />
    </div>
  );
};

export default Main;
