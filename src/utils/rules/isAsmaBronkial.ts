import { DefaultGejalaTypes } from "@/types/defaultGejalaTypes";

export const IsAsmaBronkial = (gejala: DefaultGejalaTypes) => {
  return (
    gejala.batukLebih3Minggu &&
    gejala.sesakNapas &&
    gejala.mengi &&
    gejala.dadaTerasaPenuh &&
    gejala.keluhanMenjelangPagiMalam &&
    gejala.asmaNokturnal &&
    gejala.batukMemberatMalamHari &&
    gejala.riwayatKeluargaAsma
  );
};
