import {
  CREATE_TODOLIST,
  DELETE_TODOLIST,
  SET_TODOLISTS,
  createTodolistAC,
  deleteTodolistAC,
  setTodolistsAC,
} from './todolists-reducer'
import { TaskPriorities, tasksAPI, TaskStatuses, TaskType } from '../../api/tasks-api'
import { AppRootStateType, AppThunk } from '../../app/store'
import { setAppStatusAC } from '../../app/app-reducer'
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils'
import { ResultCodes } from '../../api/todolists-api'
import axios from 'axios'

export const DELETE_TASK = 'DELETE-TASK'
export const CREATE_TASK = 'CREATE-TASK'
export const UPDATE_TASK = 'UPDATE-TASK'
export const SET_TASKS = 'SET-TASKS'

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {
  switch (action.type) {
    case DELETE_TASK:
      return {
        ...state, [action.todolistID]: state[action.todolistID].filter(tl => tl.id !== action.taskID),
      }
    case CREATE_TASK:
      return { ...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]] }
    case UPDATE_TASK:
      return {
        ...state,
        [action.todolistID]: state[action.todolistID].map(t =>
          t.id === action.taskID ? { ...t, ...action.model } : t,
        ),
      }
    case DELETE_TODOLIST:
      const { [action.todolistID]: deletedItem, ...restItems } = state
      return restItems
    case CREATE_TODOLIST:
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
export const deleteTaskAC = (todolistID: string, taskID: string) => ({ type: DELETE_TASK, todolistID, taskID } as const)
export const createTaskAC = (task: TaskType) => ({ type: CREATE_TASK, task } as const)
export const updateTaskAC = (todolistID: string, taskID: string, model: UpdateDomainTaskModelType) =>
  ({ type: UPDATE_TASK, todolistID, taskID, model } as const)
export const setTasksAC = (todolistID: string, tasks: TaskType[]) => {
  return { type: SET_TASKS, todolistID, tasks } as const
}

// Thunks
export const getTasksTC = (todolistID: string): AppThunk => async dispatch => {
  dispatch(setAppStatusAC('loading'))
  const res = await tasksAPI.getTasks(todolistID)
  dispatch(setTasksAC(todolistID, res.data.items))
  dispatch(setAppStatusAC('succeeded'))
}
export const deleteTaskTC = (todolistID: string, taskID: string): AppThunk => async dispatch => {
  dispatch(setAppStatusAC('loading'))
  await tasksAPI.deleteTask(todolistID, taskID)
  dispatch(deleteTaskAC(todolistID, taskID))
  dispatch(setAppStatusAC('succeeded'))
}
export const createTaskTC = (todolistID: string, title: string): AppThunk => async dispatch => {
  dispatch(setAppStatusAC('loading'))
  try {
    const res = await tasksAPI.createTask(todolistID, title)
    if (res.data.resultCode === ResultCodes.Success) {
      dispatch(createTaskAC(res.data.data.item))
      dispatch(setAppStatusAC('succeeded'))
    } else {
      handleServerAppError(dispatch, res.data)
    }
  } catch (e) {
    if (axios.isAxiosError<ErrorType>(e)) {
      handleServerNetworkError(dispatch, e.message)
    } else {
      handleServerNetworkError(dispatch, (e as Error).message)
    }
  }
}
export const updateTaskTC = (todolistID: string, taskID: string, model: UpdateDomainTaskModelType): AppThunk => {
  return async (dispatch, getState: () => AppRootStateType) => {
    dispatch(setAppStatusAC('loading'))
    const task = getState().tasks[todolistID].find(t => t.id === taskID)
    if (!task) {
      console.warn('task not found in the state')
      return
    }
    try {
      const res = await tasksAPI.updateTask(todolistID, taskID, {
        title: task.title,
        status: task.status,
        deadline: task.deadline,
        startDate: task.startDate,
        priority: task.priority,
        description: task.description,
        ...model,
      })
      if (res.data.resultCode === ResultCodes.Success) {
        dispatch(updateTaskAC(todolistID, taskID, model))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        handleServerAppError(dispatch, res.data)
      }
    } catch (e: any) {
      handleServerNetworkError(dispatch, e)
    }
  }
}

// Types
export type TasksActionsType =
  | ReturnType<typeof setTasksAC>
  | ReturnType<typeof deleteTaskAC>
  | ReturnType<typeof createTaskAC>
  | ReturnType<typeof updateTaskAC>
  | ReturnType<typeof createTodolistAC>
  | ReturnType<typeof deleteTodolistAC>
  | ReturnType<typeof setTodolistsAC>

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

type ErrorType = {
  statusCode: 0,
  messages: [{
    message: string,
    field: string
  }],
  error: string
}

