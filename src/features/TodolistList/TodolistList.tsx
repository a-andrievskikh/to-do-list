import { ThunkType, useAppSelector } from '../../app/store'
import { useDispatch } from 'react-redux'
import { useCallback, useEffect } from 'react'
import { addTodolistTC, getTodolistsTC, TodolistDomainType } from './todolists-reducer'
import { Grid, Paper } from '@mui/material'
import { Todolist } from './Todolist/Todolist'
import { ItemForm } from '../../components/ItemForm/ItemForm'

export const TodolistList = () => {
  const dispatch: ThunkType = useDispatch()

  useEffect(() => {
    dispatch(getTodolistsTC())
  }, [dispatch])

  const todolists = useAppSelector<TodolistDomainType[]>(s => s.todolists)

  const addTodolist = useCallback((todolistTitle: string) => {
    dispatch(addTodolistTC(todolistTitle))
  }, [dispatch])

  const todolistList = todolists.map(tl => {
    return (
      <Grid item key={tl.id}>
        <Paper elevation={3} style={{ padding: '10px' }}>
          <Todolist id={tl.id}
                    title={tl.title}
                    filter={tl.filter}
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