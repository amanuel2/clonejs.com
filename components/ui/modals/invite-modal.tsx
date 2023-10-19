'use client';

import axios from "axios";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/ui/dialog"
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";



export const InviteModal = () => {

    const { isOpen, onClose, onOpen, type, data } = useModal();
    const origin = useOrigin();


    const inviteUrl = `${origin}/invite/${data.server?.inviteCode}`;


    const isModalOpen = isOpen && type === "invite"

    const [copied, setCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onCopy = () => {
        navigator.clipboard.writeText(inviteUrl)
        setCopied(true)

        setTimeout(() => {
            setCopied(false)
        }, 350)
    }

    const onNew = async() => {
        try {
            setIsLoading(true)
            const resp = await axios.patch(`/api/servers/${data.server?.id}/invite-code`);
            onOpen("invite", {server: resp.data})   
        } catch (err) {console.log(err)}
        finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
        <DialogContent className="bg-white text-black p-0 overflow-hidden">
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl text-center font-bold">
              Invite Friends
            </DialogTitle>
          </DialogHeader>
          <div className="p-6">
            <Label
              className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
            >
              Server invite link
            </Label>
            <div className="flex items-center mt-2 gap-x-2">
              <Input
                disabled={isLoading}
                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                value={inviteUrl}
              />
              <Button disabled={isLoading} onClick={onCopy} size="icon">
                {copied 
                  ? <Check className="w-4 h-4" /> 
                  : <Copy className="w-4 h-4" />
                }
              </Button>
            </div>
            <div className="flex items-end mt-2 gap-x-2 py-0 my-0 justify-end ">
                <Button
                onClick={onNew}
                disabled={isLoading}
                variant="primary"
                size="sm"
                className="text-xs text-white mt-4 relative bottom-0 right-0 "
                >
                Generate a new link
                <RefreshCw className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
    )
}