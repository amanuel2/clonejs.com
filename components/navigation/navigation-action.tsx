'use client';
import React from 'react'
import { useModal } from '@/hooks/use-modal-store'
import { Plus } from 'lucide-react'

import { ActionTooltip } from '@/components/action-tooltip'

function NavigationAction() {
  const { onOpen } = useModal()
  return (
    <div>
        <ActionTooltip
            side="right"
            align='center'
            label='Add a server'>
            <button className="group" onClick={()=>{onOpen("createServer")}}>
                <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-600 group-hover:bg-emerald-400">
                    <Plus
                        className="group-hover:text-white text-emerald-400" 
                        size={25}
                    />
                </div>
            </button>
        </ActionTooltip>
    </div>
  )
}

export default NavigationAction