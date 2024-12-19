import React from 'react'

export const Wrapper = ({ children, className }) => (
   <div className={`p-4 max-w-7xl mx-auto pt-28 md:pt-36 ${className}`}>{children}</div>
)
