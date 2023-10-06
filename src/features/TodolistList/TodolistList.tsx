import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { useCallback, useEffect } from 'react'
import { createTodolistTC, getTodolistsTC, TodolistDomainType } from './todolists-reducer'
import { Todolist } from './Todolist/Todolist'
import { ItemForm } from '../../components/ItemForm/ItemForm'
import { useAppDispatch, useAppSelector } from '../../app/hooks'

type TodolistListPropsType = { demo?: boolean }

export const TodolistList = ({ demo = false }: TodolistListPropsType) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (demo) return
    dispatch(getTodolistsTC())
  }, [dispatch, demo])

  const todolists = useAppSelector<TodolistDomainType[]>(s => s.todolists)

  const addTodolist = useCallback((todolistTitle: string) => {
    dispatch(createTodolistTC(todolistTitle))
  }, [dispatch])

  const todolistList = todolists.map(tl => {
    return (
      <Grid item key={tl.id}>
        <Paper elevation={3} style={{ padding: '10px' }}>
          <Todolist todolist={tl}
                    demo={demo}
          />
        </Paper>
      </Grid>
    )
  })

  return (
    <>
      <Grid container style={{ padding: '10px' }}>
        <ItemForm addItem={addTodolist} />
      </Grid>
      <Grid container spacing={3}>
        {todolistList}
      </Grid>
    </>
  )
}