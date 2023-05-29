import React, { useState } from 'react'
import './App.css'
import { TodoList } from './TodoList'

export type ButtonType = 'All' | 'Active' | 'Completed'

export const App = () => {

  const title = `What to learn`

  /*let tasks = [
    { id: 1, title: 'HTML&CSS', isDone: true },
    { id: 2, title: 'JS', isDone: true },
    { id: 3, title: 'ReactJS', isDone: false },
  ]*/

  let [tasks, setTasks] = useState([
    { id: 1, title: 'HTML&CSS', isDone: true },
    { id: 2, title: 'JS', isDone: true },
    { id: 3, title: 'ReactJS', isDone: false },
  ])

  const removeTask = (taskId: number) => {
    setTasks(tasks.filter(item => item.id !== taskId))
  }

  /*const [filterButton, setButton] = useState<ButtonType>('All')
  const filterTask = (buttonValue: ButtonType) => {
    setButton(buttonValue)
  }

  const filterTasksArr = () => {
    let filteredTasks = tasks

    return filterButton === 'Active' ? tasks.filter(item => !item.isDone)
      : filterButton === 'Completed' ? tasks.filter(item => item.isDone)
        : filteredTasks

    /!*
        if (filterButton === 'Active') {
          filteredTasks = props.tasks.filter(item => !item.isDone)
          return filteredTasks
        }
        if (filterButton === 'Completed') {
          filteredTasks = props.tasks.filter(item => item.isDone)
          return filteredTasks
        }
        return filteredTasks*!/
  }*/

  /*let filteredTasks = tasks
  if (filterButton === 'Active') {
    filteredTasks = tasks.filter(item => !item.isDone)
  }
  if (filterButton === 'Completed') {
    filteredTasks = tasks.filter(item => item.isDone)
  }*/

  return (
    <div className="App" style={{ backgroundColor: 'darkcyan' }}>
      <TodoList
        title={title}
        tasks={tasks}
        removeTask={removeTask}
        // filterTask={filterTask}
      />
    </div>
  )
}

