import { Plus } from "lucide-react";


export default function Main() {
  return (
    <main className="h-[90%] bg-inherit p-4 flex flex-col justify-center items-center">
      <span className="text-center text-white text-3xl font-bold">
        Upload your CSV file to get started.
      </span>
      <div>
        <button className="group mt-6 flex items-center bg-[#272727] text-white px-4 py-2 rounded hover:bg-[#3a3a3a] transition-all duration-200 cursor-pointer">
          <Plus className="mr-2 group-hover:rotate-180 transition-transform duration-200" />
          Upload CSV
        </button>
      </div>
    </main>
  );
}
