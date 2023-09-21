import { v1 } from 'uuid'
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC, FilterType,
  removeTodolistAC, setTodolistsAC, TodolistDomainType,
  todolistsReducer,
} from './todolists-reducer'
import { TodolistType } from '../../api/todolists-api'

let todolistID1: string
let todolistID2: string
let startState: TodolistDomainType[]

beforeEach(() => {
  todolistID1 = v1()
  todolistID2 = v1()

  startState = [
    { id: todolistID1, title: 'What to learn', filter: 'all', addedDate: '', order: 0 },
    { id: todolistID2, title: 'What to buy', filter: 'all', addedDate: '', order: 0 },
  ]
})

test('correct todolist should be removed', () => {
  const action = removeTodolistAC(todolistID1)
  const endState = todolistsReducer(startState, action)

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistID2)
})

test('correct todolist should be added', () => {
  const todolist: TodolistType = {
    id: 'new id',
    title: 'New Todolist',
    order: 0,
    addedDate: '',
  }

  const action = addTodolistAC(todolist)
  const endState = todolistsReducer(startState, action)

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(todolist.title)
  expect(endState[0].filter).toBe('all')
})

test('correct todolist should change its name', () => {
  const newTodolistTitle = 'New Todolist'

  const action = changeTodolistTitleAC(todolistID2, newTodolistTitle)
  const endState = todolistsReducer(startState, action)

  expect(endState[0].title).toBe('What to learn')
  expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
  const newFilter: FilterType = 'completed'

  const action = changeTodolistFilterAC(todolistID2, newFilter)
  const endState = todolistsReducer(startState, action)

  expect(endState[0].filter).toBe('all')
  expect(endState[1].filter).toBe(newFilter)
})

test('todolist should be set to the state', () => {
  const action = setTodolistsAC(startState)
  const endState = todolistsReducer([], action)
  expect(endState.length).toBe(2)
})


