import React from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'

export const MenuToggle = ({ menuOpen, handleMenuToggle }) => (
   <button className="md:hidden text-white" onClick={handleMenuToggle}>
      {menuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
   </button>
)
