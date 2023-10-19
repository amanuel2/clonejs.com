"use client";

import { useEffect, useState } from "react";
import {
  ControlBar,
  LiveKitRoom,
  RoomAudioRenderer,
  VideoConference,
} from "@livekit/components-react";
import "@livekit/components-styles";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

interface MediaRoomProps {
  chatId: string;
  video: boolean;
  audio: boolean;
  name: string;
}

export const MediaRoom = ({ chatId, video, name, audio }: MediaRoomProps) => {
  // const { user } = useUser();
  const [token, setToken] = useState("");
  useEffect(() => {
    // console.log(user);

    // if (!user?.firstName || !user?.lastName) return;

    // const name = `${user.firstName} ${user.lastName}`;
    (async () => {
      try {
        console.log("PRE FETCHING");
        const resp = await fetch(
          `/api/livekit?room=${chatId}&username=${name}`
        );
        console.log("FETCHING");
        const data = await resp.json();
        setToken(data.token);
      } catch (e) {
        console.warn(e);
      }
    })();
  }, []);

  if (token === "") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Loading...</p>
      </div>
    );
  }

  return (
    // <LiveKitRoom
    //   data-lk-theme="default"
    //   serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
    //   token={token}
    //   connect={true}
    //   video={video}
    //   audio={audio}
    // >
    //   <VideoConference />
    // </LiveKitRoom>
    <LiveKitRoom
      video={true}
      audio={true}
      token={token}
      connectOptions={{ autoSubscribe: false }}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      // Use the default LiveKit theme for nice styles.
      data-lk-theme="default"
      style={{ height: "100dvh" }}
    >
      {/* Your custom component with basic video conferencing functionality. */}
      <VideoConference />
      {/* The RoomAudioRenderer takes care of room-wide audio for you. */}
      <RoomAudioRenderer />
      {/* Controls for the user to start/stop audio, video, and screen 
    share tracks and to leave the room. */}
      <ControlBar />
    </LiveKitRoom>
  );
};
