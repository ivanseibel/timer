import { FormContainer, MinutesAmountInput, TaskInput } from './styles'
import { useContext } from 'react'
import { SessionsContext } from '../..'
import { useFormContext } from 'react-hook-form'

export function NewSessionForm() {
  const { activeSession } = useContext(SessionsContext)
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="task">I will work on</label>
      <TaskInput
        type="text"
        id="task"
        placeholder="Give a name to your task"
        list="task-suggestions"
        disabled={!!activeSession}
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
        min={1}
        max={60}
        disabled={!!activeSession}
        {...register('minutesAmount', { valueAsNumber: true })}
      />
      <span>minutes.</span>
    </FormContainer>
  )
}
