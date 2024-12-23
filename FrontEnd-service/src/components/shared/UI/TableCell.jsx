import React from 'react'

export const TableCell = ({ children, className }) => (
   <td className={`py-1 px-3 sm:px-4 md:px-12 ${className}`}>{children}</td>
)
