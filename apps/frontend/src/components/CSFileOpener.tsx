"use client"

import { useCSVFileDataStore } from "@/store/CSVFileDataStore";


export default function CSFileOpener() {

  const rawData = useCSVFileDataStore((state) => state.data);
  const data = rawData.map((row, i) => {
    const rowNo = { "No.": i + 1 }
    return { ...rowNo, ...row };
  })
  const columns = Object.keys(data[0]);


  return (
    <div className="overflow-auto border rounded mt-4">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className="border border-black px-3 py-2 bg-gray-100 text-left font-medium hover:cursor-default"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {columns.map((col) => (
                <td key={col} className="border text-white px-3 py-2">
                  {String(row[col] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
