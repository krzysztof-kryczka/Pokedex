import React from 'react'
import { StyledButton } from '../StyledButton'

export const BattleButton = ({ onClick, disabled }) => (
   <StyledButton onClick={onClick} disabled={disabled}>
      WALCZ!
   </StyledButton>
)
