import React from 'react'
import { FaUser } from 'react-icons/fa'

export const UserStatus = ({ user }) => (
   <p className="text-white flex items-center">
      <FaUser className="mr-2" /> {`Zalogowany jako: ${user.name}`}
   </p>
)
