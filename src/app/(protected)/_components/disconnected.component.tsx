import { TriangleAlertIcon } from "lucide-react";
import WASocket from "@/interfaces/WASocket";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import React from "react";


interface DisconnectedComponentProps {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DisconnectedComponent({ open, onOpenChange }: DisconnectedComponentProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex gap-2 items-center"><TriangleAlertIcon className="text-orange-500"/>Ocorreu um erro ao conectar com a aplicação.</AlertDialogTitle>
          <AlertDialogDescription className="text-justify">
            Esse erro acontece quando sua aplicação não consegue se conectar aos nossos servidores, sendo assim nenhuma ação pode ser realizada.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => onOpenChange(false)}>Fechar</AlertDialogCancel>
          <AlertDialogAction className="bg-orange-500 hover:bg-orange-600 text-white">Contatar suporte</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}