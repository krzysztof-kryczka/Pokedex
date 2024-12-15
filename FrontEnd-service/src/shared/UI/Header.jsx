import React from 'react'
import clsx from 'clsx'

const headerVariants = {
   h1: 'h1',
   h2: 'h2',
   h3: 'h3',
   h4: 'h4',
   h5: 'h5',
   h6: 'h6',
}

export const Header = ({ variant, ...props }) => {
   const Component = headerVariants[variant]
   return (
      <Component
         className={clsx('text-center', variant === 'h1' && 'text-2xl md:text-4xl font-bold py-8 md:py-8 text-center')}
         {...props}
      />
   )
}
