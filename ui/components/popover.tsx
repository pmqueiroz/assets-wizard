import React from 'react'
import {
    useFloating,
    useDismiss,
    useInteractions,
    FloatingFocusManager,
    useClick
} from '@floating-ui/react'

interface PopoverProps {
    open: boolean
    toggle: (nextState: boolean) => void
    children: React.ReactNode
    trigger: React.ReactNode
}

export const Popover = ({ open, toggle, trigger, children }: PopoverProps) => {
    const { refs, context } = useFloating({
        open,
        onOpenChange: toggle
    })

    const click = useClick(context)
    const dismiss = useDismiss(context)

    const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss])

    return (
        <div className="z-50 relative">
            <div
                role="presentation"
                aria-label="trigger"
                ref={refs.setReference}
                {...getReferenceProps()}
            >
                {trigger}
            </div>
            {open && (
                <FloatingFocusManager context={context} modal={false}>
                    <div
                        className="rounded-lg bg-white p-2 shadow-lg shadow-stone-500/50 absolute -left-36 bottom-16 w-58"
                        ref={refs.setFloating}
                        {...getFloatingProps()}
                    >
                        {children}
                    </div>
                </FloatingFocusManager>
            )}
        </div>
    )
}
