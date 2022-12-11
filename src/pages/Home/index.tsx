import { HandPalm, Play } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'
import * as zod from 'zod'

import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from './styles'
import { NewSessionForm } from './components/NewSessionForm'
import { CountDown } from './components/CountDown'
import { useContext } from 'react'
import { SessionsContext } from '../../contexts/SessionsContext'

const newSessionFormValidationSchema = zod.object({
  task: zod.string().min(1),
  minutesAmount: zod.number().min(5).max(60).int(),
})

type NewSessionFormData = zod.infer<typeof newSessionFormValidationSchema>

export function Home() {
  const { activeSession, createNewSession, stopCountDown } =
    useContext(SessionsContext)

  const newSessionForm = useForm<NewSessionFormData>({
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newSessionForm

  const task = watch('task')
  const isSubmitDisabled = !task

  function handleCreateNewSession(data: NewSessionFormData) {
    createNewSession(data)
    reset()
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewSession)}>
        <FormProvider {...newSessionForm}>
          <NewSessionForm />
        </FormProvider>

        <CountDown />

        {activeSession ? (
          <StopCountDownButton type="button" onClick={stopCountDown}>
            <HandPalm size={24} />
            Stop
          </StopCountDownButton>
        ) : (
          <StartCountDownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Start
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  )
}
