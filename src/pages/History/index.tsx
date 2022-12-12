import { useContext } from 'react'
import { SessionsContext } from '../../contexts/SessionsContext'
import { formatDistanceToNow } from 'date-fns'

import { HistoryContainer, HistoryList, Status } from './styles'

export function History() {
  const { sessions } = useContext(SessionsContext)

  document.title = 'Dev Timer'

  return (
    <HistoryContainer>
      <h1>History</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Duration</th>
              <th>Start</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {sessions
              .map((session) => (
                <tr key={session.id}>
                  <td>{session.task}</td>
                  <td>{session.minutesAmount}m</td>
                  <td>
                    {formatDistanceToNow(new Date(session.startedAt), {
                      addSuffix: true,
                    })}
                  </td>
                  <td>
                    {session.finishedAt && (
                      <Status statusColor="green">Finished</Status>
                    )}

                    {session.interruptedAt && (
                      <Status statusColor="red">Interrupted</Status>
                    )}

                    {!session.finishedAt && !session.interruptedAt && (
                      <Status statusColor="yellow">Running</Status>
                    )}
                  </td>
                </tr>
              ))
              .reverse()}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
