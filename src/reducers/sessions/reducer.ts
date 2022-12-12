import { produce } from 'immer'

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
      return produce(state, (draft) => {
        draft.sessions.push(action.payload.newSession)
        draft.activeSessionId = action.payload.newSession.id
      })
    case ActionTypes.INTERRUPT_CURRENT_SESSION: {
      const currentSessionIndex = state.sessions.findIndex(
        (session) => session.id === state.activeSessionId,
      )

      if (currentSessionIndex === -1) {
        return state
      }

      return produce(state, (draft) => {
        draft.sessions[currentSessionIndex].interruptedAt = new Date()

        draft.activeSessionId = null
      })
    }
    case ActionTypes.MARK_SESSION_AS_FINISHED: {
      const currentSessionIndex = state.sessions.findIndex(
        (session) => session.id === state.activeSessionId,
      )

      if (currentSessionIndex === -1) {
        return state
      }

      return produce(state, (draft) => {
        draft.sessions[currentSessionIndex].finishedAt = new Date()

        draft.activeSessionId = null
      })
    }
    default:
      return state
  }
}
