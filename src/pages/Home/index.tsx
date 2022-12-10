import { HandPalm, Play } from 'phosphor-react'
import { createContext, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as zod from 'zod'

import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from './styles'
import { NewSessionForm } from './components/NewSessionForm'
import { CountDown } from './components/CountDown'

interface Session {
  id: string
  task: string
  minutesAmount: number
  startedAt: Date
  interruptedAt?: Date
  finishedAt?: Date
}

interface SessionsContextData {
  activeSession: Session | undefined
  activeSessionId: string | null
  amountSecondsPassed: number
  markCurrentSessionAsFinished: () => void
  updateAmountSecondsPassed: (seconds: number) => void
}

export const SessionsContext = createContext({} as SessionsContextData)

const newSessionFormValidationSchema = zod.object({
  task: zod.string().min(1),
  minutesAmount: zod.number().min(5).max(60).int(),
})

type NewSessionFormData = zod.infer<typeof newSessionFormValidationSchema>

export function Home() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeSession = sessions.find(
    (session) => session.id === activeSessionId,
  )

  const newSessionForm = useForm<NewSessionFormData>({
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, reset, watch } = newSessionForm

  function handleCreateNewSession(data: NewSessionFormData) {
    const newSession: Session = {
      id: new Date().getTime().toString(),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startedAt: new Date(),
    }

    setAmountSecondsPassed(0)

    setSessions((oldSessions) => [...oldSessions, newSession])
    setActiveSessionId(newSession.id)

    reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  function handleStopCountDown() {
    setSessions((oldSessions) =>
      oldSessions.map((session) => {
        if (session.id === activeSessionId) {
          return {
            ...session,
            interruptedAt: new Date(),
          }
        }

        return session
      }),
    )
    setActiveSessionId(null)
    setAmountSecondsPassed(0)
  }

  function markCurrentSessionAsFinished() {
    setSessions((oldSessions) =>
      oldSessions.map((session) => {
        if (session.id === activeSessionId) {
          return {
            ...session,
            finishedAt: new Date(),
          }
        }

        return session
      }),
    )

    setActiveSessionId(null)
  }

  function updateAmountSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewSession)}>
        <SessionsContext.Provider
          value={{
            activeSession,
            activeSessionId,
            markCurrentSessionAsFinished,
            amountSecondsPassed,
            updateAmountSecondsPassed,
          }}
        >
          <FormProvider {...newSessionForm}>
            <NewSessionForm />
          </FormProvider>

          <CountDown />
        </SessionsContext.Provider>

        {activeSession ? (
          <StopCountDownButton type="button" onClick={handleStopCountDown}>
            <HandPalm size={24} />
            Stop
          </StopCountDownButton>
        ) : (
          <StartCountDownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Start
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  )
}
