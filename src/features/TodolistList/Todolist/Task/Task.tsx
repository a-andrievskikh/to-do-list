import { updateTaskTC, removeTaskTC } from '../../tasks-reducer'
import { Checkbox, IconButton } from '@mui/material'
import { EditableSpan } from '../../../../components/EditableSpan/EditableSpan'
import { Delete } from '@mui/icons-material'
import { ChangeEvent, useCallback } from 'react'
import { TaskStatuses } from '../../../../api/tasks-api'
import { ThunkType } from '../../../../app/store'
import { useDispatch } from 'react-redux'

export type TaskPropsType = {
  todolistID: string
  taskID: string
  title: string
  status: TaskStatuses
}

export const Task = ({ todolistID, taskID, title, status }: TaskPropsType) => {
  const dispatch: ThunkType = useDispatch()

  const removeTask = useCallback(() => {
    dispatch(removeTaskTC(todolistID, taskID))
  }, [dispatch, todolistID, taskID])

  const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateTaskTC(
        todolistID, taskID,
        { status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New },
      ),
    )
  }, [dispatch, todolistID, taskID])

  const changeTaskTitle = useCallback((taskTitle: string) => {
    dispatch(
      updateTaskTC(
        todolistID, taskID, { title: taskTitle },
      ),
    )
  }, [dispatch, todolistID, taskID])

  return (
    <li className={status === TaskStatuses.Completed ? 'isDone' : ''}
        key={taskID}>
      <Checkbox color="primary"
                checked={status === TaskStatuses.Completed}
                onChange={changeTaskStatus}
      />
      <EditableSpan value={title}
                    onChangeTitle={changeTaskTitle}
      />
      <IconButton onClick={removeTask}>
        <Delete fontSize={'small'} />
      </IconButton>
    </li>
  )
}