import React, { KeyboardEvent, ChangeEvent, FC, useState } from 'react'
import { FilterType, TaskType } from '../../App'

export type TodolistType = {
  title: string
  tasks: TaskType[]
  removeTask: (taskID: string) => void
  addTask: (taskTitle: string) => void
  changeFilter: (value: FilterType) => void
  changeTaskStatus: (taskID: string, newIsDone: boolean) => void
  filter: FilterType
}

export const Todolist: FC<TodolistType> = (props) => {

  const [taskTitle, setTaskTitle] = useState<string>('')
  const [error, setError] = useState<boolean>(false)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value)
  }

  const addTask = () => {
    if (taskTitle.trim()) {
      props.addTask(taskTitle.trim())
      setTaskTitle('')
    } else {
      setError(true)
    }
  }

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(false)
    if (e.key === 'Enter') {
      addTask()
    }
  }

  const onChangeFilter = (value: FilterType) => props.changeFilter(value)

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input className={error ? 'error' : ''}
               value={taskTitle}
               onChange={onChangeHandler}
               onKeyDown={onKeyDownHandler}
               placeholder={'Введи название таски'}
        />
        <button onClick={addTask}>+</button>
        <div className={'errorMessage'}>{error && 'Title is required!'}</div>
      </div>
      <ul>
        {
          props.tasks.map(task => {
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
              props.changeTaskStatus(task.id, e.currentTarget.checked)
            }
            const onClickHandler = () => props.removeTask(task.id)
            return (
              <li className={task.isDone ? 'isDone' : ''}
                  key={task.id}>
                <input type="checkbox"
                       checked={task.isDone}
                       onChange={onChangeHandler}
                />
                <span>{task.title}</span>
                <button onClick={onClickHandler}>x</button>
              </li>
            )
          })
        }
      </ul>
      <div>
        <button className={props.filter === 'all' ? 'isActive' : ''}
                onClick={() => onChangeFilter('all')}>All
        </button>
        <button className={props.filter === 'active' ? 'isActive' : ''}
                onClick={() => onChangeFilter('active')}>Active
        </button>
        <button className={props.filter === 'completed' ? 'isActive' : ''}
                onClick={() => onChangeFilter('completed')}>Completed
        </button>
      </div>
    </div>
  )
}