import axios from 'axios'

export type TaskType = {
  todoListId: string
  id: string
  title: string
  status: number
  description: string
  priority: number
  startDate: string
  deadline: string
  order: number
  addedDate: string
}

type GetTasksResponseType = {
  totalCount: number
  error: string | null
  items: TaskType[]
}

type UpdateTaskTitleType = {
  title: string
  description: string
  completed: boolean
  status: number
  priority: number
  startDate: string
  deadline: string
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

export const tasksAPI = {
  getTasks(todolistID: string) {
    return instance.get<GetTasksResponseType>(`todo-lists/${todolistID}/tasks`)
  },
  createTask(todolistID: string, title: string) {
    return instance.post<ResponseType<{ items: TaskType[] }>>(`todo-lists/${todolistID}/tasks`, { title })
  },
  deleteTask(todolistID: string, taskID: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistID}/tasks/${taskID}`)
  },
  updateTaskTitle(todolistID: string, taskID: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${todolistID}/tasks/${taskID}`, { taskID, title })
  },
}