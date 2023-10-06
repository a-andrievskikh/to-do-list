import { memo, useCallback, useEffect } from 'react'
import { createTaskTC, getTasksTC } from '../tasks-reducer'
import { EditableSpan } from '../../../components/EditableSpan/EditableSpan'
import { ItemForm } from '../../../components/ItemForm/ItemForm'
import Button from '@mui/material/Button'
import {
  updateTodolistFilterAC, updateTodolistTC,
  FilterType,
  deleteTodolistTC, TodolistDomainType,
} from '../todolists-reducer'
import { Task } from './Task/Task'
import { TaskStatuses, TaskType } from '../../../api/tasks-api'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'

export type TodolistPropsType = {
  todolist: TodolistDomainType
  demo?: boolean
}

export const Todolist = memo(({ todolist, demo = false }: TodolistPropsType) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
      if (demo) return
      dispatch(getTasksTC(todolist.id))
    }, [dispatch, todolist.id, demo])

    const tasks =
      useAppSelector<TaskType[]>(s =>
        todolist.filter === 'active' ? s.tasks[todolist.id].filter(t => t.status === TaskStatuses.New)
          : todolist.filter === 'completed' ? s.tasks[todolist.id].filter(t => t.status === TaskStatuses.Completed)
            : s.tasks[todolist.id],
      )

    const addItem = useCallback((itemTitle: string) => {
      dispatch(createTaskTC(todolist.id, itemTitle))
    }, [dispatch, todolist.id])
    const updateTodolistTitle = useCallback((newTitle: string) => {
      dispatch(updateTodolistTC(todolist.id, newTitle))
    }, [dispatch, todolist.id])
    const updateTodolistFilter = useCallback((filterValue: FilterType) => {
      dispatch(updateTodolistFilterAC(todolist.id, filterValue))
    }, [dispatch, todolist.id])
    const deleteTodolist = useCallback((todolistID: string) => {
      dispatch(deleteTodolistTC(todolistID))
    }, [dispatch])

    const tasksList = tasks.map(task => {
      return <Task key={task.id}
                   taskID={task.id}
                   title={task.title}
                   status={task.status}
                   todolistID={todolist.id}
      />
    })

    return (
      <div>
        <h3>
          <EditableSpan value={todolist.title} onChangeTitle={updateTodolistTitle} />
          <button onClick={() =>
            deleteTodolist(todolist.id)} disabled={todolist.entityStatus === 'loading'
          }>x
          </button>
        </h3>
        <ItemForm addItem={addItem} disabled={todolist.entityStatus === 'loading'} />
        <ul>{tasksList}</ul>
        <div>
          <Button variant={todolist.filter === 'all' ? 'contained' : 'outlined'}
                  color={'primary'}
                  size={'small'}
                  onClick={() => updateTodolistFilter('all')}>
            All
          </Button>
          <Button variant={todolist.filter === 'active' ? 'contained' : 'outlined'}
                  color={'success'}
                  size={'small'}
                  onClick={() => updateTodolistFilter('active')}>
            Active
          </Button>
          <Button variant={todolist.filter === 'completed' ? 'contained' : 'outlined'}
                  color={'secondary'}
                  size={'small'}
                  onClick={() => updateTodolistFilter('completed')}>
            Completed
          </Button>
        </div>
      </div>
    )
  },
)

