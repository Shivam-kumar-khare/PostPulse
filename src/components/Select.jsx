import React, { forwardRef, useId } from 'react'

function Select(
    {
        label,
        options = [],
        classname = "",
        ...props
    }, ref
) {
    const id = useId();
    return (
        <div className='w-full'>
            {
                label &&
                <label htmlFor={id} className="">{label}</label>
            }
            <select {...props} id={id} ref={ref} className={`px-3 py-2 rounded-lg bg-white outline-none focus:bg-gray-200 w-full ${classname}`}>
                {
                    options?.map((option) => (
                        <option value={option} key={option}>{option.toUpperCase()}</option>
                    ))
                }
            </select>
        </div>
    )
}

export default forwardRef(Select);