import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CSVFileDataState {
  data: any[];
  setData: (data: any[]) => void;
}

export const useCSVFileDataStore = create<CSVFileDataState>()(
  persist(
    (set) => ({
      data: [],
      setData: (data: any[]) => set(() => ({ data })),
    }),
    {
      name: "csv-file-data",
    }
  )
);