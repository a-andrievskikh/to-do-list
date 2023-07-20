import React, { KeyboardEvent, ChangeEvent, FC, useState } from 'react'
import { FilterType, TaskType } from '../../App'

export type TodolistType = {
  title: string
  tasks: TaskType[]
  removeTask: (taskID: string) => void
  addTask: (taskTitle: string) => void
  changeFilter: (value: FilterType) => void
}

export const Todolist: FC<TodolistType> = (props) => {

  const [taskTitle, setTaskTitle] = useState<string>('')

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value)
  }

  const addTask = () => {
    props.addTask(taskTitle)
    setTaskTitle('')
  }

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTask()
    }
  }

  const onChangeFilter = (value: FilterType) => props.changeFilter(value)

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input value={taskTitle}
               onChange={onChangeHandler}
               onKeyDown={onKeyDownHandler}
               placeholder={'Введи название таски'}
        />
        <button onClick={addTask}>+</button>
      </div>
      <ul>
        {
          props.tasks.map(task => {
            const onClickHandler = () => props.removeTask(task.id)
            return (
              <li key={task.id}>
                <input type="checkbox" checked={task.isDone} />
                <span>{task.title}</span>
                <button onClick={onClickHandler}>x</button>
              </li>
            )
          })
        }
      </ul>
      <div>
        <button onClick={() => onChangeFilter('all')}>All</button>
        <button onClick={() => onChangeFilter('active')}>Active</button>
        <button onClick={() => onChangeFilter('completed')}>Completed</button>
      </div>
    </div>
  )
}