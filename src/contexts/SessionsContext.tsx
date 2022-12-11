import { createContext, ReactNode, useReducer, useState } from 'react'

interface CreateSessionData {
  task: string
  minutesAmount: number
}

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
  sessions: Session[]
  markCurrentSessionAsFinished: () => void
  updateAmountSecondsPassed: (seconds: number) => void
  createNewSession: (data: CreateSessionData) => void
  stopCountDown: () => void
}

interface SessionsContextProviderProps {
  children: ReactNode
}

export const SessionsContext = createContext({} as SessionsContextData)

export function SessionsContextProvider({
  children,
}: SessionsContextProviderProps) {
  const [sessions, dispatch] = useReducer(
    (oldSessions: Session[], action: any) => {
      if (action.type === 'ADD_SESSION') {
        return [...oldSessions, action.payload.newSession]
      }

      return oldSessions
    },
    [],
  )
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeSession = sessions.find(
    (session) => session.id === activeSessionId,
  )

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

  function createNewSession(data: CreateSessionData) {
    const newSession: Session = {
      id: new Date().getTime().toString(),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startedAt: new Date(),
    }

    setAmountSecondsPassed(0)

    // setSessions((oldSessions) => [...oldSessions, newSession])

    dispatch({ type: 'ADD_SESSION', payload: { newSession } })

    setActiveSessionId(newSession.id)
  }

  function stopCountDown() {
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
    <SessionsContext.Provider
      value={{
        activeSession,
        activeSessionId,
        amountSecondsPassed,
        sessions,
        markCurrentSessionAsFinished,
        updateAmountSecondsPassed,
        createNewSession,
        stopCountDown,
      }}
    >
      {children}
    </SessionsContext.Provider>
  )
}
