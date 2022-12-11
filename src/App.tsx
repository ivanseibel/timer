import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/global'
import { Router } from './Router'
import { SessionsContextProvider } from './contexts/SessionsContext'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <SessionsContextProvider>
        <Router />
      </SessionsContextProvider>
      <GlobalStyle />
    </ThemeProvider>
  )
}
