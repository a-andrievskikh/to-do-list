import React, { useState } from 'react'
import './App.css'
import { Todolist } from './Todolist'
import { v1 } from 'uuid'

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
export type FilterValuesType = 'all' | 'active' | 'completed';

export const App = () => {
  const [tasks, setTasks] = useState<TaskType[]>([
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'ReactJS', isDone: false },
    { id: v1(), title: 'Rest API', isDone: false },
    { id: v1(), title: 'GraphQL', isDone: false },
  ])

  const changeIsDone = (newId: string, newIsDone: boolean) => {
    setTasks(tasks.map(item => item.id === newId ? { ...item, isDone: newIsDone } : item))
  }

  const removeTask = (id: string) => setTasks(tasks.filter(t => t.id != id))
  const addTask = (title: string) => setTasks([{ id: v1(), title: title, isDone: false }, ...tasks])

  const [filter, setFilter] = useState<FilterValuesType>('all')

  const tasksForTodolist =
    filter === 'active' ? tasks.filter(t => !t.isDone)
      : filter === 'completed' ? tasks.filter(t => t.isDone)
        : tasks

  const changeFilter = (value: FilterValuesType) => setFilter(value)


  return (
    <div className="App">
      <Todolist title="What to learn"
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeIsDone={changeIsDone}
      />
    </div>
  )
}
