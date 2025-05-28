"use client";
import { Button } from "@/components/ui/button";
import { useApplication } from "@/context/application/context";
import { useHeader } from "@/context/header/context";
import { useEffect, useState } from "react";
import GroupComponent from "./components/group.component";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LoaderCircle, LoaderCircleIcon } from "lucide-react";

export default function Grupos() {

  const { setPageTitle } = useHeader();
  const { socket } = useApplication();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    
    setLoading(true);
    setPageTitle([
      {
        title: "Gerenciar"
      },
      {
        title: "Grupos"
      }
    ]);

    if (socket) {
      socket.emit("get-groups");
    }
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("bot-event", (e) => {

        if (e?.groups) {
          setLoading(false);
          setGroups(e?.groups)
        }
      });
    }
  }, [socket]);

  return (
    <div className="flex h-full flex-col gap-2 items-center justify-center">
      {
        !loading ? (
          <ScrollArea className="w-full h-full">
            <div className="grid grid-cols-4 gap-2">
              {
                groups.map((group, idx) => <GroupComponent key={idx} group={group}/>)
              }
            </div>
          </ScrollArea>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <LoaderCircleIcon className="animate-spin"/>
            <span>Carregando grupos</span>
          </div>
        )
      }
    </div>
  )
}