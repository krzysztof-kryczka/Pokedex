import React from 'react'
import { Link } from 'react-router-dom'

export const NavLinkButton = ({ to, children, onClick }) => (
   <Link
      to={to}
      onClick={onClick}
      className="btn bg-light-button dark:bg-dark-button hover:bg-light-button-hover dark:hover:bg-dark-button-hover"
   >
      {children}
   </Link>
)
