import { Button } from "@/components/ui/button";
import WASocket from "@/interfaces/WASocket";

interface StatusButtonProps {
  status: WASocket["status"];
  connect: () => void;
}

export default function StatusButton({ status, connect }: StatusButtonProps) {

  const renderConnectionButton = () => {
    switch(status) {

      case "wa-waiting-connection":
        return <Button 
          className='w-full p-2 bg-green-500 text-white'
          disabled
        >
          Aguardando conexão...	
        </Button>;
      break
      case "wa-connected":
        return <Button 
          className='w-full p-2 bg-green-500 text-white'
          disabled
        >
          Conectado
        </Button>;
      break
      case "wa-disconnected":
        return <Button 
          className='w-full p-2 bg-green-500 cursor-pointer hover:bg-green-800 text-white'
          onClick={() => connect()}
        >
          Conectar
        </Button>;
      break
      case "wa-reconnecting":
        return <Button 
          className='w-full p-2 bg-green-800 text-white'
          disabled
        >
          Conectando...
        </Button>;
      break
      case "not-found":
        return <Button 
          className='w-full p-2 bg-red-800 text-white'
          disabled
        >
          Desconectado
        </Button>;
      break
    }
  }

  return renderConnectionButton();
}