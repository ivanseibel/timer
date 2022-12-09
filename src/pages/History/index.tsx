import { HistoryContainer, HistoryList } from './styles'

export function History() {
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
            <tr>
              <td>Task 1</td>
              <td>20m</td>
              <td>2 days ago</td>
              <td>Completed</td>
            </tr>
            <tr>
              <td>Task 2</td>
              <td>20m</td>
              <td>2 days ago</td>
              <td>Completed</td>
            </tr>
            <tr>
              <td>Task 3</td>
              <td>20m</td>
              <td>2 days ago</td>
              <td>Completed</td>
            </tr>
            <tr>
              <td>Task 4</td>
              <td>20m</td>
              <td>2 days ago</td>
              <td>Completed</td>
            </tr>
            <tr>
              <td>Task 5</td>
              <td>20m</td>
              <td>2 days ago</td>
              <td>Completed</td>
            </tr>
            <tr>
              <td>Task 6</td>
              <td>20m</td>
              <td>2 days ago</td>
              <td>Completed</td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
