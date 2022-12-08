import { Play } from 'phosphor-react'
import {
  CountDownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountDownButton,
  TaskInput,
} from './styles'

export function Home() {
  return (
    <HomeContainer>
      <form>
        <FormContainer>
          <label htmlFor="task">I will work on</label>
          <TaskInput
            type="text"
            id="task"
            placeholder="Give a name to your task"
            list="task-suggestions"
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
            min={5}
            max={60}
          />
          <span>minutes.</span>
        </FormContainer>

        <CountDownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>

        <StartCountDownButton disabled type="submit">
          <Play size={24} />
          Start
        </StartCountDownButton>
      </form>
    </HomeContainer>
  )
}
