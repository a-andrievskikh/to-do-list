import React, { KeyboardEvent, ChangeEvent, FC, useState } from 'react'
import { FilterType, TaskType } from '../../App'

export type TodolistType = {
  id: string
  title: string
  filter: FilterType
  tasks: TaskType[]
  removeTask: (todolistID: string, taskID: string) => void
  addTask: (todolistID: string, taskTitle: string) => void
  changeFilter: (todolistID: string, value: FilterType) => void
  changeTaskStatus: (todolistID: string, taskID: string, newIsDone: boolean) => void
  removeTodolist: (todolistID: string) => void
}

export const Todolist: FC<TodolistType> = (props) => {

  const [taskTitle, setTaskTitle] = useState<string>('')
  const [error, setError] = useState<boolean>(false)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value)
  }

  const addTask = () => {
    if (taskTitle.trim()) {
      props.addTask(props.id, taskTitle.trim())
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

  const onChangeFilterHandler = (value: FilterType) => props.changeFilter(props.id, value)
  const onRemoveTodolistHandler = () => props.removeTodolist(props.id)

  return (
    <div>
      <h3>
        {props.title}
        <button onClick={onRemoveTodolistHandler}>x</button>
      </h3>
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
              props.changeTaskStatus(props.id, task.id, e.currentTarget.checked)
            }
            const onClickHandler = () => props.removeTask(props.id, task.id)
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
                onClick={() => onChangeFilterHandler('all')}>All
        </button>
        <button className={props.filter === 'active' ? 'isActive' : ''}
                onClick={() => onChangeFilterHandler('active')}>Active
        </button>
        <button className={props.filter === 'completed' ? 'isActive' : ''}
                onClick={() => onChangeFilterHandler('completed')}>Completed
        </button>
      </div>
    </div>
  )
}