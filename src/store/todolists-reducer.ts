import { FilterType, TodolistType } from '../App'
import { v1 } from 'uuid'

export type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST'
  id: string
}
export type AddTodolistActionType = {
  type: 'ADD-TODOLIST'
  title: string
  todolistID: string
}
type ChangeTodolistTitleActionType = {
  type: 'CHANGE-TODOLIST-TITLE'
  id: string
  title: string
}
type ChangeTodolistFilterActionType = {
  type: 'CHANGE-TODOLIST-FILTER'
  id: string
  filter: FilterType
}

type ActionsType = RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType

export const todolistsReducer = (state: TodolistType[], action: ActionsType): TodolistType[] => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter(tl => tl.id !== action.id)
    case 'ADD-TODOLIST':
      return [{ id: action.todolistID, title: action.title, filter: 'all' }, ...state]
    case 'CHANGE-TODOLIST-TITLE':
      return state.map(tl => tl.id === action.id ? { ...tl, title: action.title } : tl)
    case 'CHANGE-TODOLIST-FILTER':
      return state.map(tl => tl.id === action.id ? { ...tl, filter: action.filter } : tl)
    default:
      throw new Error(`I don't understand this action type!`)
  }
}

export const removeTodolistAC = (todolistID: string): RemoveTodolistActionType => {
  return { type: 'REMOVE-TODOLIST', id: todolistID }
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
  return { type: 'ADD-TODOLIST', title, todolistID: v1() }
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
  return { type: 'CHANGE-TODOLIST-TITLE', id, title }
}
export const changeTodolistFilterAC = (id: string, filter: FilterType): ChangeTodolistFilterActionType => {
  return { type: 'CHANGE-TODOLIST-FILTER', id, filter }
}