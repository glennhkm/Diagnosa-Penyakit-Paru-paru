import { DefaultGejalaTypes } from "./defaultGejalaTypes";

export interface GejalaDanPertanyaan {
    gejala: keyof DefaultGejalaTypes,
    pertanyaan: string,
}