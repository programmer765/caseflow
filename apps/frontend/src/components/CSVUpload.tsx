"use client";

import { Plus, Sheet, X } from "lucide-react";
import { useAuthStore } from "@/store/AuthStore";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import AlertDialogUI from "./AlertDialog";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import Papa from "papaparse";
import { useCSVFileDataStore } from "@/store/CSVFileDataStore";

export default function CSVUpload() {

  const { isAuthenticated } = useAuthStore();
  const router = useRouter()
  const [btnText, setBtnText] = useState<string>("Upload CSV");
  const [isFileSelected, setIsFileSelected] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [spinner, setSpinner] = useState<boolean>(false);
  const [csvFile, setCSVFile] = useState<File | null>(null);

  const uploadFile = (file: File) => {
    setBtnText(file.name);
    setIsFileSelected(true);
    setCSVFile(file);
    console.log("File dropped:", file.name);
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || file.type !== "text/csv") return;
    setBtnText(file.name);
    setIsFileSelected(true);
    // console.log("File uploaded:", file.name);
    e.target.value = ""; // Reset the input value to allow re-uploading the same file if needed
  };

  const handleRemoveBtnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setBtnText("Upload CSV");
    setIsFileSelected(false);
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (!file || file.type !== "text/csv") return;
    uploadFile(file);
  };

  const openFile = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setSpinner(true);
    if (!csvFile) return;
    setTimeout(() => {
      Papa.parse(csvFile, {
        header: true,
        complete: (results) => {
          // console.log("File parsed:", typeof results.data);
          console.log("File parsed:", results.data);
          setSpinner(false);
          useCSVFileDataStore((state) => state.setData(results.data));
        },
        error: (error) => {
          console.log(error);
          setSpinner(false);
        },
      })
    }, 1000)
  }

  return (
    <div className="h-[90%] bg-inherit p-4 flex flex-col justify-center items-center">
      <span className="text-center text-white text-3xl font-semibold">
        Upload your CSV file to get started
      </span>
      <div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <div
              onDragOver={(e: React.DragEvent<HTMLDivElement>) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={(e: React.DragEvent<HTMLDivElement>) => {
                e.preventDefault();
                setIsDragging(false);
              }}
              onDrop={handleFileDrop}
              className={cn("width-[300px] bg-[#232323] border-2 border-dotted border-gray-500 flex flex-col px-15 py-8 justify-center items-center rounded-md mt-6 cursor-default hover:border-gray-400 transition-all duration-200", isDragging ? "border-blue-400 bg-[#2a2a2a]" : "")}>
              <span className="font-semibold text-xl text-white">Drag and drop your csv file here</span>
              <span className="font-medium text-gray-400 mt-3">or</span>
              <label
                className={cn("group mt-4 flex items-center text-white px-3 py-2 rounded transition-all duration-200", (isFileSelected ? "bg-green-900 cursor-default pr-2" : "bg-[#141414] hover:bg-[#1b1b1b] cursor-pointer"))}
              >
                {
                  isFileSelected ?
                    (
                      <div className="flex items-center">
                        <div className="mr-2 text-green-400">
                          <Sheet />
                        </div>
                        <div className="mr-2">
                          {btnText}
                        </div>
                        <Button
                          className="ml-2 p-0.5 cursor-pointer border rounded-[0.30rem] border-green-900 bg-red-900 hover:bg-red-800 hover:border-red-800 hover:font-semibold transition-all delay-75"
                          onClick={handleRemoveBtnClick}
                        >
                          <X />
                        </Button>
                      </div>
                    )
                    :
                    (
                      <div className="flex items-center">
                        <Plus className="mr-2 group-hover:rotate-90 transition-transform duration-300" />
                        {btnText}
                      </div>
                    )
                }
                {
                  isAuthenticated === true &&
                  <input
                    type="file"
                    accept=".csv"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                }
              </label>
            </div>
          </AlertDialogTrigger>
          {
            isAuthenticated === false && (
              <AlertDialogUI
                title="Please Log In"
                description="You must be logged in to upload a CSV file."
                confirmText="Log In"
                cancelText="Cancel"
                onConfirm={() => { router.push('/auth/login') }}
              />
            )
          }
        </AlertDialog>
      </div>
      <div className={cn("mt-6 transition-opacity duration-300", isFileSelected ? "opacity-100" : "opacity-0 pointer-events-none")}>
        <Button
          className="bg-gray-300 text-black hover:bg-gray-100 hover:text-black cursor-pointer transition-all duration-300"
          onClick={openFile}
        >
          {
            spinner && <Spinner />
          }
          Open file
        </Button>
      </div>
    </div>
  )

}