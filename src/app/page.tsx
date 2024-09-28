"use client";

import { QuestionWrapper } from "@/components/questionWrapper/questionWrapper";
import { useState } from "react";
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
import { Spotlight } from "@/components/aceternity/spotlight";
import Image from "next/image";
// import Lottie from "lottie-react";
// import Lungs from "@/../public/assets/lottie/lungs.json";
import { ArrowDownIcon } from "@radix-ui/react-icons";
import { SparklesCore } from "@/components/aceternity/sparkles";
import { Navbar } from "@/components/navbar/navbar";
import { ScrollToSection } from "@/utils/helpers/scrollToSection";

const Main = () => {
  const [gejalaUser, setGejalaUser] = useState(defaultGejala);
  const [diagnosa, setDiagnosa] = useState<PenyakitDanSolusi[]>([]);
  const [diagnosaInfo, setDiagnosaInfo] = useState("");
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
  };

  const diagnosaCheck = () => {
    const hasNullValue = Object.values(gejalaUser).some(
      (value) => value === null
    );
    if (hasNullValue) {
      toast.error("Anda belum menjawab semua pertanyaan.");
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

    const diagnosedPenyakit = penyakitUser
      .filter((penyakit) => penyakit.diagnosa === true)
      .map(({ diagnosa, ...rest }) => rest);
    // console.log(diagnosedPenyakit);
    // console.log(gejalaUser);
    setDiagnosa(diagnosedPenyakit);
    setShowDiagnosa(true);

    if (diagnosedPenyakit.length === 0) {
      setDiagnosaInfo(
        "Anda tidak mengalami penyakit paru-paru yang serius. Namun, jika gejala yang Anda alami tidak kunjung membaik, sebaiknya segera berkonsultasi dengan dokter."
      );
    } else {
      setDiagnosaInfo("Anda mungkin mengalami penyakit paru-paru berikut:");
    }
  };

  return (
    <div className="flex flex-col">
      {showDiagnosa && (
        <DiagnosaModal
          diagnosa={diagnosa}
          diagnosaInfo={diagnosaInfo}
          setShowDiagnosa={setShowDiagnosa}
        />
      )}
      <Navbar/>
      <div
        id="hero"
        className="w-full h-screen to-transparent relative px-16 bg-black/20 bg-grid-white/10"
      >
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <Spotlight />
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-1/2 flex flex-col gap-4 text-white/80 z-30 items-start">
            <h1 className="text-7xl font-bold">Pulmo Health</h1>
            <div className="w-full relative">
              <div className="absolute inset-x-0 top-0 bg-gradient-to-r from-indigo-500 via-transparent to-transparent h-[2px] w-full blur-sm" />
              <div className="absolute inset-x-0 top-0 bg-gradient-to-r from-indigo-500 via-transparent to-transparent h-px w-full" />
              <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-sky-500 via-transparent to-transparent h-[5px] w-full blur-sm" />
              <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-sky-500 via-transparent to-transparent h-px w-full" />
              <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={1200}
                className="w-full h-full"
                particleColor="#FFFFFF"
              />
            </div>
            <p className="">
              Sistem AI berbasis aturan yang membantu mendiagnosa penyakit
              paru-paru Anda melalui analisis jawaban dari serangkaian
              pertanyaan yang disesuaikan. Dapatkan evaluasi kesehatan paru-paru
              yang lebih cepat dan akurat dengan PulmoHealth.
            </p>
            <button onClick={() => ScrollToSection("diagnosa")} className="w-48 py-2.5 rounded-xl border-[0.1px] border-black/20  shadow-balance shadow-sky-500 hover:shadow-slate-200 hover:scale-105 duration-150 mt-2 text-sm flex gap-2 items-center justify-center">
              <p>Mulai Sekarang</p>
              <ArrowDownIcon />
            </button>
          </div>
          <div className="w-[40%]">
            <Image
              src="/assets/images/person-lungs-removebg.png"
              alt="Lungs"
              layout="responsive"
              width={500}
              height={500}
              className="object-cover rounded-xl w-full h-full"
            />
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 z-50">
        <Marquee
          direction="left"
          className="bg-white text-black text-xs p-2"
        >
          <p>Program ini hanya berfungsi sebagai alat bantu diagnosa dan telah dihitung memiliki akurasi sebesar 80%. Penting untuk dipahami bahwa hasil yang diberikan bukanlah jaminan kebenaran 100%, dan masih ada kemungkinan adanya kondisi medis lain yang tidak terdeteksi oleh program ini. Oleh karena itu, disarankan untuk tetap berkonsultasi dengan tenaga medis profesional guna mendapatkan diagnosis yang lebih akurat dan menyeluruh.</p>
          <p className="w-[50vw] h-full"></p>
        </Marquee>
      </div>
      {/* <div
        className="bg-[#151515] w-screen h-screen z-50 top-0 left-0 text-white flex justify-center items-center fixed"
        style={{
          animation: 'slideDown 1s forwards',
          animationDelay: '2s'  
        }}
      >
        <p className="text-[10rem] font-bold">KELOMPOK 6</p>
        <div className="absolute top-0 left-0 w-screen z-50">
          <Marquee
            direction="left"
            className="bg-white text-black text-xs p-2"
          >
            <p>Program ini hanya berfungsi sebagai alat bantu diagnosa dan telah dihitung memiliki akurasi sebesar 80%. Penting untuk dipahami bahwa hasil yang diberikan bukanlah jaminan kebenaran 100%, dan masih ada kemungkinan adanya kondisi medis lain yang tidak terdeteksi oleh program ini. Oleh karena itu, disarankan untuk tetap berkonsultasi dengan tenaga medis profesional guna mendapatkan diagnosis yang lebih akurat dan menyeluruh.</p>
            <p className="w-[50vw] h-full"></p>
          </Marquee>
        </div>
      </div> */}
      <div id="diagnosa" className="w-full py-12 px-16 h-full z-20 bg-gradient-to-b from-black/90 to-transparent via-transparent">
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
              setToNull={() => {
                handleRefreshButton(infoGejala.gejala);
              }}
            />
          ))}
          <button
            onClick={diagnosaCheck}
            className="rounded-xl hover:bg-blue-900 duration-150 text-xl font-bold text-white bg-blue-600 col-span-2 py-4 flex gap-3 items-center justify-center mt-4 shadow-lg shadow-black/60"
          >
            <p>CEK DIAGNOSA</p>
            <ArrowIcon className="size-12" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;
