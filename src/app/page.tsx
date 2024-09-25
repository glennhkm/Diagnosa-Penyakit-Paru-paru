"use client";

import { QuestionWrapper } from "@/components/questionWrapper/questionWrapper";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { useEffect, useState } from "react";
import { defaultGejala } from "@/data/defaultGejala";
import { informasiGejala } from "@/data/informasiGejala";
import toast from "react-hot-toast";
import Marquee from "react-fast-marquee";
import { ArrowIcon } from "@/components/icons/arrowIcon";
import { IsAsmaBronkial } from "@/utils/rules/isAsmaBronkial";
import { IsPneumonia } from "@/utils/rules/isPneumonia";
import { IsKankerParu } from "@/utils/rules/isKankerParu";
import { IsPPOK } from "@/utils/rules/isPPOK";
import { IsTBC } from "@/utils/rules/isTBC";
import { informasiPenyakit } from "@/data/informasiPenyakit";
import { PenyakitDanSolusi } from "@/types/penyakitDanSolusi";
import { DiagnosaModal } from "@/components/modals/diagnosaModal";

const Main = () => {
  const [gejalaUser, setGejalaUser] = useState(defaultGejala);
  const [diagnosa, setDiagnosa] = useState<PenyakitDanSolusi[]>([]);
  const [diagnosaInfo, setDiagnosaInfo] = useState('');
  const [showDiagnosa, setShowDiagnosa] = useState(false);

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
    const hasNullValue = Object.values(gejalaUser).some(value => value === null);
    if (hasNullValue) {
      toast.error("Anda belum menjawab semua pertanyaan.")
      return;
    }

    const penyakitUser = [
      {
        id: 1,
        namaPenyakit: "Tuberkulosis(TBC)",
        diagnosa: IsTBC(gejalaUser),
        solusi: informasiPenyakit[0].solusi,
      },      
      {
        id: 2,
        namaPenyakit: "Penyakit Paru Obstruktif Kronik",
        diagnosa: IsPPOK(gejalaUser),
        solusi: informasiPenyakit[1].solusi,
      },
      {
        id: 3,
        namaPenyakit: "Asma Bronkial",
        diagnosa: IsAsmaBronkial(gejalaUser),
        solusi: informasiPenyakit[2].solusi,
      },
      {
        id: 4,
        namaPenyakit: "Kanker Paru",
        diagnosa: IsKankerParu(gejalaUser),
        solusi: informasiPenyakit[3].solusi,
      },
      {
        id: 5,
        namaPenyakit: "Pneumonia",
        diagnosa: IsPneumonia(gejalaUser),
        solusi: informasiPenyakit[4].solusi,
      },
    ];

    const diagnosedPenyakit = penyakitUser.filter((penyakit) => penyakit.diagnosa === true).map(({ diagnosa, ...rest }) => rest);
    // console.log(diagnosedPenyakit);  
    // console.log(gejalaUser);
    setDiagnosa(diagnosedPenyakit);
    setShowDiagnosa(true);
    
    if (diagnosedPenyakit.length === 0) {
      setDiagnosaInfo("Anda tidak mengalami penyakit paru-paru yang serius. Namun, jika gejala yang Anda alami tidak kunjung membaik, sebaiknya segera berkonsultasi dengan dokter.");
    } else {
      setDiagnosaInfo("Anda mungkin mengalami penyakit paru-paru berikut:");
    }

  }

  return (
    <div>
      <BackgroundBeams />
      {showDiagnosa && (
        <DiagnosaModal diagnosa={diagnosa} diagnosaInfo={diagnosaInfo} setShowDiagnosa={setShowDiagnosa}/>
      )}
      <div
        className="bg-[#151515] w-screen h-screen z-50 top-0 left-0 text-white flex justify-center items-center fixed"
        style={{
          animation: 'slideUp 1s forwards',
          animationDelay: '2s'  
        }}
      >
        <p className="text-[10rem] font-bold">KELOMPOK 6</p>
        <div className="absolute bottom-0 left-0 w-screen z-50">
          <Marquee
            direction="left"
            className="bg-white text-black text-xs p-2"
          >
            <p>Program ini hanya berfungsi sebagai alat bantu diagnosa dan telah dihitung memiliki akurasi sebesar 80%. Penting untuk dipahami bahwa hasil yang diberikan bukanlah jaminan kebenaran 100%, dan masih ada kemungkinan adanya kondisi medis lain yang tidak terdeteksi oleh program ini. Oleh karena itu, disarankan untuk tetap berkonsultasi dengan tenaga medis profesional guna mendapatkan diagnosis yang lebih akurat dan menyeluruh.</p>
            <p className="w-[50vw] h-full"></p>
          </Marquee>
        </div>
      </div>
      <div className="w-full py-12 px-16 h-full z-20 ">        
          <h1 className="font-bold text-8xl text-center text-white mt-8">
            PulmoHealth
          </h1>
          <p className="text-sm text-center text-white mb-11 mt-2.5">
            Sistem pakar diagnosa penyakit paru-paru berbasis web 
          </p>
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
