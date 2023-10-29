import React, { ElementType } from 'react'
import { PolymorphicProps } from '../type'

interface MenuItemProps {
    icon: React.ReactNode
}

const defaultSlot = 'button'

export const MenuItem = <T extends ElementType = typeof defaultSlot>({
    polymorphic,
    children,
    icon,
    ...rest
}: PolymorphicProps<MenuItemProps, T>) => {
    const Element = polymorphic || defaultSlot

    return (
        <Element
            className="flex items-center grow gap-3 w-full h-10 py-2 px-3 rounded-lg hover:bg-gray-200 cursor-pointer"
            {...rest}
        >
            {icon}
            <span className="text-sm font-medium">{children}</span>
        </Element>
    )
}
