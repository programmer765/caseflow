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
        <AlertDialogCancel className="text-black">{cancelText}</AlertDialogCancel>
        <AlertDialogAction onClick={onConfirm}>{confirmText}</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
