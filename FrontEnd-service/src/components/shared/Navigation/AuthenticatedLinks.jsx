import React from 'react'
import { NavLinkButton } from '../UI/NavLinkButton'

export const AuthenticatedLinks = ({ links, logout, enqueueSnackbar, handleMenuToggle }) => (
   <>
      {links.map(link => (
         <NavLinkButton key={link.to} to={link.to} onClick={handleMenuToggle}>
            {link.text}
         </NavLinkButton>
      ))}
      <NavLinkButton
         onClick={() => {
            logout(enqueueSnackbar)
            handleMenuToggle()
         }}
      >
         Wyloguj
      </NavLinkButton>
   </>
)
