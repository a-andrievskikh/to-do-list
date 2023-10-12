import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { memo, useCallback, useEffect } from 'react'
import { createTodolistTC, getTodolistsTC, TodolistDomainT } from './todolists-reducer'
import { Todolist } from './Todolist/Todolist'
import { ItemForm } from '../../components/ItemForm/ItemForm'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { Navigate } from 'react-router-dom'

export const TodolistList = memo(({ demo = false }: TodolistListPropsT) => {
  const dispatch = useAppDispatch()
  const todolists = useAppSelector<TodolistDomainT[]>(s => s.todolists)
  const isLoggedIn = useAppSelector<boolean>(s => s.auth.isLoggedIn)

  const addTodolist = useCallback((todolistTitle: string) => {
    dispatch(createTodolistTC(todolistTitle))
  }, [dispatch])

  useEffect(() => {
    if (demo || !isLoggedIn) return
    dispatch(getTodolistsTC())
  }, [demo, isLoggedIn, dispatch])

  if (!isLoggedIn) return <Navigate to={'/login'} />

  const todolistList = todolists.map(tl => {
    return (
      <Grid item key={tl.id}>
        <Paper elevation={3} style={{ padding: '10px' }}>
          <Todolist key={tl.id}
                    todolist={tl}
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
})

// Types
type TodolistListPropsT = { demo?: boolean }