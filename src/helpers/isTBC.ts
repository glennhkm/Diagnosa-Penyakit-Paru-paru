import { DefaultGejalaTypes } from "@/types/defaultGejalaTypes";

export const IsTBC = (gejala: DefaultGejalaTypes) => {
  if (
    gejala.batukLebih3Minggu &&
    gejala.batukBerdahakMukoid &&
    gejala.batukDarah &&
    gejala.sesakNapas &&
    gejala.demam &&
    gejala.keringatMalam &&
    gejala.malaise &&
    gejala.nafsuMakanBerkurang &&
    gejala.beratBadanMenurun  
  ) {
    return true;
  } else {
    return false;
  }
};
