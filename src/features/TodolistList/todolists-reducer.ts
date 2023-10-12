import { ResultCodes, todolistsAPI, TodolistType } from '../../api/todolists-api'
import { AppThunk } from '../../app/store'
import { RequestStatusT, setAppStatusAC } from '../../app/app-reducer'
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils'
import axios from 'axios'
import { getTasksTC } from './tasks-reducer'

export const DELETE_TODOLIST = 'DELETE-TODOLIST'
export const CREATE_TODOLIST = 'CREATE-TODOLIST'
export const UPDATE_TODOLIST_TITLE = 'UPDATE-TODOLIST-TITLE'
export const UPDATE_TODOLIST_FILTER = 'UPDATE-TODOLIST-FILTER'
export const UPDATE_TODOLIST_ENTITY_STATUS = 'UPDATE-TODOLIST-ENTITY-STATUS'
export const SET_TODOLISTS = 'SET-TODOLISTS'
export const CLEAR_DATA = 'CLEAR-DATA'

const initialState: TodolistDomainT[] = []

export const todolistsReducer = (state: TodolistDomainT[] = initialState, action: TodolistActionsT): TodolistDomainT[] => {
  switch (action.type) {
    case SET_TODOLISTS:
      return action.todolists.map(tl => ({ ...tl, filter: 'all', entityStatus: 'idle' }))
    case DELETE_TODOLIST:
      return state.filter(tl => tl.id !== action.todolistID)
    case CREATE_TODOLIST:
      return [{ ...action.todolist, filter: 'all', entityStatus: 'idle' }, ...state]
    case UPDATE_TODOLIST_TITLE:
      return state.map(tl => tl.id === action.todolistID ? { ...tl, title: action.newTitle } : tl)
    case UPDATE_TODOLIST_FILTER:
      return state.map(tl => tl.id === action.todolistID ? { ...tl, filter: action.filterValue } : tl)
    case UPDATE_TODOLIST_ENTITY_STATUS:
      return state.map(tl => tl.id === action.todolistID ? { ...tl, entityStatus: action.status } : tl)
    case CLEAR_DATA:
      return []
    default:
      return state
  }
}

// Actions
export const deleteTodolistAC = (todolistID: string) => ({ type: DELETE_TODOLIST, todolistID } as const)
export const createTodolistAC = (todolist: TodolistType) => ({ type: CREATE_TODOLIST, todolist } as const)
export const updateTodolistTitleAC = (todolistID: string, newTitle: string) =>
  ({ type: UPDATE_TODOLIST_TITLE, todolistID, newTitle } as const)
export const updateTodolistFilterAC = (todolistID: string, filterValue: FilterT) =>
  ({ type: UPDATE_TODOLIST_FILTER, todolistID, filterValue } as const)
export const updateTodolistEntityStatusAC = (todolistID: string, status: RequestStatusT) =>
  ({ type: UPDATE_TODOLIST_ENTITY_STATUS, todolistID, status } as const)
export const setTodolistsAC = (todolists: TodolistType[]) => ({ type: SET_TODOLISTS, todolists } as const)
export const clearDataAC = () => ({ type: CLEAR_DATA } as const)

// Thunks
export const getTodolistsTC = (): AppThunk => async dispatch => {
  try {
    const res = await todolistsAPI.getTodolists()
    dispatch(setTodolistsAC(res.data))
    dispatch(setAppStatusAC('succeeded'))
    res.data.forEach(tl => dispatch(getTasksTC(tl.id)))
  } catch (e) {
    if (axios.isAxiosError<ErrorT>(e)) {
      handleServerNetworkError(dispatch, e.message)
    } else {
      handleServerNetworkError(dispatch, (e as Error).message)
    }
  }
}
export const deleteTodolistTC = (todolistID: string): AppThunk => async dispatch => {
  dispatch(setAppStatusAC('loading'))
  dispatch(updateTodolistEntityStatusAC(todolistID, 'loading'))
  try {
    const res = await todolistsAPI.deleteTodolist(todolistID)
    if (res.data.resultCode === ResultCodes.Success) {
      dispatch(deleteTodolistAC(todolistID))
      dispatch(setAppStatusAC('succeeded'))
    } else {
      handleServerAppError(dispatch, res.data)
    }
  } catch (e) {
    if (axios.isAxiosError<ErrorT>(e)) {
      handleServerNetworkError(dispatch, e.message)
    } else {
      handleServerNetworkError(dispatch, (e as Error).message)
    }
  }
}
export const createTodolistTC = (title: string): AppThunk => async dispatch => {
  dispatch(setAppStatusAC('loading'))
  try {
    const res = await todolistsAPI.createTodolist(title)
    if (res.data.resultCode === ResultCodes.Success) {
      dispatch(createTodolistAC(res.data.data.item))
      dispatch(setAppStatusAC('succeeded'))
    } else {
      handleServerAppError(dispatch, res.data)
    }
  } catch (e) {
    if (axios.isAxiosError<ErrorT>(e)) {
      handleServerNetworkError(dispatch, e.message)
    } else {
      handleServerNetworkError(dispatch, (e as Error).message)
    }
  }
}
export const updateTodolistTC = (todolistID: string, title: string): AppThunk => async dispatch => {
  dispatch(setAppStatusAC('loading'))
  try {
    await todolistsAPI.updateTodolistTitle(todolistID, title)
    dispatch(updateTodolistTitleAC(todolistID, title))
    dispatch(setAppStatusAC('succeeded'))
  } catch (e) {
    if (axios.isAxiosError<ErrorT>(e)) {
      handleServerNetworkError(dispatch, e.message)
    } else {
      handleServerNetworkError(dispatch, (e as Error).message)
    }
  }
}

// Actions
export type TodolistActionsT =
  | ReturnType<typeof deleteTodolistAC>
  | ReturnType<typeof createTodolistAC>
  | ReturnType<typeof updateTodolistTitleAC>
  | ReturnType<typeof updateTodolistFilterAC>
  | ReturnType<typeof updateTodolistEntityStatusAC>
  | ReturnType<typeof setTodolistsAC>
  | ReturnType<typeof clearDataAC>

export type FilterT = 'all' | 'active' | 'completed'
export type TodolistDomainT = TodolistType & {
  filter: FilterT
  entityStatus: RequestStatusT
}

type ErrorT = {
  statusCode: 0,
  messages: [{
    message: string,
    field: string
  }],
  error: string
}