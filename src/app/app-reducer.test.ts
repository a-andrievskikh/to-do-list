import { v1 } from 'uuid'
import { appReducer, AppStateType, setAppErrorAC, setAppStatusAC } from './app-reducer'

let todolistID1: string
let todolistID2: string
let startState: AppStateType

beforeEach(() => {
  todolistID1 = v1()
  todolistID2 = v1()

  startState = {
    status: 'idle',
    error: null,
  }
})

test('correct error message should be set', () => {
  const endState = appReducer(startState, setAppErrorAC('some error'))

  expect(endState.error).toBe('some error')
  expect(endState.status).toBe('idle')
})

test('correct status message should be set', () => {
  const endState = appReducer(startState, setAppStatusAC('succeeded'))

  expect(endState.status).toBe('succeed')
  expect(endState.error).toBe(null)
})