import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
// import { Button } from "@/components/ui/button";

interface AlertDialogProps {
  title: string;
  description: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
}

export default function AlertDialogUI({
  title,
  description,
  confirmText,
  cancelText,
  onConfirm,
}: AlertDialogProps) {
  return (
    <AlertDialogContent className="text-white bg-[#0c0c0c] backdrop-blur-md border border-white/10">
      <AlertDialogHeader>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        <AlertDialogDescription>{description}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel className="bg-[#1e1e1e] cursor-pointer border-[#1e1e1e] hover:bg-[#272727] hover:text-white">{cancelText}</AlertDialogCancel>
        <AlertDialogAction className="text-black cursor-pointer bg-gray-200 hover:bg-white/80" onClick={onConfirm}>{confirmText}</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
