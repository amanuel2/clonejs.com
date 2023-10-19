'use client';
import { Badge } from "./ui/badge";
import { useSocket } from "./ui/prodivers/socket-provider";


export const SocketIndicator = () => {
  const { isConnected } = useSocket();

  if (!isConnected) {
    return (
      <Badge 
        variant="outline" 
        className="bg-yellow-300 text-white border-none"
      >
        Offline
      </Badge>
    )
  }

  return (
    <Badge 
      variant="outline" 
      className="bg-emerald-500 text-white border-none"
    >
      Live
    </Badge>
  )
}