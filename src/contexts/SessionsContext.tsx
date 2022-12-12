import { differenceInSeconds } from 'date-fns'
import {
  createContext,
  ReactNode,
  useReducer,
  useState,
  useEffect,
} from 'react'
import {
  addNewSessionAction,
  interruptCurrentSessionAction,
  markSessionAsFinishedAction,
} from '../reducers/sessions/actions'
import { Session, sessionsReducer } from '../reducers/sessions/reducer'

interface CreateSessionData {
  task: string
  minutesAmount: number
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
  const [sessionsState, dispatch] = useReducer(
    sessionsReducer,
    {
      sessions: [],
      activeSessionId: null,
    },
    () => {
      const sessionsStateJSON = localStorage.getItem(
        '@DevTimer:sessionsState-1.0.0',
      )

      if (sessionsStateJSON) {
        return JSON.parse(sessionsStateJSON)
      }

      return {
        sessions: [],
        activeSessionId: null,
      }
    },
  )

  const { sessions, activeSessionId } = sessionsState

  const activeSession = sessions.find(
    (session) => session.id === activeSessionId,
  )

  function markCurrentSessionAsFinished() {
    dispatch(markSessionAsFinishedAction())
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

    dispatch(addNewSessionAction(newSession))
  }

  function stopCountDown() {
    dispatch(interruptCurrentSessionAction())

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
