import { DefaultGejalaTypes } from "@/types/defaultGejalaTypes";

export const IsAsmaBronkial = (gejala: DefaultGejalaTypes) => {
  if (
    gejala.batukLebih3Minggu &&
    gejala.sesakNapas &&
    gejala.mengi &&
    gejala.dadaTerasaPenuh &&
    gejala.keluhanMenjelangPagiMalam &&
    gejala.asmaNokturnal &&
    gejala.batukMemberatMalamHari &&
    gejala.riwayatKeluargaAsma
  ) {
    return true;
  } else {
    return false;
  }
};
