import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from '../../store/store'
import { addTaskAC } from '../../store/tasks-reducer'
import { FilterType, TaskType } from '../../AppWithRedux'
import { EditableSpan } from '../EditableSpan/EditableSpan'
import { ItemForm } from '../ItemForm/ItemForm'
import { Button } from '@mui/material'
import { changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC } from '../../store/todolists-reducer'
import { Task } from '../Task/Task'

export type TodolistPropsType = {
  id: string
  title: string
  filter: FilterType
}

export const Todolist: React.FC<TodolistPropsType> = React.memo((
    {
      id,
      title,
      filter,
    }) => {

    const dispatch = useDispatch()

    const tasks =
      useSelector<AppRootStateType, TaskType[]>(state =>
        filter === 'active' ? state.tasks[id].filter(t => !t.isDone)
          : filter === 'completed' ? state.tasks[id].filter(t => t.isDone)
            : state.tasks[id],
      )

    const addItem = React.useCallback((itemTitle: string) => {
      dispatch(addTaskAC(id, itemTitle))
    }, [dispatch, id])

    const changeTodolistTitle = React.useCallback((newTitle: string) => {
      dispatch(changeTodolistTitleAC(id, newTitle))
    }, [dispatch, id])

    const changeFilter = React.useCallback((filterValue: FilterType) => {
      dispatch(changeTodolistFilterAC(id, filterValue))
    }, [dispatch, id])

    const removeTodolist = React.useCallback((todolistID: string) => {
      dispatch(removeTodolistAC(todolistID))
    }, [dispatch])

    const tasksList = tasks.map(task => {
      return <Task key={task.id}
                   taskID={task.id}
                   title={task.title}
                   isDone={task.isDone}
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
                  onClick={() => changeFilter('all')}>All
          </Button>
          <Button variant={filter === 'active' ? 'contained' : 'outlined'}
                  size={'small'}
                  onClick={() => changeFilter('active')}>Active
          </Button>
          <Button variant={filter === 'completed' ? 'contained' : 'outlined'}
                  size={'small'}
                  onClick={() => changeFilter('completed')}>Completed
          </Button>
        </div>
      </div>
    )
  },
)

