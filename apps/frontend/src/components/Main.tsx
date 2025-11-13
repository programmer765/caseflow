"use client";
import { Plus } from "lucide-react";
import { useAuthStore } from "@/store/AuthStore";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import AlertDialogUI from "./AlertDialog";
import { useRouter } from "next/navigation";


export default function Main() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter()


  return (
    <main className="h-[90%] bg-inherit p-4 flex flex-col justify-center items-center">
      <span className="text-center text-white text-2xl font-semibold">
        Upload your CSV file to get started
      </span>
      <div>
            <label 
              className="group mt-6 flex items-center bg-[#272727] text-white px-4 py-2 rounded hover:bg-[#3a3a3a] transition-all duration-200 cursor-pointer"
            >
              <Plus className="mr-2 group-hover:rotate-90 transition-transform duration-300" />
              Upload CSV
        <AlertDialog>
          <AlertDialogTrigger asChild>
          </AlertDialogTrigger>
          {
            isAuthenticated ?
            (
              <input type="file" accept=".csv" className="hidden" />
            )
            : (
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
            </label>
      </div>
    </main>
  );
}
