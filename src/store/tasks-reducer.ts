import { TasksStateType } from '../AppWithRedux'
import { ADD_TODOLIST, REMOVE_TODOLIST, addTodolistAC, removeTodolistAC } from './todolists-reducer'
import { v1 } from 'uuid'

export const REMOVE_TASK = 'REMOVE-TASK'
export const ADD_TASK = 'ADD-TASK'
export const CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS'
export const CHANGE_TASK_TITLE = 'CHANGE-TASK-TITLE'

type ActionsType =
  ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof changeTaskStatusAC>
  | ReturnType<typeof changeTaskTitleAC>
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof removeTodolistAC>

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case REMOVE_TASK:
      return {
        ...state,
        [action.todolistID]: state[action.todolistID].filter(tl => tl.id !== action.taskID),
      }
    case ADD_TASK:
      return {
        ...state,
        [action.todolistID]: [
          { id: v1(), title: action.taskTitle, isDone: false }, ...state[action.todolistID],
        ],
      }
    case CHANGE_TASK_STATUS:
      return {
        ...state,
        [action.todolistID]: state[action.todolistID].map(t => {
          return t.id === action.taskID ? { ...t, isDone: action.newIsDone } : t
        }),
      }
    case CHANGE_TASK_TITLE:
      return {
        ...state,
        [action.todolistID]: state[action.todolistID].map(t => {
          return t.id === action.taskID ? { ...t, title: action.newTaskTitle } : t
        }),
      }
    case REMOVE_TODOLIST:
      const { [action.todolistID]: deletedItem, ...restItems } = state
      return restItems
    case ADD_TODOLIST:
      return { ...state, [action.todolistID]: [] }
    default:
      return state
  }
}

export const removeTaskAC = (todolistID: string, taskID: string) =>
  ({ type: REMOVE_TASK, todolistID, taskID } as const)

export const addTaskAC = (todolistID: string, taskTitle: string) =>
  ({ type: ADD_TASK, todolistID, taskTitle } as const)

export const changeTaskStatusAC = (todolistID: string, taskID: string, newIsDone: boolean) =>
  ({ type: CHANGE_TASK_STATUS, todolistID, taskID, newIsDone } as const)

export const changeTaskTitleAC = (todolistID: string, taskID: string, newTaskTitle: string) =>
  ({ type: CHANGE_TASK_TITLE, todolistID, taskID, newTaskTitle } as const)