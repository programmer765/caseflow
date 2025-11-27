"use client";


import CSVUpload from "./CSVUpload";
import { useCSVFileDataStore } from "@/store/CSVFileDataStore";
import CSFileOpener from "./CSFileOpener";

export default function Main() {

  const data = useCSVFileDataStore((state) => state.data);

  return (
    <main className="h-[90%] bg-inherit p-4 flex flex-col justify-center items-center">
      {
        data.length > 0 ? <CSFileOpener /> : <CSVUpload />
      }
    </main>
  );
}
