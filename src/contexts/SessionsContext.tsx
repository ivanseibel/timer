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

interface SessionsState {
  sessions: Session[]
  activeSessionId: string | null
}

export const SessionsContext = createContext({} as SessionsContextData)

export function SessionsContextProvider({
  children,
}: SessionsContextProviderProps) {
  const [sessionsState, dispatch] = useReducer(
    (state: SessionsState, action: any) => {
      switch (action.type) {
        case 'ADD_SESSION':
          return {
            ...state,
            sessions: [...state.sessions, action.payload.newSession],
            activeSessionId: action.payload.newSession.id,
          }
        case 'INTERRUPT_CURRENT_SESSION':
          return {
            ...state,
            sessions: state.sessions.map((session) => {
              if (session.id === state.activeSessionId) {
                return {
                  ...session,
                  interruptedAt: new Date(),
                }
              }

              return session
            }),
            activeSessionId: null,
          }
        case 'MARK_SESSION_AS_FINISHED':
          return {
            ...state,
            sessions: state.sessions.map((session) => {
              if (session.id === state.activeSessionId) {
                return {
                  ...session,
                  finishedAt: new Date(),
                }
              }

              return session
            }),
            activeSessionId: null,
          }
        default:
          return state
      }
    },
    {
      sessions: [],
      activeSessionId: null,
    },
  )

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { sessions, activeSessionId } = sessionsState

  const activeSession = sessions.find(
    (session) => session.id === activeSessionId,
  )

  function markCurrentSessionAsFinished() {
    dispatch({
      type: 'MARK_SESSION_AS_FINISHED',
    })
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

    dispatch({ type: 'ADD_SESSION', payload: { newSession } })
  }

  function stopCountDown() {
    dispatch({
      type: 'INTERRUPT_CURRENT_SESSION',
    })

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
