import React, { ChangeEvent, FC } from 'react'
import { FilterType, TaskType } from '../../App'
import { ItemForm } from '../ItemForm/ItemForm'
import { EditableSpan } from '../EditableSpan/EditableSpan'
import { Button, Checkbox, IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'

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
                <Checkbox color="primary"
                          checked={task.isDone}
                          onChange={onChangeStatusHandler}
                />
                <EditableSpan value={task.title}
                              onChange={onChangeTitleHandler}
                />
                <IconButton onClick={onClickHandler}>
                  <Delete fontSize={'small'} />
                </IconButton>
              </li>
            )
          })
        }
      </ul>
      <div>
        <Button variant={props.filter === 'all' ? 'contained' : 'outlined'}
                size={'small'}
                onClick={() => onChangeFilterHandler('all')}>All
        </Button>
        <Button variant={props.filter === 'active' ? 'contained' : 'outlined'}
                size={'small'}
                onClick={() => onChangeFilterHandler('active')}>Active
        </Button>
        <Button variant={props.filter === 'completed' ? 'contained' : 'outlined'}
                size={'small'}
                onClick={() => onChangeFilterHandler('completed')}>Completed
        </Button>
      </div>
    </div>
  )
}