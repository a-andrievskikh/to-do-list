import { instance } from './basic'

// API
export const tasksAPI = {
  getTasks(todolistID: string) {
    return instance.get<GetTasksResponseType>(`todo-lists/${todolistID}/tasks`)
  },
  createTask(todolistID: string, taskTitle: string) {
    return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistID}/tasks`, { title: taskTitle })
  },
  deleteTask(todolistID: string, taskID: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistID}/tasks/${taskID}`)
  },
  updateTask(todolistID: string, taskID: string, model: UpdateTaskModelType) {
    return instance.put<ResponseType>(`todo-lists/${todolistID}/tasks/${taskID}`, model)
  },
}

// Types
export type TaskType = {
  todoListId: string
  id: string
  title: string
  status: TaskStatuses
  description: string
  priority: TaskPriorities
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
export type UpdateTaskModelType = {
  title: string
  description: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
}
export type ResponseType<D = {}> = {
  data: D
  resultCode: number
  messages: string[]
}

export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Dragt = 3
}

export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  High = 2,
  Urgently = 3,
  Later = 4
}