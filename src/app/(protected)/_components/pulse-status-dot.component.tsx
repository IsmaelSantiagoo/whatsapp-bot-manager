import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useApplication } from "@/context/application/context";
import { getStatusName, renderStatusColor } from "@/lib/utils";

export default function PulseStatusDot() {

  const { status } = useApplication();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`rounded-full bg-${renderStatusColor(status)} w-2 h-2 animate-pulse`}></div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{getStatusName(status)}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}