import { useContext } from 'react'
import { SessionsContext } from '../../contexts/SessionsContext'
import { HistoryContainer, HistoryList, Status } from './styles'

export function History() {
  const { sessions } = useContext(SessionsContext)

  document.title = 'Dev Timer'

  return (
    <HistoryContainer>
      <h1>History</h1>
      <pre>{JSON.stringify(sessions, null, 2)}</pre>
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
            <tr>
              <td>Task 1</td>
              <td>20m</td>
              <td>2 days ago</td>
              <td>
                <Status statusColor="green">Completed</Status>
              </td>
            </tr>
            <tr>
              <td>Task 2</td>
              <td>20m</td>
              <td>2 days ago</td>
              <td>
                <Status statusColor="green">Completed</Status>
              </td>
            </tr>
            <tr>
              <td>Task 3</td>
              <td>20m</td>
              <td>2 days ago</td>
              <td>
                <Status statusColor="green">Completed</Status>
              </td>
            </tr>
            <tr>
              <td>Task 4</td>
              <td>20m</td>
              <td>2 days ago</td>
              <td>
                <Status statusColor="green">Completed</Status>
              </td>
            </tr>
            <tr>
              <td>Task 5</td>
              <td>20m</td>
              <td>2 days ago</td>
              <td>
                <Status statusColor="red">Interrupted</Status>
              </td>
            </tr>
            <tr>
              <td>Task 6</td>
              <td>20m</td>
              <td>2 days ago</td>
              <td>
                <Status statusColor="yellow">In progress</Status>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
