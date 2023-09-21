import { todolistsAPI, TodolistType } from '../../api/todolists-api'
import { Dispatch } from 'redux'

export const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
export const ADD_TODOLIST = 'ADD-TODOLIST'
export const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE'
export const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER'
export const SET_TODOLISTS = 'SET-TODOLISTS'

const initialState: TodolistDomainType[] = []

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: ActionsType): TodolistDomainType[] => {
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
export const getTodolistsTC = () => (dispatch: Dispatch<ActionsType>) => {
  todolistsAPI.getTodolists()
    .then(res => dispatch(setTodolistsAC(res.data)))
}
export const removeTodolistTC = (todolistID: string) => (dispatch: Dispatch<ActionsType>) => {
  todolistsAPI.deleteTodolist(todolistID)
    .then(() => dispatch(removeTodolistAC(todolistID)))
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch<ActionsType>) => {
  todolistsAPI.createTodolist(title)
    .then((res) => dispatch(addTodolistAC(res.data.data.item)))
}
export const changeTodolistTC = (todolistID: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
  todolistsAPI.updateTodolistTitle(todolistID, title)
    .then(() => dispatch(changeTodolistTitleAC(todolistID, title)))
}

// Types
type ActionsType = ReturnType<typeof removeTodolistAC>
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof changeTodolistFilterAC>
  | ReturnType<typeof setTodolistsAC>

export type FilterType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
  filter: FilterType
}