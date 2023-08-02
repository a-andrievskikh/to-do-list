import React, { ChangeEvent, FC } from 'react'
import { FilterType, TaskType } from '../../AppWithRedux'
import { ItemForm } from '../ItemForm/ItemForm'
import { EditableSpan } from '../EditableSpan/EditableSpan'
import { Button, Checkbox, IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from '../../store/store'
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from '../../store/tasks-reducer'

export type TodolistPropsType = {
  id: string
  title: string
  filter: FilterType
  changeFilter: (todolistID: string, value: FilterType) => void
  removeTodolist: (todolistID: string) => void
  changeTodolistTitle: (todolistID: string, newTitle: string) => void
}

export const Todolist: FC<TodolistPropsType> = (props) => {
  const dispatch = useDispatch()

  const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[props.id])

  const filteredTasks =
    props.filter === 'active' ? tasks.filter(t => !t.isDone)
      : props.filter === 'completed' ? tasks.filter(t => t.isDone)
        : tasks

  const onChangeTodolistTitle = (value: string) =>
    props.changeTodolistTitle(props.id, value)

  const onChangeFilterHandler = (value: FilterType) =>
    props.changeFilter(props.id, value)

  const onRemoveTodolistHandler = () => props.removeTodolist(props.id)

  return (
    <div>
      <h3>
        <EditableSpan value={props.title} onChange={onChangeTodolistTitle} />
        <button onClick={onRemoveTodolistHandler}>x</button>
      </h3>
      <ItemForm addItem={(taskTitle: string) => {
        dispatch(addTaskAC(props.id, taskTitle))
      }} />
      <ul>
        {
          filteredTasks.map(task => {
            const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
              dispatch(changeTaskStatusAC(props.id, task.id, e.currentTarget.checked))
            }
            const onClickHandler = () => dispatch(removeTaskAC(props.id, task.id))
            const onChangeTaskTitleHandler = (value: string) => {
              dispatch(changeTaskTitleAC(props.id, task.id, value))
            }
            return (
              <li className={task.isDone ? 'isDone' : ''}
                  key={task.id}>
                <Checkbox color="primary"
                          checked={task.isDone}
                          onChange={onChangeStatusHandler}
                />
                <EditableSpan value={task.title}
                              onChange={onChangeTaskTitleHandler}
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