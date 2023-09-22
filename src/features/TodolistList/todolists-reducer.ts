import { todolistsAPI, TodolistType } from '../../api/todolists-api'
import { AppThunk } from '../../app/store'

export const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
export const ADD_TODOLIST = 'ADD-TODOLIST'
export const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE'
export const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER'
export const SET_TODOLISTS = 'SET-TODOLISTS'

const initialState: TodolistDomainType[] = []

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: TodolistActionsType): TodolistDomainType[] => {
  switch (action.type) {
    case SET_TODOLISTS:
      return action.todolists.map(tl => ({ ...tl, filter: 'all' }))
    case REMOVE_TODOLIST:
      return state.filter(tl => tl.id !== action.todolistID)
    case ADD_TODOLIST:
      return [{ ...action.todolist, filter: 'all' }, ...state]
    case CHANGE_TODOLIST_TITLE:
      return state.map(tl => tl.id === action.todolistID ? { ...tl, title: action.newTitle } : tl)
    case CHANGE_TODOLIST_FILTER:
      return state.map(tl => tl.id === action.todolistID ? { ...tl, filter: action.filterValue } : tl)
    default:
      return state
  }
}

// Actions
export const removeTodolistAC = (todolistID: string) => ({ type: REMOVE_TODOLIST, todolistID } as const)
export const addTodolistAC = (todolist: TodolistType) => ({ type: ADD_TODOLIST, todolist } as const)
export const changeTodolistTitleAC = (todolistID: string, newTitle: string) =>
  ({ type: CHANGE_TODOLIST_TITLE, todolistID, newTitle } as const)
export const changeTodolistFilterAC = (todolistID: string, filterValue: FilterType) =>
  ({ type: CHANGE_TODOLIST_FILTER, todolistID, filterValue } as const)
export const setTodolistsAC = (todolists: TodolistType[]) => ({ type: SET_TODOLISTS, todolists } as const)

// Thunks
export const getTodolistsTC = (): AppThunk => async dispatch => {
  const res = await todolistsAPI.getTodolists()
  dispatch(setTodolistsAC(res.data))
}
export const removeTodolistTC = (todolistID: string): AppThunk => async dispatch => {
  await todolistsAPI.deleteTodolist(todolistID)
  dispatch(removeTodolistAC(todolistID))
}
export const addTodolistTC = (title: string): AppThunk => async dispatch => {
  const res = await todolistsAPI.createTodolist(title)
  dispatch(addTodolistAC(res.data.data.item))
}
export const changeTodolistTC = (todolistID: string, title: string): AppThunk => async dispatch => {
  await todolistsAPI.updateTodolistTitle(todolistID, title)
  dispatch(changeTodolistTitleAC(todolistID, title))
}

// Types
export type TodolistActionsType = ReturnType<typeof removeTodolistAC>
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof changeTodolistFilterAC>
  | ReturnType<typeof setTodolistsAC>

export type FilterType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
  filter: FilterType
}