import axios from 'axios'

type TodolistType = {
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

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
})

export const todolistsAPI = {
  getTodolists() {
    return instance.get<TodolistType[]>('todo-lists/')
  },
  createTodolist(title: string) {
    return instance.post<ResponseType<{ items: TodolistType[] }>>('todo-lists/', { title })
  },
  deleteTodolist(todolistID: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistID}`)
  },
  updateTodolistTitle(todolistID: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${todolistID}`, { title })
  },
}