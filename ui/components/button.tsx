import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant: 'primary' | 'neutral'
    expand?: boolean
}

const variantStyle: Record<ButtonProps['variant'], string> = {
    neutral: 'bg-gray-100 text-slate-950',
    primary: 'bg-purple-500 text-white'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ variant, expand, ...rest }, ref) => {
        return (
            <button
                className={`h-12 px-4 py-3 gap-1 flex flex-col justify-center items-center text-base font-semibold rounded-lg ${
                    variantStyle[variant]
                } ${expand ? 'w-full' : ''}
                disabled:opacity-40
                `}
                style={{ minWidth: '48px' }}
                {...rest}
                ref={ref}
            />
        )
    }
)
