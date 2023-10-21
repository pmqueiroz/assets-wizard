import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string
    error?: string
    required?: boolean
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, required, error, ...rest }, ref) => {
        return (
            <label>
                <span>
                    {label} {required && <span className="error">*</span>}
                </span>
                <input ref={ref} {...rest}></input>
                {error && <span className="error">{error}</span>}
            </label>
        )
    }
)
