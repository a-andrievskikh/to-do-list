import React, { ChangeEvent, FC } from 'react'
import { FilterType, TaskType } from '../../App'
import { ItemForm } from './ItemForm'
import { EditableSpan } from './EditableSpan'

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
  changeTaskTitle: (todolistID: string, taskID: string, newTitle: string) => void
  changeTodolistTitle: (todolistID: string, newTitle: string) => void
}

export const Todolist: FC<TodolistType> = (props) => {
  const addTask = (title: string) => {
    props.addTask(props.id, title)
  }
  const onChangeTodolistTitle = (value: string) => {
    props.changeTodolistTitle(props.id, value)
  }
  const onChangeFilterHandler = (value: FilterType) => props.changeFilter(props.id, value)
  const onRemoveTodolistHandler = () => props.removeTodolist(props.id)

  return (
    <div>
      <h3>
        <EditableSpan value={props.title} onChange={onChangeTodolistTitle} />
        <button onClick={onRemoveTodolistHandler}>x</button>
      </h3>
      <ItemForm addItem={addTask} />
      <ul>
        {
          props.tasks.map(task => {
            const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
              props.changeTaskStatus(props.id, task.id, e.currentTarget.checked)
            }
            const onClickHandler = () => props.removeTask(props.id, task.id)
            const onChangeTitleHandler = (value: string) => {
              props.changeTaskTitle(props.id, task.id, value)
            }
            return (
              <li className={task.isDone ? 'isDone' : ''}
                  key={task.id}>
                <input type="checkbox"
                       checked={task.isDone}
                       onChange={onChangeStatusHandler}
                />
                <EditableSpan value={task.title}
                              onChange={onChangeTitleHandler}
                />
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