import { FilterType, TodolistType } from '../AppWithRedux'
import { v1 } from 'uuid'

export const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
export const ADD_TODOLIST = 'ADD-TODOLIST'
export const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE'
export const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER'

type ActionsType = ReturnType<typeof removeTodolistAC>
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof changeTodolistFilterAC>

const initialState: TodolistType[] = []

export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsType): TodolistType[] => {
  switch (action.type) {
    case REMOVE_TODOLIST:
      return state.filter(tl => tl.id !== action.todolistID)
    case ADD_TODOLIST:
      return [{ id: action.todolistID, title: action.todolistTitle, filter: 'all' }, ...state]
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