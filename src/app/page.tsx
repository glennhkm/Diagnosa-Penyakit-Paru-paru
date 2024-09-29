"use client";

import { QuestionWrapper } from "@/components/questionWrapper/questionWrapper";
import { useEffect, useRef, useState } from "react";
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
import Lungs_2 from "@/../public/assets/lottie/lungs-2.json";
import Doctor from "@/../public/assets/lottie/doctor.json";
import { ArrowDownIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { SparklesCore } from "@/components/aceternity/sparkles";
import { Navbar } from "@/components/navbar/navbar";
import { ScrollToSection } from "@/utils/helpers/scrollToSection";
import { BackgroundGradient } from "@/components/aceternity/bg-gradient";
import { AnimatedTooltip } from "@/components/aceternity/animated-tooltip";
import { anggotaKelompok } from "@/data/anggotaKelompok";
import Lottie from "lottie-react";
import { BackgroundBeams } from "@/components/aceternity/bg-beams";
import { TextGenerateEffect } from "@/components/aceternity/text-generate";
import CountUp from "react-countup";
import { Meteors } from "@/components/aceternity/meteor";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select";
import { RefreshIcon } from "@/components/icons/refreshIcon";

const Main = () => {
  const [gejalaUser, setGejalaUser] = useState(defaultGejala);
  const [diagnosa, setDiagnosa] = useState<PenyakitDanSolusi[]>([]);
  const [diagnosaInfo, setDiagnosaInfo] = useState("");
  const [showDiagnosa, setShowDiagnosa] = useState(false);
  const [isIntro, setIsIntro] = useState(true);
  const [isSpotlight, setIsSpotlight] = useState(false);
  const [userData, setUserData] = useState({
    nama: "",
    usia: 0,
    golonganDarah: "",
  });
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [isLoadTodiagnosing, setIsLoadTodiagnosing] = useState(false);
  const diagnosaRef = useRef<HTMLDivElement | null>(null);

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
        namaPenyakit: "Tuberculosis (TBC)",
        diagnosa: IsTBC(gejalaUser),
        solusi: informasiPenyakit[0].solusi,
      },
      {
        id: 2,
        namaPenyakit: "Penyakit Paru Obstruktif Kronik (PPOK)",
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

  const handleUserData = (key: string, value: string) => {    
    setUserData((prevUserData) => ({
      ...prevUserData,
      [key]: value,
    }));
  };

  const scrollToResults = () => {
    if (diagnosaRef.current) {
      diagnosaRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleDiagnosing = () => {
    console.log(userData);
    setIsLoadTodiagnosing(true);
    if (userData.nama === "" || userData.usia === 0 || userData.golonganDarah === "") {
      toast.error("Silahkan isi semua data terlebih dahulu.");
      setIsLoadTodiagnosing(false);
      return;
    }
    setTimeout(() => {
      setIsDiagnosing(true);
      setIsLoadTodiagnosing(false);
    }, 2600);
    
  }

  useEffect(() => {
    const introTimer = setTimeout(() => {
      setIsIntro(false);
    }, 5100);
    const spotlightTimer = setTimeout(() => {
      setIsSpotlight(true);
    }, 3000);
    return () => {
      clearTimeout(introTimer);
      clearTimeout(spotlightTimer);
    };
  }, []);

  useEffect(() => {
    if (isDiagnosing) {
      scrollToResults();
    }
  }, [isDiagnosing]);

  return (
    <div className="flex flex-col w-full">
      {showDiagnosa && (
        <DiagnosaModal
          diagnosa={diagnosa}
          diagnosaInfo={diagnosaInfo}
          setShowDiagnosa={setShowDiagnosa}
          dataUser={userData}
        />
      )}
      
      {isIntro && (
        <div
          className="bg-[#151515] w-screen h-screen z-50 top-0 left-0 text-white flex flex-col justify-center items-center fixed"
          style={{
            animation: "slideDown 1s forwards",
            animationDelay: "4s",
          }}
        >
          <TextGenerateEffect
            className="text-[10rem] text-white font-extrabold"
            words="Kelompok 6"
          />
          <div className="flex gap-2 items-center -mt-5">
            <Image
              src="/assets/images/logo.png"
              alt="logo"
              width={120}
              height={120}
            />
            <div className="flex flex-col gap-1 pb-3">
              <TextGenerateEffect
                className="font-bold text-6xl"
                words="PulmoHealth"
              />
              <TextGenerateEffect
                className="-mt-4 text-sm pl-1"
                // words="Kecerdasan Artifisial berbasis aturan mengenai diagnosa penyakit paru-paru"
                words="Deteksi Cepat, Tindakan Tepat: Jaga Kesehatan Paru-Paru Anda dari Sekarang"
              />
            </div>
          </div>
          <div className="absolute top-0 left-0 w-screen z-50">
            <Marquee
              direction="left"
              className="bg-white text-black text-xs p-2"
            >
              <p>
                Program ini hanya berfungsi sebagai alat bantu diagnosa dan
                telah dihitung memiliki akurasi sebesar 80%. Penting untuk
                dipahami bahwa hasil yang diberikan bukanlah jaminan kebenaran
                100%, dan masih ada kemungkinan adanya kondisi medis lain yang
                tidak terdeteksi oleh program ini. Oleh karena itu, disarankan
                untuk tetap berkonsultasi dengan tenaga medis profesional guna
                mendapatkan diagnosis yang lebih akurat dan menyeluruh.
              </p>
              <p className="w-[50vw] h-full"></p>
            </Marquee>
          </div>
          <BackgroundBeams />
        </div>
      )}
      <div id="navbar">
        <Navbar />
      </div>
      <div
        id="hero"
        className="w-full h-screen to-transparent relative px-16 bg-grid-white/5"
      >
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        {isSpotlight && <Spotlight />}
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-1/2 flex flex-col gap-4 text-white/90 z-30 items-start">
            <h1 className="text-7xl font-bold">PulmoHealth</h1>
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
              Sistem AI berbasis aturan yang mendiagnosis penyakit paru-paru
              melalui analisis jawaban Anda. Dapatkan evaluasi paru-paru yang
              cepat dan akurat dengan PulmoHealth.
            </p>
            <button
              onClick={() => ScrollToSection("diagnosa")}
              className="w-48 py-2.5 rounded-xl border-[0.1px] border-black/20  shadow-balance shadow-sky-500 hover:shadow-slate-200 hover:scale-105 duration-150 mt-2 text-sm flex gap-2 items-center justify-center"
            >
              <p className="font-bold">Mulai Sekarang</p>
              <ArrowDownIcon />
            </button>
          </div>
          <div className="w-[40%]">
            <Image
              src="/assets/images/person-lungs.webp"
              alt="Lungs"
              width={500}
              height={500}
              className="object-cover rounded-xl w-full h-full"
            />
          </div>
        </div>
      </div>
      <div
        id="tentang"
        className="h-screen px-16 w-full bg-[#151515] bg-dot-white/[0.2]  relative flex items-center justify-center"
      >
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="grid grid-cols-3 w-1/2 gap-3">
          <Link
            href={"https://journal.unnes.ac.id/nju/jte/article/view/7436/5765"}
            className="hover:scale-[1.02] duration-200"
            target="_blank"
          >
            <BackgroundGradient className="rounded-xl w-full flex flex-col justify-between p-4 bg-zinc-900 relative h-[30vh]  group">
              <Image
                src="/assets/images/document-2.jpg"
                alt="document"
                width={500}
                height={500}
                className="object-cover w-full h-3/4 rounded-xl"
              />
              <div className="flex justify-between w-full text-white items-center">
                <div className="flex flex-col">
                  <p className="font-bold">Sumber Jurnal</p>
                  <p className="text-[0.68rem]">Jurnal Teknik Elektro UNNES</p>
                </div>
                <ArrowRightIcon className="w-6 h-6" />
              </div>
            </BackgroundGradient>
          </Link>
          <div className="hover:scale-[1.02] duration-200">
            <BackgroundGradient className="rounded-xl p-4 w-full bg-zinc-900 relative h-[30vh] text-white group flex flex-col items-center justify-center">
              <CountUp
                end={84}
                suffix="%"
                enableScrollSpy
                duration={3}
                className="text-[4.6rem] font-bold"
              />
              <p className="font-semibold text-[1.16rem] text-center border-t-[0.4px] border-white/40 pt-5">
                Nilai Probabilitas Keakuratan Sistem
              </p>
              <Meteors number={20} />
            </BackgroundGradient>
          </div>
          <div className="hover:scale-[1.02] duration-200">
            <BackgroundGradient className="rounded-xl p-4 w-full bg-zinc-900 relative h-[30vh] text-white group flex flex-col">
              <h6 className="font-bold text-lg">
                27 Fakta dengan 5 Diagnosa Penyakit
              </h6>
              <div className="h-[1px] w-5/6 bg-gradient-to-r from-transparent via-sky-500 to-transparent my-2"></div>
              <p className="text-sm mt-1">1. Tuberculosis (TBC)</p>
              <p className="text-sm ">2. Penyakit Paru Obstruktif (PPOK)</p>
              <p className="text-sm ">3. Asma Bronkial</p>
              <p className="text-sm ">4. Kanker Paru</p>
              <p className="text-sm ">5. Pneumonia</p>
              <div className="absolute right-1.5 -bottom-4">
                <Lottie
                  animationData={Doctor}
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                />
              </div>
            </BackgroundGradient>
          </div>
          <div className="w-full col-span-3 hover:scale-[1.02] duration-200">
            <BackgroundGradient className="rounded-xl w-full p-4 text-white bg-zinc-900 flex flex-col">
              <p className="font-bold">Catatan penting</p>
              <p className="text-sm">
                Program ini merupakan alat bantu diagnosa dengan akurasi 80%.
                Hasilnya tidak menjamin kebenaran 100% dan mungkin ada kondisi
                medis lain yang tidak terdeteksi. Konsultasi dengan tenaga medis
                profesional tetap dianjurkan untuk diagnosis yang lebih akurat.
              </p>
            </BackgroundGradient>
          </div>
        </div>
        <div className="flex flex-col gap-5 px-16 text-white/90 w-1/2 relative">
          <div className="absolute -top-6 right-36 w-40 h-3w-40">
            <Lottie animationData={Lungs_2} />
          </div>
          <div className="flex">
            <AnimatedTooltip items={anggotaKelompok} />
          </div>
          <h2 className="text-7xl font-bold">Tentang PulmoHealth</h2>
          <p>
            Kami adalah platform berbasis AI yang membantu mendiagnosa penyakit
            paru-paru seperti TBC, PPOK, Asma, Kanker Paru-paru, dan Pneumonia.
            Melalui analisis jawaban dari serangkaian pertanyaan, PulmoHealth
            menyediakan evaluasi kesehatan paru-paru secara cepat, akurat, dan
            mudah diakses, mendukung Anda dalam menjaga kesehatan paru-paru
            dengan wawasan terpercaya.
          </p>
        </div>
      </div>
      <div id="diagnosa" className="w-full h-full py-12 px-16 flex flex-col gap-4 bg-black bg-grid-small-white/[0.2] relative">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black/40 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>                  
        <h2 ref={diagnosaRef} className="font-bold text-8xl text-center text-white/90 mt-8 z-20 mb-8">
          Cek Diagnosa
        </h2>
        {isDiagnosing && (
        <button onClick={() => setIsDiagnosing(false)} className="bg-sky-500 rounded-xl z-20 py-3 px-4 font-bold text-white flex gap-2 justify-center hover:bg-opacity-80 duration-200">
          <RefreshIcon className="w-6 h-6"/>
          <p>Re-input Data</p>
        </button>
        )}
        <div className="flex flex-col gap-4 w-full rounded-xl bg-[#151515]/80 z-20 p-6 text-white border border-white/20">
          <div className="flex gap-4">
            <div className="flex flex-col w-full gap-1">
              <label htmlFor="nama" className="text-white pl-1 font-bold">Nama</label>
              {!isDiagnosing ? (
                <input
                type="text"
                id="nama"
                name="nama"
                className="w-full rounded-xl bg-transparent border border-white/40 py-3 px-4 placeholder:text-white/40 text-white focus:outline-none"
                placeholder="Masukkan nama anda"
                onChange={(e) => handleUserData('nama', e.target.value)}
                />
              ) : (
                <p className="w-full rounded-xl bg-[#151515] border border-white/40 py-3 px-4 text-white">
                  {userData.nama}
                </p>
              )}
            </div>
            <div className="flex flex-col w-full gap-1 relative">
              <label htmlFor="usia" className="text-white pl-1 font-bold">Usia</label>
              {!isDiagnosing ? (
                <div className="relative w-full ">
                  <input
                  type="number"
                  id="usia"
                  name="usia"
                  className="w-full rounded-xl bg-transparent border border-white/40 py-3 px-4 placeholder:text-white/40 text-white focus:outline-none"
                  placeholder="Masukkan usia anda"
                  onChange={(e) => handleUserData('usia', e.target.value)}
                  />
                  <p className="absolute right-12 text-white top-1/2 -translate-y-1/2 z-20">Tahun</p>                  
                </div>              
              ) : (
                <p className="w-full rounded-xl bg-[#151515] border border-white/40 py-3 px-4 text-white">
                  {userData.usia}
                </p>
              )}
            </div>
            <div className="flex flex-col w-full gap-1 relative">
              <label  className="text-white pl-1 font-bold">Golongan Darah</label>
              {!isDiagnosing ? (
                <Select onValueChange={(value) => handleUserData('golonganDarah', value)}>            
                  <SelectTrigger className={`bg-transparent border border-white/40 ${userData.golonganDarah ? 'text-white' : 'text-white/40'}`}>
                    <SelectValue placeholder="Pilih golongan darah anda" />
                  </SelectTrigger>
                  <SelectContent className="text-white bg-[#151515] border border-white/40">
                    <SelectGroup>
                      <SelectLabel className="text-white text-base">Golongan Darah</SelectLabel>
                      <SelectItem className="cursor-pointer hover:bg-white/10 duration-200 rounded-lg" value="A">A</SelectItem>
                      <SelectItem className="cursor-pointer hover:bg-white/10 duration-200 rounded-lg" value="B">B</SelectItem>
                      <SelectItem className="cursor-pointer hover:bg-white/10 duration-200 rounded-lg" value="AB">AB</SelectItem>
                      <SelectItem className="cursor-pointer hover:bg-white/10 duration-200 rounded-lg" value="O">O</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              ) : (
                <p className="w-full rounded-xl bg-[#151515] border border-white/40 py-3 px-4 text-white">
                  {userData.golonganDarah}
                </p>
              )}
            </div>
          </div>          
          {!isDiagnosing && (
            <button onClick={handleDiagnosing} className={`${isLoadTodiagnosing && 'animate-blink'} w-full bg-sky-500 hover:bg-opacity-60 duration-200 rounded-xl font-bold py-3`}>
              {isLoadTodiagnosing ? 'Memproses Pertanyaan...' : 'Mulai Cek Diagnosa'}
            </button>
          )}
        </div>
        {isDiagnosing && (                  
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
              className="rounded-xl z-20 hover:bg-blue-900 duration-150 text-xl font-extrabold text-white bg-blue-600 col-span-2 py-2 flex gap-3 items-center justify-center mt-1 shadow-lg shadow-black/60"
            >
              <p>CEK DIAGNOSA</p>
              <ArrowIcon className="size-12" />
            </button>
          </div>
        )}
      </div>
      <div id="marquee" className="fixed bottom-0 left-0 z-40">
        <Marquee direction="left" className="bg-white text-black text-xs p-2">
          <p>
            Program ini hanya berfungsi sebagai alat bantu diagnosa dan telah
            dihitung memiliki akurasi sebesar 80%. Penting untuk dipahami bahwa
            hasil yang diberikan bukanlah jaminan kebenaran 100%, dan masih ada
            kemungkinan adanya kondisi medis lain yang tidak terdeteksi oleh
            program ini. Oleh karena itu, disarankan untuk tetap berkonsultasi
            dengan tenaga medis profesional guna mendapatkan diagnosis yang
            lebih akurat dan menyeluruh.
          </p>
          <p className="w-[50vw] h-full"></p>
        </Marquee>
      </div>
    </div>
  );
};

export default Main;
