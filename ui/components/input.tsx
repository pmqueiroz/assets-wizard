import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string
    error?: string
    required?: boolean
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, required, error, ...rest }, ref) => {
        return (
            <div className="flex flex-col gap-1 w-full">
                <span className="font-medium text-sm text-gray-600">
                    {label} {required && <span className="text-red-600">*</span>}
                </span>
                <div className="flex items-center px-2 border-solid border-2 focus-within:border-purple-600 rounded-lg h-12">
                    <input
                        className="w-full h-full outline-none font-medium text-base"
                        ref={ref}
                        {...rest}
                    />
                </div>
                {error && <span className="font-normal text-xs text-red-600">{error}</span>}
            </div>
        )
    }
)
