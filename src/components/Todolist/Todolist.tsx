import React, { FC } from 'react'
import { FilterType, TaskType } from '../../App'
import { validate } from 'uuid/index'

export type TodolistType = {
  title: string
  tasks: TaskType[]
  removeTask: (taskID: number) => void
  changeFilter: (value: FilterType) => void
}

export const Todolist: FC<TodolistType> = (props) => {

  const onChangeFilter = (value: FilterType) => props.changeFilter(value)

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input />
        <button>+</button>
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