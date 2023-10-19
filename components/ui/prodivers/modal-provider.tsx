"use client";

import { useEffect, useState } from "react";
import { InviteModal } from "@/components/ui/modals/invite-modal";
import { CreateServerModal } from "@/components/ui/modals/create-server-modal";
import { EditServerModal } from "@/components/ui/modals/edit-server-modal";
import { MembersModal } from "@/components/ui/modals/members-modal";
import { CreateChannelModal } from "@/components/ui/modals/create-channel-modal";
import { LeaveServerModal } from "@/components/ui/modals/leave-server-modal";
import { DeleteServerModal } from "@/components/ui/modals/delete-server-modal";
import { EditChannelModal } from "../modals/edit-channel-modal";
import { DeleteChannelModal } from "../modals/delete-channel-modal";
import { MessageFileModal } from "../modals/message-file-modal";
import { DeleteMessageModal } from "../modals/delete-message-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
      <MembersModal />
      <CreateChannelModal />
      <LeaveServerModal />
      <DeleteServerModal />
      <EditChannelModal />
      <DeleteChannelModal />
      <MessageFileModal />
      <DeleteMessageModal />
    </>
  );
};
