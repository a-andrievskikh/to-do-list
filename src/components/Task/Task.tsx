import { useDispatch } from 'react-redux'
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from '../../store/tasks-reducer'
import { Checkbox, IconButton } from '@mui/material'
import { EditableSpan } from '../EditableSpan/EditableSpan'
import { Delete } from '@mui/icons-material'
import { ChangeEvent, useCallback } from 'react'

export type TaskPropsType = {
  taskID: string
  title: string
  isDone: boolean
  todolistID: string
}

export const Task = ({ taskID, title, isDone, todolistID }: TaskPropsType) => {
  const dispatch = useDispatch()

  const onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeTaskStatusAC(todolistID, taskID, e.currentTarget.checked))
  }, [dispatch, todolistID, taskID])

  const onClickHandler = useCallback(() => {
    dispatch(removeTaskAC(todolistID, taskID))
  }, [dispatch, todolistID, taskID])

  const onChangeTaskTitleHandler = useCallback((taskTitle: string) => {
    dispatch(changeTaskTitleAC(todolistID, taskID, taskTitle))
  }, [dispatch, todolistID, taskID])

  return (
    <li className={isDone ? 'isDone' : ''}
        key={taskID}>
      <Checkbox color="primary"
                checked={isDone}
                onChange={onChangeStatusHandler}
      />
      <EditableSpan value={title}
                    onChangeTitle={onChangeTaskTitleHandler}
      />
      <IconButton onClick={onClickHandler}>
        <Delete fontSize={'small'} />
      </IconButton>
    </li>
  )
}