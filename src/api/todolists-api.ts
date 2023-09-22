import { instance } from './basic'

// API
export const todolistsAPI = {
  getTodolists() {
    return instance.get<TodolistType[]>('todo-lists/')
  },
  createTodolist(title: string) {
    return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists/', { title })
  },
  deleteTodolist(todolistID: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistID}`)
  },
  updateTodolistTitle(todolistID: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${todolistID}`, { title })
  },
}

// Types
export type TodolistType = {
  id: string
  title: string
  addedDate: string
  order: number
}
type ResponseType<D = {}> = {
  data: D
  resultCode: number
  messages: string[]
}