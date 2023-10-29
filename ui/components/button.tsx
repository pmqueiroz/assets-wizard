import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant: 'primary' | 'neutral'
    expand?: boolean
    loading?: boolean
    trimmed?: 'left' | 'right'
}

const variantStyle: Record<ButtonProps['variant'], string> = {
    neutral: 'bg-gray-100 text-slate-950 hover:bg-gray-200',
    primary: 'bg-purple-500 text-white hover:bg-purple-600'
}

const Loading = () => (
    <svg
        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
    >
        <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
        ></circle>
        <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
    </svg>
)

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ variant, expand, loading, children, trimmed, ...rest }, ref) => {
        return (
            <button
                className={`transition-colors h-12 px-4 py-3 gap-1 flex justify-center items-center text-base font-semibold ${
                    variantStyle[variant]
                } ${expand ? 'w-full' : ''}
                ${trimmed !== 'right' ? 'rounded-r-lg' : ''}
                ${trimmed !== 'left' ? 'rounded-l-lg' : ''}
                disabled:opacity-40
                `}
                style={{ minWidth: '48px' }}
                {...rest}
                ref={ref}
            >
                {loading && <Loading />}
                {children}
            </button>
        )
    }
)
