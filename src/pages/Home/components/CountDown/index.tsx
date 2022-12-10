import { differenceInSeconds } from 'date-fns'
import { useContext, useEffect } from 'react'
import { SessionsContext } from '../..'
import { CountDownContainer, Separator } from './styles'

export function CountDown() {
  const {
    activeSession,
    activeSessionId,
    markCurrentSessionAsFinished,
    amountSecondsPassed,
    updateAmountSecondsPassed,
  } = useContext(SessionsContext)

  const totalSeconds = activeSession ? activeSession.minutesAmount * 60 : 0
  const currentSeconds = activeSession ? totalSeconds - amountSecondsPassed : 0

  const currentMinutes = Math.floor(currentSeconds / 60)
  const currentSecondsLeft = currentSeconds % 60

  const minutes = String(currentMinutes).padStart(2, '0')
  const seconds = String(currentSecondsLeft).padStart(2, '0')

  useEffect(() => {
    if (activeSession) {
      document.title = `${minutes}:${seconds} - Dev Timer`
    } else {
      document.title = 'Dev Timer'
    }
  }, [minutes, seconds, activeSession])

  useEffect(() => {
    if (activeSession) {
      const interval = setInterval(() => {
        const secondsPassed = differenceInSeconds(
          new Date(),
          activeSession.startedAt,
        )
        updateAmountSecondsPassed(secondsPassed)

        if (secondsPassed >= totalSeconds) {
          markCurrentSessionAsFinished()
          updateAmountSecondsPassed(0)
        }
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [
    activeSession,
    activeSessionId,
    markCurrentSessionAsFinished,
    totalSeconds,
    updateAmountSecondsPassed,
  ])

  return (
    <CountDownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountDownContainer>
  )
}
