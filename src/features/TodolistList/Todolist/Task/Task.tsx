import Delete from '@mui/icons-material/Delete'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import { updateTaskTC, deleteTaskTC } from '../../tasks-reducer'
import { EditableSpan } from '../../../../components/EditableSpan/EditableSpan'
import { ChangeEvent, memo, useCallback } from 'react'
import { TaskStatuses } from '../../../../api/tasks-api'
import { useAppDispatch } from '../../../../app/hooks'

export const Task = memo(({ todolistID, taskID, title, status }: TaskPropsT) => {
  const dispatch = useAppDispatch()

  const deleteTask = useCallback(() => {
    dispatch(deleteTaskTC(todolistID, taskID))
  }, [dispatch, todolistID, taskID])

  const updateTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateTaskTC(
        todolistID, taskID,
        { status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New },
      ),
    )
  }, [dispatch, todolistID, taskID])

  const updateTaskTitle = useCallback((taskTitle: string) => {
    dispatch(updateTaskTC(todolistID, taskID, { title: taskTitle }))
  }, [dispatch, todolistID, taskID])

  const listItemClassName = status === TaskStatuses.Completed ? 'isDone' : ''

  return (
    <li className={listItemClassName}
        key={taskID}>
      <Checkbox color="primary"
                checked={status === TaskStatuses.Completed}
                onChange={updateTaskStatus}
      />
      <EditableSpan value={title}
                    onChangeTitle={updateTaskTitle}
      />
      <IconButton onClick={deleteTask}>
        <Delete fontSize={'small'} />
      </IconButton>
    </li>
  )
})

// Types
export type TaskPropsT = {
  todolistID: string
  taskID: string
  title: string
  status: TaskStatuses
}