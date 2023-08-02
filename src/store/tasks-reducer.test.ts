import { TasksStateType } from '../AppWithRedux'
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer,
} from './tasks-reducer'
import { addTodolistAC, removeTodolistAC } from './todolists-reducer'
import { v1 } from 'uuid'

let todolistID1: string
let todolistID2: string
let startState: TasksStateType

beforeEach(() => {
  todolistID1 = v1()
  todolistID2 = v1()

  startState = {
    [todolistID1]: [
      { id: '1', title: 'CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],
    [todolistID2]: [
      { id: '1', title: 'bread', isDone: false },
      { id: '2', title: 'milk', isDone: true },
      { id: '3', title: 'tea', isDone: false },
    ],
  }
})


test('correct task should be removed', () => {
  const action = removeTaskAC(todolistID2, '2')
  const endState = tasksReducer(startState, action)

  expect(endState[todolistID1].length).toBe(3)
  expect(endState[todolistID2].length).toBe(2)
  expect(endState[todolistID2].every(x => x.id !== '2')).toBeTruthy()
  expect(endState).toEqual({
      [todolistID1]: [
        { id: '1', title: 'CSS', isDone: false },
        { id: '2', title: 'JS', isDone: true },
        { id: '3', title: 'React', isDone: false },
      ],
      [todolistID2]: [
        { id: '1', title: 'bread', isDone: false },
        { id: '3', title: 'tea', isDone: false },
      ],
    },
  )
})

test('correct task should be added to correct array', () => {
  const action = addTaskAC(todolistID2, 'juice')
  const endState = tasksReducer(startState, action)

  expect(endState[todolistID1].length).toBe(3)
  expect(endState[todolistID2].length).toBe(4)
  expect(endState[todolistID2][0].id).toBeDefined()
  expect(endState[todolistID2][0].title).toBe('juice')
  expect(endState[todolistID2][0].isDone).toBe(false)
})

test('status of specified task should be changed', () => {
  const action = changeTaskStatusAC(todolistID2, '2', false)
  const endState = tasksReducer(startState, action)

  expect(endState[todolistID1][1].isDone).toBeTruthy()
  expect(endState[todolistID2][1].isDone).toBeFalsy()
})

test('title of specified task should be changed', () => {
  const action = changeTaskTitleAC(todolistID2, '2', 'apple')
  const endState = tasksReducer(startState, action)

  expect(endState[todolistID1][1].title).toBe('JS')
  expect(endState[todolistID2][1].title).toBe('apple')
})

test('new array should be added when new todolist is added', () => {
  const action = addTodolistAC('new todolist')
  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)
  const newKey = keys.find(k => k != todolistID1 && k != todolistID2)
  if (!newKey) {
    throw Error('new key should be added')
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
  const action = removeTodolistAC(todolistID2)
  const endState = tasksReducer(startState, action)
  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState[todolistID2]).not.toBeDefined()
})