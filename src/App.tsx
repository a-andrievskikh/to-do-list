import React, { useState } from 'react'
import './App.css'
import { Todolist } from './components/Todolist/Todolist'
import { v1 } from 'uuid'

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type FilterType = 'all' | 'active' | 'completed'

export const App = () => {

  const [tasks, setTasks] = useState<TaskType[]>([
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'ReactJS', isDone: false },
    { id: v1(), title: 'Rest API', isDone: false },
    { id: v1(), title: 'GraphQL', isDone: false },
  ])

  const [filter, setFilter] = useState<FilterType>('all')

  const removeTask = (taskID: string) => {
    setTasks(tasks.filter(t => t.id !== taskID))
  }

  const addTask = (taskTitle: string) => {
    setTasks([{ id: v1(), title: taskTitle, isDone: false }, ...tasks])
  }

  const tasksForTodolist: TaskType[] =
    filter === 'active' ? tasks.filter(t => !t.isDone)
      : filter === 'completed' ? tasks.filter(t => t.isDone)
        : tasks

  const changeFilter = (value: FilterType) => setFilter(value)

  const changeTaskStatus = (taskID: string, newIsDone: boolean) => {
    const task = tasks.find(task => task.id === taskID)
    if (task) task.isDone = newIsDone
    setTasks([...tasks])
  }

  return (
    <div className="App">
      <Todolist title={'What to learn'}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                addTask={addTask}
                changeFilter={changeFilter}
                changeTaskStatus={changeTaskStatus}
                filter={filter}
      />
    </div>
  )
}