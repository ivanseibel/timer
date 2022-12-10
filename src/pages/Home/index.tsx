import { HandPalm, Play } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { differenceInSeconds } from 'date-fns'

import {
  CountDownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountDownButton,
  StopCountDownButton,
  TaskInput,
} from './styles'

const newSessionFormValidationSchema = zod.object({
  task: zod.string().min(1),
  minutesAmount: zod.number().min(5).max(60).int(),
})

type NewSessionFormData = zod.infer<typeof newSessionFormValidationSchema>

interface Session {
  id: string
  task: string
  minutesAmount: number
  startedAt: Date
  interruptedAt?: Date
}

export function Home() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { register, handleSubmit, watch, reset } = useForm<NewSessionFormData>({
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const activeSession = sessions.find(
    (session) => session.id === activeSessionId,
  )

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
        setAmountSecondsPassed(
          differenceInSeconds(new Date(), activeSession.startedAt),
        )
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [activeSession])

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

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewSession)}>
        <FormContainer>
          <label htmlFor="task">I will work on</label>
          <TaskInput
            type="text"
            id="task"
            placeholder="Give a name to your task"
            list="task-suggestions"
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="Front-end development" />
            <option value="Back-end development" />
            <option value="Mobile development" />
            <option value="UI/UX design" />
          </datalist>

          <label htmlFor="">for</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />
          <span>minutes.</span>
        </FormContainer>

        <CountDownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountDownContainer>

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
