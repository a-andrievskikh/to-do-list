import { v1 } from 'uuid'
import { TodolistType } from '../api/todolists-api'

export const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
export const ADD_TODOLIST = 'ADD-TODOLIST'
export const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE'
export const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER'

type ActionsType = ReturnType<typeof removeTodolistAC>
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof changeTodolistFilterAC>

const initialState: TodolistDomainType[] = []
export type FilterType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
  filter: FilterType
}

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: ActionsType): TodolistDomainType[] => {
  switch (action.type) {
    case REMOVE_TODOLIST:
      return state.filter(tl => tl.id !== action.todolistID)
    case ADD_TODOLIST:
      return [{ id: action.todolistID, title: action.todolistTitle, filter: 'all', addedDate: '', order: 0 }, ...state]
    case CHANGE_TODOLIST_TITLE:
      return state.map(tl => tl.id === action.todolistID ? { ...tl, title: action.newTitle } : tl)
    case CHANGE_TODOLIST_FILTER:
      return state.map(tl => tl.id === action.todolistID ? { ...tl, filter: action.filterValue } : tl)
    default:
      return state
  }
}

export const removeTodolistAC = (todolistID: string) =>
  ({ type: REMOVE_TODOLIST, todolistID } as const)

export const addTodolistAC = (todolistTitle: string) =>
  ({ type: ADD_TODOLIST, todolistID: v1(), todolistTitle } as const)

export const changeTodolistTitleAC = (todolistID: string, newTitle: string) =>
  ({ type: CHANGE_TODOLIST_TITLE, todolistID, newTitle } as const)

export const changeTodolistFilterAC = (todolistID: string, filterValue: FilterType) =>
  ({ type: CHANGE_TODOLIST_FILTER, todolistID, filterValue } as const)