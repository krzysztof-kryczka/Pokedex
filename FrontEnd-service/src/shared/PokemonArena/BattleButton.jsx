import React from 'react'
import { Button } from '../UI/Button'

export const BattleButton = ({ onClick, disabled }) => (
   <Button onClick={onClick} disabled={disabled}>
      WALCZ!
   </Button>
)
