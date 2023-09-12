import { useDispatch } from 'react-redux'
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from '../../store/tasks-reducer'
import { Checkbox, IconButton } from '@mui/material'
import { EditableSpan } from '../EditableSpan/EditableSpan'
import { Delete } from '@mui/icons-material'
import { ChangeEvent, useCallback } from 'react'
import { TaskStatuses } from '../../api/tasks-api'

export type TaskPropsType = {
  taskID: string
  title: string
  status: TaskStatuses
  todolistID: string
}

export const Task = ({ taskID, title, status, todolistID }: TaskPropsType) => {
  const dispatch = useDispatch()

  const onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeTaskStatusAC(todolistID, taskID, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New))
  }, [dispatch, todolistID, taskID])

  const onClickHandler = useCallback(() => {
    dispatch(removeTaskAC(todolistID, taskID))
  }, [dispatch, todolistID, taskID])

  const onChangeTaskTitleHandler = useCallback((taskTitle: string) => {
    dispatch(changeTaskTitleAC(todolistID, taskID, taskTitle))
  }, [dispatch, todolistID, taskID])

  return (
    <li className={status === TaskStatuses.Completed ? 'isDone' : ''}
        key={taskID}>
      <Checkbox color="primary"
                checked={status === TaskStatuses.Completed}
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