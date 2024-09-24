import { DefaultGejalaTypes } from "@/types/defaultGejalaTypes";

export const IsPPOK = (gejala: DefaultGejalaTypes) => {
  if (
    gejala.batukLebih3Minggu &&
    gejala.batukBerdahakMukoid &&
    gejala.batukBerdahakPurulen &&
    gejala.sesakNapas &&
    gejala.sesakNapasKetikaTenaga &&
    gejala.batukBersamaanSesakNapas 
  ) {
    return true;
  } else {
    return false;
  }
};
