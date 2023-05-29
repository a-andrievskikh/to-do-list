import React, { useState } from 'react'
// import { ButtonType } from './App'

type ButtonType = 'All' | 'Active' | 'Completed'

type TaskType = {
  id: number
  title: string
  isDone: boolean
}

type TodoListPropsType = {
  title: string
  tasks: TaskType[]
  removeTask: (taskId: number) => void
  // filterTask: (buttonValue: ButtonType) => void
}

export const TodoList = (props: TodoListPropsType) => {

  const [filterButton, setButton] = useState<ButtonType>('All')

  const filterTask = (buttonValue: ButtonType) => {
    setButton(buttonValue)
  }

  const filterTasksArr = () => {
    let filteredTasks = props.tasks

    return filterButton === 'Active' ? props.tasks.filter(item => !item.isDone)
      : filterButton === 'Completed' ? props.tasks.filter(item => item.isDone)
        : filteredTasks

    //
    // if (filterButton === 'Active') {
    //   filteredTasks = props.tasks.filter(item => !item.isDone)
    //   return filteredTasks
    // }
    // if (filterButton === 'Completed') {
    //   filteredTasks = props.tasks.filter(item => item.isDone)
    //   return filteredTasks
    // }
    // return filteredTasks
  }

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input />
      </div>
      <ul>
        {filterTasksArr().map(task => {
          return (
            <li key={task.id}>
              <input type="checkbox" checked={task.isDone} />
              <span>{task.title}</span>
              <button onClick={() => props.removeTask(task.id)}>X</button>
            </li>
          )
        })
        }
      </ul>
      <div>
        <button onClick={() => {filterTask('All')}}>All</button>
        <button onClick={() => {filterTask('Active')}}>Active</button>
        <button onClick={() => {filterTask('Completed')}}>Completed</button>
      </div>
    </div>
  )
}
