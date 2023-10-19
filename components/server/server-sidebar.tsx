import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { $Enums, ChannelType, MemberRole } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";
import ServerHeader from "./server-header";
import { ScrollArea } from "../ui/scroll-area";
import { ServerSearch } from "./server-search";
import {
  Hash,
  Mic,
  PersonStanding,
  ShieldAlert,
  ShieldCheck,
  Video,
} from "lucide-react";
import { Separator } from "../ui/separator";
import { ServerSection } from "./server-section";
import { ServerChannel } from "./server-channel";
import { ServerMember } from "./server-member";

interface ServerSidebarProps {
  serverId: string;
}

const channelIconMap = {
  [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4" />,
  [ChannelType.AUDIO]: <Mic className="mr-2 h-4 w-4" />,
  [ChannelType.VIDEO]: <Video className="mr-2 h-4 w-4" />,
};

const memberIconMap = {
  [MemberRole.GUEST]: (
    <PersonStanding className="mr-2 h-4 w-4 text-indigo-400" />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className="mr-2 h-4 w-4 text-indigo-400" />,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="mr-2 h-4 w-4 text-indigo-400" />
  ),
};

interface AllChannelProps {
  label: string;
  type: ChannelType;
  sectionType: "members" | "channels";
  data:
    | {
        id: string;
        name: string;
        type: $Enums.ChannelType;
        profileId: string;
        serverId: string;
        createdAt: Date;
        updatedAt: Date;
      }[]
    | undefined;
}

async function ServerSidebar({ serverId }: ServerSidebarProps) {
  const profile = await currentProfile();
  if (!profile) return redirect("/");

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  const members = server?.members.filter(
    (member) => member.profileId !== profile.id
  );
  const textChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );
  const audioChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );
  const videoChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );
  const allChannels: AllChannelProps[] = [
    {
      label: "Text Channels",
      sectionType: "channels",
      type: ChannelType.TEXT,
      data: server?.channels.filter(
        (channel) => channel.type === ChannelType.TEXT
      ),
    },
    {
      label: "Audio Channels",
      sectionType: "channels",
      type: ChannelType.AUDIO,
      data: server?.channels.filter(
        (channel) => channel.type === ChannelType.AUDIO
      ),
    },
    {
      label: "Video Channels",
      sectionType: "channels",
      type: ChannelType.VIDEO,
      data: server?.channels.filter(
        (channel) => channel.type === ChannelType.VIDEO
      ),
    },
    // {
    //     label: "Members",
    //     sectionType: "members",
    //     type: Mem
    // }
  ];

  if (!server) return redirect("/");

  const role = server.members.find(
    (member) => member.profileId === profile.id
  )?.role;

  let tt: "member" | "channel" = "member";
  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <ServerHeader server={server} role={role} />

      <ScrollArea className="flex-1 px-3">
        <div className="mt-2">
          <ServerSearch
            data={[
              // @ts-ignore
              ...allChannels.map(({ label, data }) => ({
                label: label,
                type: "channel",
                data: data?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: channelIconMap[channel.type],
                })),
              })),
              {
                label: "Members", // Assuming this label is for the Members data
                type: "member", // Make sure the type is 'member'
                data: members?.map((member) => ({
                  id: member.id,
                  name: member.profile.name,
                  icon: memberIconMap[member.role],
                })),
              },
            ]}
          />
        </div>
        <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />
        {/* {allChannels.map(({ label, sectionType, type, data }, i) => (
          <>
            {!!data?.length && (
              <div className="mb-2">
                <ServerSection
                  key={i}
                  sectionType={sectionType}
                  channelType={type}
                  role={role}
                  label={label}
                />
                <div className="space-y-[2px]">
                  {data.map((channel, i) => (
                    <ServerChannel
                      key={channel.id}
                      channel={channel}
                      role={role}
                      server={server}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        ))}
         */}
        {!!textChannels?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.TEXT}
              role={role}
              label="Text Channels"
            />
            <div className="space-y-[2px]">
              {textChannels.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}
        {!!audioChannels?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.AUDIO}
              role={role}
              label="Voice Channels"
            />
            <div className="space-y-[2px]">
              {audioChannels.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}
        {!!videoChannels?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.VIDEO}
              role={role}
              label="Video Channels"
            />
            <div className="space-y-[2px]">
              {videoChannels.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}
        {!!members?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="members"
              role={role}
              label="Members"
              server={server}
            />
            <div className="space-y-[2px]">
              {members.map((member) => (
                <ServerMember key={member.id} member={member} server={server} />
              ))}
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}

export default ServerSidebar;
