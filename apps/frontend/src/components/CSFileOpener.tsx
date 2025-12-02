"use client"

import { cn } from "@/lib/utils";
import { useCSVFileDataStore } from "@/store/CSVFileDataStore";
import { useMemo, useState } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
// import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

ModuleRegistry.registerModules([AllCommunityModule]);


export default function CSFileOpener() {

  const rawData = useCSVFileDataStore((state) => state.data);
  const data = rawData.map((row, i) => {
    const rowNo = { "No": i + 1 }
    return { ...rowNo, ...row };
  })

  const [rowData, setRowData] = useState<typeof data>(data);
  const columnDefs = useMemo(() => {
    if (!data || data.length === 0) return []
    return Object.keys(data[0]).map((col) => ({
      field: col,
      headerName: col,
      filter: true,
      sortable: true,
      resizable: true,
    }))
  }, [data])

  const defaultColDef = {
    sortable: true,
    resizable: true,
    filter: true,
  }

  return (
    <div className="ag-theme-alpine h-full w-full">
      {/* <table className="w-full border-collapse">
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
                <td key={col} className={cn("border text-white px-3 py-2", col !== "No." && "hover:cursor-cell hover:bg-[#2b2a2a]")}>
                  {String(row[col] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table> */}
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        enableCellTextSelection={true}
        rowDragManaged={true}
      />
    </div>
  )
}
