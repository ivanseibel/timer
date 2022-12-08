import { Button } from './components/Button'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/global'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <h1>Timer project</h1>

      <Button variant={'primary'}>Primary</Button>

      <Button variant={'secondary'}>Secondary</Button>

      <Button variant={'danger'}>Danger</Button>

      <Button variant={'success'}>Success</Button>

      <GlobalStyle />
    </ThemeProvider>
  )
}
