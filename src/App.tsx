import React, { useState } from 'react'
import './App.css'
import { Todolist } from './components/Todolist/Todolist'

export type TaskType = {
  id: number
  title: string
  isDone: boolean
}

export type FilterType = 'all' | 'active' | 'completed'

export const App = () => {

  const [tasks, setTasks] = useState<TaskType[]>([
    { id: 1, title: 'HTML&CSS', isDone: true },
    { id: 2, title: 'JS', isDone: true },
    { id: 3, title: 'ReactJS', isDone: false },
    { id: 4, title: 'Rest API', isDone: false },
    { id: 5, title: 'GraphQL', isDone: false },
  ])

  const [filter, setFilter] = useState<FilterType>('all')

  const removeTask = (taskID: number) => {
    setTasks(tasks.filter(t => t.id !== taskID))
  }

  const tasksForTodolist: TaskType[] =
    filter === 'active' ? tasks.filter(t => !t.isDone)
      : filter === 'completed' ? tasks.filter(t => t.isDone)
        : tasks

  const changeFilter = (value: FilterType) => setFilter(value)

  return (
    <div className="App">
      <Todolist title={'What to learn'}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
      />
    </div>
  )
}