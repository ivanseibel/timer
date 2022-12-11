import { Session } from './reducer'

export enum ActionTypes {
  // eslint-disable-next-line no-unused-vars
  ADD_SESSION = 'ADD_SESSION',
  // eslint-disable-next-line no-unused-vars
  INTERRUPT_CURRENT_SESSION = 'INTERRUPT_CURRENT_SESSION',
  // eslint-disable-next-line no-unused-vars
  MARK_SESSION_AS_FINISHED = 'MARK_SESSION_AS_FINISHED',
}

export function addNewSessionAction(newSession: Session) {
  return {
    type: ActionTypes.ADD_SESSION,
    payload: {
      newSession,
    },
  }
}

export function interruptCurrentSessionAction() {
  return {
    type: ActionTypes.INTERRUPT_CURRENT_SESSION,
  }
}

export function markSessionAsFinishedAction() {
  return {
    type: ActionTypes.MARK_SESSION_AS_FINISHED,
  }
}
