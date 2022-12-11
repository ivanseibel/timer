import { ActionTypes } from './actions'

export interface Session {
  id: string
  task: string
  minutesAmount: number
  startedAt: Date
  interruptedAt?: Date
  finishedAt?: Date
}

interface SessionsState {
  sessions: Session[]
  activeSessionId: string | null
}

export function sessionsReducer(state: SessionsState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_SESSION:
      return {
        ...state,
        sessions: [...state.sessions, action.payload.newSession],
        activeSessionId: action.payload.newSession.id,
      }
    case ActionTypes.INTERRUPT_CURRENT_SESSION:
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
    case ActionTypes.MARK_SESSION_AS_FINISHED:
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
}
