import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer, TasksStateType,
} from './tasks-reducer'
import { addTodolistAC, removeTodolistAC } from './todolists-reducer'
import { v1 } from 'uuid'
import { TaskStatuses } from '../api/tasks-api'

let todolistID1: string
let todolistID2: string
let startState: TasksStateType

beforeEach(() => {
  todolistID1 = v1()
  todolistID2 = v1()

  startState = {
    [todolistID1]: [
      {
        id: '1', title: 'CSS', status: TaskStatuses.New,
        todoListId: todolistID1, description: '', priority: 0,
        startDate: '', deadline: '', order: 0, addedDate: '',
      },
      {
        id: '2', title: 'JS', status: TaskStatuses.Completed,
        todoListId: todolistID1, description: '', priority: 0, startDate: '',
        deadline: '', order: 0, addedDate: '',
      },
      {
        id: '3', title: 'React', status: TaskStatuses.New,
        todoListId: todolistID1, description: '', priority: 0,
        startDate: '', deadline: '', order: 0, addedDate: '',
      },
    ],
    [todolistID2]: [
      {
        id: '1', title: 'bread', status: TaskStatuses.New,
        todoListId: todolistID2, description: '', priority: 0,
        startDate: '', deadline: '', order: 0, addedDate: '',
      },
      {
        id: '2', title: 'milk', status: TaskStatuses.Completed,
        todoListId: todolistID2, description: '', priority: 0, startDate: '',
        deadline: '', order: 0, addedDate: '',
      },
      {
        id: '3', title: 'tea', status: TaskStatuses.New,
        todoListId: todolistID2, description: '', priority: 0,
        startDate: '', deadline: '', order: 0, addedDate: '',
      },
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
        {
          id: '1', title: 'CSS', status: TaskStatuses.New,
          todoListId: todolistID1, description: '', priority: 0,
          startDate: '', deadline: '', order: 0, addedDate: '',
        },
        {
          id: '2', title: 'JS', status: TaskStatuses.Completed,
          todoListId: todolistID1, description: '', priority: 0, startDate: '',
          deadline: '', order: 0, addedDate: '',
        },
        {
          id: '3', title: 'React', status: TaskStatuses.New,
          todoListId: todolistID1, description: '', priority: 0,
          startDate: '', deadline: '', order: 0, addedDate: '',
        },
      ],
      [todolistID2]: [
        {
          id: '1', title: 'bread', status: TaskStatuses.New,
          todoListId: todolistID2, description: '', priority: 0,
          startDate: '', deadline: '', order: 0, addedDate: '',
        },
        {
          id: '3', title: 'tea', status: TaskStatuses.New,
          todoListId: todolistID2, description: '', priority: 0,
          startDate: '', deadline: '', order: 0, addedDate: '',
        },
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
  expect(endState[todolistID2][0].status).toBe(TaskStatuses.New)
})

test('status of specified task should be changed', () => {
  const action = changeTaskStatusAC(todolistID2, '2', TaskStatuses.New)
  const endState = tasksReducer(startState, action)

  expect(endState[todolistID1][1].status).toBe(TaskStatuses.Completed)
  expect(endState[todolistID2][1].status).toBe(TaskStatuses.New)
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