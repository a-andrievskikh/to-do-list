import {
  ADD_TODOLIST,
  addTodolistAC,
  REMOVE_TODOLIST,
  removeTodolistAC,
  SET_TODOLISTS,
  setTodolistsAC,
} from './todolists-reducer'
import { TaskPriorities, tasksAPI, TaskStatuses, TaskType } from '../../api/tasks-api'
import { Dispatch } from 'redux'
import { AppRootStateType } from '../../app/store'

export const REMOVE_TASK = 'REMOVE-TASK'
export const ADD_TASK = 'ADD-TASK'
export const UPDATE_TASK = 'UPDATE-TASK'
export const SET_TASKS = 'SET-TASKS'

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case REMOVE_TASK:
      return {
        ...state, [action.todolistID]: state[action.todolistID].filter(tl => tl.id !== action.taskID),
      }
    case ADD_TASK:
      return { ...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]] }
    case UPDATE_TASK:
      return {
        ...state,
        [action.todolistID]: state[action.todolistID].map(t => {
          return t.id === action.taskID ? { ...t, ...action.model } : t
        }),
      }
    case REMOVE_TODOLIST:
      const { [action.todolistID]: deletedItem, ...restItems } = state
      return restItems
    case ADD_TODOLIST:
      return { ...state, [action.todolist.id]: [] }
    case SET_TODOLISTS: {
      return action.todolists
        .reduce((copy, tl) =>
          ({ ...copy, [tl.id]: [] }), { ...state })
    }
    case SET_TASKS: {
      return { ...state, [action.todolistID]: action.tasks }
    }
    default:
      return state
  }
}

// Actions
export const removeTaskAC = (todolistID: string, taskID: string) => ({ type: REMOVE_TASK, todolistID, taskID } as const)
export const addTaskAC = (task: TaskType) => ({ type: ADD_TASK, task } as const)
export const updateTaskAC = (todolistID: string, taskID: string, model: UpdateDomainTaskModelType) =>
  ({ type: UPDATE_TASK, todolistID, taskID, model } as const)
export const setTasksAC = (todolistID: string, tasks: TaskType[]) => {
  return { type: SET_TASKS, todolistID, tasks } as const
}

// Thunks
export const getTasksTC = (todolistID: string) => (dispatch: Dispatch<ActionsType>) => {
  tasksAPI.getTasks(todolistID)
    .then(res => dispatch(setTasksAC(todolistID, res.data.items)))
}
export const removeTaskTC = (todolistID: string, taskID: string) => {
  return (dispatch: Dispatch<ActionsType>) => {
    tasksAPI.deleteTask(todolistID, taskID)
      .then(() => dispatch(removeTaskAC(todolistID, taskID)))
  }
}
export const addTaskTC = (todolistID: string, title: string) => {
  return (dispatch: Dispatch<ActionsType>) => {
    tasksAPI.createTask(todolistID, title)
      .then((res) => dispatch(addTaskAC(res.data.data.item)))
  }
}
export const updateTaskTC = (todolistID: string, taskID: string, model: UpdateDomainTaskModelType) => {
  return (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
    const task = getState().tasks[todolistID].find(t => t.id === taskID)
    if (task) {
      tasksAPI.updateTask(todolistID, taskID, {
        title: task.title,
        status: task.status,
        deadline: task.deadline,
        startDate: task.startDate,
        priority: task.priority,
        description: task.description,
        ...model,
      })
        .then(() =>
          dispatch(updateTaskAC(todolistID, taskID, model)))
    } else {
      console.warn('Task not found in the state')
      return
    }
  }
}

// Types
type ActionsType =
  ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof updateTaskAC>
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof removeTodolistAC>
  | ReturnType<typeof setTodolistsAC>
  | ReturnType<typeof setTasksAC>

export type TasksStateType = {
  [key: string]: TaskType[]
}

type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}

