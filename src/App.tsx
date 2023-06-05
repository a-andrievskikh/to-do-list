import React, { useState } from 'react'
import './App.css'
import { TaskType, Todolist } from './Todolist'
import { v1 } from 'uuid'

export type FilterValuesType = 'all' | 'active' | 'completed';

export const App = () => {

  let [tasks, setTasks] = useState([
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'ReactJS', isDone: false },
    { id: v1(), title: 'Rest API', isDone: false },
    { id: v1(), title: 'GraphQL', isDone: false },
  ])

  const addTask = (newTitle: string) => {
    const newTask: TaskType = { id: v1(), title: newTitle, isDone: false }
    setTasks([newTask, ...tasks])
    console.log(newTitle)
  }

  const removeTask = (id: string) => {
    let filteredTasks = tasks.filter(t => t.id !== id)
    setTasks(filteredTasks)
  }

  let [filter, setFilter] = useState<FilterValuesType>('all')

  let tasksForTodolist = tasks

  if (filter === 'active') {
    tasksForTodolist = tasks.filter(t => !t.isDone)
  }
  if (filter === 'completed') {
    tasksForTodolist = tasks.filter(t => !t.isDone)
  }

  const changeFilter = (value: FilterValuesType) => {
    setFilter(value)
  }

  return (
    <div className="App">
      <Todolist title="What to learn"
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
      />
    </div>
  )
}
