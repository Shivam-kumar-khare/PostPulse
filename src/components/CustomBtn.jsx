import React from 'react'

function CustomBtn({
    children,
    type="submit",
    bgColor="bg-blue-600",
    textColor="text-white",
    className="",
    ...props
}) {
  return (
    <button type={type} className={`px-4 py-2  rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>{children}</button>
  )
}

export default CustomBtn