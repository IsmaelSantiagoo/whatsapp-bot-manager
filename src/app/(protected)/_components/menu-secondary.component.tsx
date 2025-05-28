import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import QRCodeComponent from "./qrcode.component";
import { getStatusName } from "@/lib/utils";
import { useApplication } from "@/context/application/context";

export const MenuSecondary = () => {

  const { status } = useApplication();

  return (
    <SidebarGroup className="mt-auto">
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem className="flex flex-col gap-3">
            <div className="flex flex-col items-center justify-content border rounded-lg">
              <QRCodeComponent/>
              <label className="pb-3">{getStatusName(status)}</label>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
