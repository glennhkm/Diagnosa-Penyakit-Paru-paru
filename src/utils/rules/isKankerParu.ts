import { DefaultGejalaTypes } from "@/types/defaultGejalaTypes";

export const IsKankerParu = (gejala: DefaultGejalaTypes) => {
  return (
    gejala.batukLebih3Minggu &&
    gejala.batukDarah &&
    gejala.sesakNapas &&
    gejala.nafsuMakanBerkurang &&
    gejala.beratBadanMenurun &&
    gejala.cepatLelah &&
    gejala.radangParuKerapBerulang &&
    gejala.suaraParau &&
    gejala.nyeriDada &&
    gejala.nyeriBahu &&
    gejala.leherBengkak &&
    gejala.wajahBengkak
  )
};
