import { Hash, LucideIcon, Menu, Mic, Video } from "lucide-react";
import { UserAvatar } from "../ui/ui/user-avatar";
import { MobileToggle } from "../mobile-toggle";
import { ChannelType } from "@prisma/client";
import React from "react";
import { SocketIndicator } from "../socket-indicator";

interface ChatHeaderProps {
  serverId: string;
  name: string;
  type: "channel" | "conversation";
  imageUrl?: string;
  icon: JSX.Element;
}

export const ChatHeader = ({
  serverId,
  name,
  type,
  imageUrl,
  icon,
}: ChatHeaderProps) => {
  return (
    <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
      <MobileToggle serverId={serverId} />
      {React.cloneElement(icon, {
        className: "w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2",
      })}
      <p className="font-semibold text-md text-black dark:text-white">{name}</p>
      <div className="ml-auto flex items-center justify-center">
        <SocketIndicator />
      </div>
    </div>
  );
};
