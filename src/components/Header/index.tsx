import { NavLink } from 'react-router-dom'
import { Timer, Scroll } from 'phosphor-react'

import { HeaderContainer } from './styles'

import logo from '../../assets/logo.svg'

export function Header() {
  return (
    <HeaderContainer>
      <img src={logo} alt="Tomato logo" width={40} height={40} />
      <nav>
        <NavLink to="/" title="timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="history">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
