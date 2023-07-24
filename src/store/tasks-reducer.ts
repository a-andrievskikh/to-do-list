import { TasksStateType } from '../App'
import { AddTodolistActionType, RemoveTodolistActionType } from './todolists-reducer'

type RemoveTaskActionType = {
  type: 'REMOVE-TASK'
  taskID: string
  todolistID: string
}
type AddTaskActionType = {
  type: 'ADD-TASK'
  taskTitle: string
  todolistID: string
}
type ChangeTaskStatusActionType = {
  type: 'CHANGE-TASK-STATUS'
  taskID: string
  todolistID: string
  newIsDone: boolean
}
type ChangeTaskTitleActionType = {
  type: 'CHANGE-TASK-TITLE'
  taskID: string
  newTaskTitle: string
  todolistID: string
}

type ActionsType =
  RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASK':
      return { ...state, [action.todolistID]: state[action.todolistID].filter(tl => tl.id !== action.taskID) }
    case 'ADD-TASK':
      return {
        ...state,
        [action.todolistID]: [{
          id: action.todolistID,
          title: action.taskTitle,
          isDone: false,
        }, ...state[action.todolistID]],
      }
    case 'CHANGE-TASK-STATUS':
      return {
        ...state,
        [action.todolistID]: state[action.todolistID].map(t => {
          return t.id === action.taskID ? { ...t, isDone: action.newIsDone } : t
        }),
      }
    case 'CHANGE-TASK-TITLE':
      return {
        ...state,
        [action.todolistID]: state[action.todolistID].map(t => {
          return t.id === action.taskID ? { ...t, title: action.newTaskTitle } : t
        }),
      }
    case 'ADD-TODOLIST':
      return { [action.todolistID]: [], ...state }
    case 'REMOVE-TODOLIST':
      const { [action.id]: deletedItem, ...restItems } = state
      return restItems
    default:
      throw new Error(`I don't understand this action type!`)
  }
}

export const removeTaskAC = (taskID: string, todolistID: string): RemoveTaskActionType => {
  return { type: 'REMOVE-TASK', taskID, todolistID }
}
export const addTaskAC = (taskTitle: string, todolistID: string): AddTaskActionType => {
  return { type: 'ADD-TASK', taskTitle, todolistID }
}
export const changeTaskStatusAC = (taskID: string, newIsDone: boolean, todolistID: string): ChangeTaskStatusActionType => {
  return { type: 'CHANGE-TASK-STATUS', taskID, newIsDone, todolistID }
}
export const changeTaskTitleAC = (taskID: string, newTaskTitle: string, todolistID: string): ChangeTaskTitleActionType => {
  return { type: 'CHANGE-TASK-TITLE', taskID, newTaskTitle, todolistID }
}