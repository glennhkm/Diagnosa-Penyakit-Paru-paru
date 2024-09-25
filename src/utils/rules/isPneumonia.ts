import { DefaultGejalaTypes } from "@/types/defaultGejalaTypes";

export const IsPneumonia = (gejala: DefaultGejalaTypes) => {
  return (
    gejala.batukLebih3Minggu &&
    gejala.batukBerdahakPurulen &&
    gejala.batukDarah &&
    gejala.sesakNapas &&
    gejala.demam &&
    gejala.menggigil &&
    gejala.nyeriDada
  )
};
