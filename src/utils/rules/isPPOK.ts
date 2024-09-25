import { DefaultGejalaTypes } from "@/types/defaultGejalaTypes";

export const IsPPOK = (gejala: DefaultGejalaTypes) => {
  return (
    gejala.batukLebih3Minggu &&
    gejala.batukBerdahakMukoid &&
    gejala.batukBerdahakPurulen &&
    gejala.sesakNapas &&
    gejala.sesakNapasKetikaTenaga &&
    gejala.batukBersamaanSesakNapas
  )
};
