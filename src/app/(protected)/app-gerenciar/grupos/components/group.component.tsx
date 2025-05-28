import { UserIcon } from "lucide-react";
import Image from "next/image";

interface GroupComponentProps {
  group: {
    id: string;
    name: string;
    participants: number;
    image: string;
  };
}

export default function GroupComponent({ group }: GroupComponentProps) {

  return (
    <div className="w-full border rounded-lg p-2 flex items-center gap-2">
      <Image
        src={group.image}
        alt={group.name}
        width={50}
        height={50}
        priority
        className="rounded-full bg-black"
      />
      <div className="flex flex-col justify-start w-full min-w-0">
        <p className="truncate w-full">{group.name}</p>
        <p className="flex items-center">
          <UserIcon size={18} />
          {group.participants}
        </p>
      </div>

    </div>
  )
}