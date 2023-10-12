import { instance } from './basic'
import { ResponseT } from './common-types'

// API
export const tasksAPI = {
  getTasks(todolistID: string) {
    return instance.get<GetTasksResponseT>(`todo-lists/${todolistID}/tasks`)
  },
  createTask(todolistID: string, taskTitle: string) {
    return instance.post<ResponseT<{ item: TaskT }>>(`todo-lists/${todolistID}/tasks`, { title: taskTitle })
  },
  deleteTask(todolistID: string, taskID: string) {
    return instance.delete<ResponseT>(`todo-lists/${todolistID}/tasks/${taskID}`)
  },
  updateTask(todolistID: string, taskID: string, model: UpdateTaskModelT) {
    return instance.put<ResponseT>(`todo-lists/${todolistID}/tasks/${taskID}`, model)
  },
}

// Types
export type TaskT = {
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
type GetTasksResponseT = {
  totalCount: number
  error: string | null
  items: TaskT[]
}
export type UpdateTaskModelT = {
  title: string
  description: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
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