import React from 'react'
import { NavLinkButton } from '../UI/NavLinkButton'

export const UnauthenticatedLinks = ({ links, handleMenuToggle }) => (
   <>
      {links.map(link => (
         <NavLinkButton key={link.to} to={link.to} onClick={handleMenuToggle}>
            {link.text}
         </NavLinkButton>
      ))}
   </>
)