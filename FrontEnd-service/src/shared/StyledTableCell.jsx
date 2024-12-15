import React from 'react'

export const StyledTableCell = ({ children, className }) => (
   <td className={`py-1 px-2 sm:px-4 md:px-8 ${className}`}>{children}</td>
)
