import styled from 'styled-components'

export type ButtonVariants = 'primary' | 'secondary' | 'danger' | 'success'

interface ButtonProps {
  variant: ButtonVariants
}

// const variants = {
//   primary: '#007bff',
//   secondary: '#6c757d',
//   danger: '#dc3545',
//   success: '#28a745',
// }

export const ButtonContainer = styled.button<ButtonProps>`
  width: 100px;
  height: 40px;
  border-radius: 4px;
  border: 0;
  margin: 8px;

  background-color: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme.white};
`
