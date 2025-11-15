"use client";

import { Plus, Sheet, X } from "lucide-react";
import { useAuthStore } from "@/store/AuthStore";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import AlertDialogUI from "./AlertDialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export default function CSVUpload() {

  const { isAuthenticated } = useAuthStore();
  const router = useRouter()
  const [btnText, setBtnText] = useState<string>("Upload CSV");
  const [isFileSelected, setIsFileSelected] = useState<boolean>(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Handle the file upload logic here
      setBtnText(file.name);
      setIsFileSelected(true);
      console.log("File uploaded:", file.name);
    }
    e.target.value = ""; // Reset the input value to allow re-uploading the same file if needed
  };

  const handleRemoveBtnClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.preventDefault();
    setBtnText("Upload CSV");
    setIsFileSelected(false);
  };

  return (
    <div className="h-[90%] bg-inherit p-4 flex flex-col justify-center items-center">
      <span className="text-center text-white text-2xl font-semibold">
        Upload your CSV file to get started
      </span>
      <div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <div className="width-[300px] border-2 border-dotted flex px-12 justify-center bg-gray-500">
            <label 
              className={cn("group mt-6 flex items-center text-white px-4 py-2 rounded transition-all duration-200", (isFileSelected ? "bg-green-900 cursor-default" : "bg-[#272727] hover:bg-[#3a3a3a] cursor-pointer"))}
              >
              {
                isFileSelected ?
                (
                  <div className="flex items-center">
                    < Sheet className="mr-2 text-green-400" />
                    { btnText }
                    <X 
                      className="ml-2 p-0.5 cursor-pointer border rounded-[0.30rem] border-green-900 bg-red-900 hover:bg-red-800 hover:border-red-800 hover:font-semibold transition-all delay-75" 
                      onClick={handleRemoveBtnClick}
                    />
                  </div>
                )
                :
                (
                  <div className="flex items-center">
                    <Plus className="mr-2 group-hover:rotate-90 transition-transform duration-300" />
                    { btnText }
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
                onConfirm={() => {router.push('/auth/login')}}
              />
            )
          }
        </AlertDialog>
      </div>
      <div className={cn("mt-6 transition-opacity duration-300", isFileSelected ? "opacity-100" : "opacity-0 pointer-events-none")}>
        <Button className="bg-gray-300 text-black hover:bg-gray-100 hover:text-black cursor-pointer">Process CSV</Button>
      </div> 
    </div>
  )

}