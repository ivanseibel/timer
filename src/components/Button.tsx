import { ReactNode } from 'react'
import { ButtonContainer, ButtonVariants } from './Button.styles'

interface ButtonProps {
  children: ReactNode
  variant?: ButtonVariants
}

export function Button({ children, variant = 'primary' }: ButtonProps) {
  return <ButtonContainer variant={variant}>{children}</ButtonContainer>
}
