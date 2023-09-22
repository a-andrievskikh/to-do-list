import { memo, useCallback, useEffect } from 'react'
import { addTaskTC, getTasksTC } from '../tasks-reducer'
import { EditableSpan } from '../../../components/EditableSpan/EditableSpan'
import { ItemForm } from '../../../components/ItemForm/ItemForm'
import { Button } from '@mui/material'
import {
  changeTodolistFilterAC, changeTodolistTC,
  FilterType,
  removeTodolistTC,
} from '../todolists-reducer'
import { Task } from './Task/Task'
import { TaskStatuses, TaskType } from '../../../api/tasks-api'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'

export type TodolistPropsType = {
  id: string
  title: string
  filter: FilterType
}

export const Todolist = memo(({ id, title, filter }: TodolistPropsType) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
      dispatch(getTasksTC(id))
    }, [dispatch, id])

    const tasks =
      useAppSelector<TaskType[]>(s =>
        filter === 'active' ? s.tasks[id].filter(t => t.status === TaskStatuses.New)
          : filter === 'completed' ? s.tasks[id].filter(t => t.status === TaskStatuses.Completed)
            : s.tasks[id],
      )

    const addItem = useCallback((itemTitle: string) => {
      dispatch(addTaskTC(id, itemTitle))
    }, [dispatch, id])

    const changeTodolistTitle = useCallback((newTitle: string) => {
      dispatch(changeTodolistTC(id, newTitle))
    }, [dispatch, id])

    const changeTodolistFilter = useCallback((filterValue: FilterType) => {
      dispatch(changeTodolistFilterAC(id, filterValue))
    }, [dispatch, id])

    const removeTodolist = useCallback((todolistID: string) => {
      dispatch(removeTodolistTC(todolistID))
    }, [dispatch])

    const tasksList = tasks.map(task => {
      return <Task key={task.id}
                   taskID={task.id}
                   title={task.title}
                   status={task.status}
                   todolistID={id}
      />
    })

    return (
      <div>
        <h3>
          <EditableSpan value={title} onChangeTitle={changeTodolistTitle} />
          <button onClick={() => removeTodolist(id)}>x</button>
        </h3>
        <ItemForm addItem={addItem} />
        <ul>{tasksList}</ul>
        <div>
          <Button variant={filter === 'all' ? 'contained' : 'outlined'}
                  size={'small'}
                  onClick={() => changeTodolistFilter('all')}>
            All
          </Button>
          <Button variant={filter === 'active' ? 'contained' : 'outlined'}
                  size={'small'}
                  onClick={() => changeTodolistFilter('active')}>
            Active
          </Button>
          <Button variant={filter === 'completed' ? 'contained' : 'outlined'}
                  size={'small'}
                  onClick={() => changeTodolistFilter('completed')}>
            Completed
          </Button>
        </div>
      </div>
    )
  },
)

