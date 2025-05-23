import React, { useId, forwardRef } from 'react'


const Input = forwardRef(function Input(
    {
        label,
        type = "text",
        className = "",
        ...props
    }, ref

) {
    const id = useId();
    return (
        <div className="w-full">
            {
                label &&
                <label
                    htmlFor={id}
                    className={`mb-1 pl-1 inline-block`}
                >
                    {label}
                </label>
            }
            {
                <input ref={ref} type={type} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-500 w-full ${className} `} />

            }
        </div>
    )
})

export default Input