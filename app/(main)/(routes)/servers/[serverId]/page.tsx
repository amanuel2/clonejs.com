import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react'

interface ServerIdPageProps {
  params : {
    serverId: string;
  }
}

export default async function ServerIdPage({params}: ServerIdPageProps) {
  const profile = await currentProfile();

  if(!profile) redirectToSignIn()
  const server = await db.server.findUnique({
    where :{
      id: params.serverId,
      members: {
        some: {
          profileId: profile?.id
        }
      }
    },
    include: {
      channels: {
        where: {
          name: "general"
        },
        orderBy: {
          createdAt: "asc"
        }
      },
    }
  })

  const initalChannel = server?.channels[0];
  if(initalChannel?.name !== "general") return null;

  return redirect(`/servers/${params.serverId}/channels/${initalChannel.id}`)
}
