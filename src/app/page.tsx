"use client";

import { QuestionWrapper } from "@/components/questionWrapper/questionWrapper";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { useEffect, useState } from "react";
import { defaultGejala } from "@/data/defaultGejala";
import { informasiGejala } from "@/data/informasiGejala";
import { informasiPenyakit } from "@/data/informasiPenyakit";
import toast from "react-hot-toast";
import Marquee from "react-fast-marquee";
import { ArrowIcon } from "@/components/icons/arrowIcon";

const Main = () => {
  const [gejalaUser, setGejalaUser] = useState(defaultGejala);
  const [diagnosa, setDiagnosa] = useState([]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {    
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

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

  const handleRefreshButton = (gejala: string) => {
    setGejalaUser((prevGejalaUser) => ({
      ...prevGejalaUser,
      [gejala]: null,
    }));
  }

  const diagnosaCheck = () => {
    console.log(gejalaUser);
    const hasNullValue = Object.values(gejalaUser).some(value => value === null);
    if (hasNullValue) {
      toast.error("Anda belum menjawab semua pertanyaan.")
      return;
    }
  }

  return (
    <div>
      <BackgroundBeams />
      {visible && (
        <div
          className="bg-[#151515] w-screen h-screen z-50 fixed top-0 left-0 text-white flex justify-center items-center"
          style={{
            animation: 'slideUp 1s forwards',
            animationDelay: '2s'  
          }}
        >
          <p className="text-[10rem] font-bold">KELOMPOK 6</p>        
        </div>
      )}
      <div className="fixed top-0 left-0 w-screen z-20">
        <Marquee
          direction="left"
          className="bg-white text-black text-xs p-2"
        >
          <p>Program ini hanya berfungsi sebagai alat bantu diagnosa dan telah dihitung memiliki akurasi sebesar 80%. Penting untuk dipahami bahwa hasil yang diberikan bukanlah jaminan kebenaran 100%, dan masih ada kemungkinan adanya kondisi medis lain yang tidak terdeteksi oleh program ini. Oleh karena itu, disarankan untuk tetap berkonsultasi dengan tenaga medis profesional guna mendapatkan diagnosis yang lebih akurat dan menyeluruh.</p>
          <p className="w-[50vw] h-full"></p>
        </Marquee>
      </div>
      <div className="w-full py-12 px-16 h-full z-20 ">        
          <h1 className="font-bold text-6xl text-center text-white mb-11 mt-8">
            Sistem Pakar Diagnosis Penyakit Paru-Paru
          </h1>
          <div className="grid grid-cols-2 gap-4 w-full">
            {informasiGejala.map((infoGejala, index) => (
              <QuestionWrapper
                key={index}
                question={infoGejala.pertanyaan}
                gejala={gejalaUser[infoGejala.gejala]}
                setToYes={() => handleYesButton(infoGejala.gejala)}
                setToNo={() => handleNoButton(infoGejala.gejala)}
                setToNull={() => {handleRefreshButton(infoGejala.gejala)}}
              />
            ))}
            <button onClick={diagnosaCheck} className="rounded-xl hover:bg-blue-900 duration-150 text-xl font-bold text-white bg-blue-600 col-span-2 py-4 flex gap-3 items-center justify-center mt-4 shadow-lg shadow-black/60">
              <p>CEK DIAGNOSA</p>
              <ArrowIcon className="size-12"/>
            </button>
        </div>        
      </div>    
    </div>
  );
};

export default Main;
