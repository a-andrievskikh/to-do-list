import React from 'react'
import './App.css'
import { Todolist } from './components/Todolist/Todolist'
import { ItemForm } from './components/ItemForm/ItemForm'
import { Header } from './components/Header/Header'
import { Container, Grid, Paper } from '@mui/material'
import {
  addTodolistAC,
} from './store/todolists-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from './store/store'

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
export type TodolistType = {
  id: string
  title: string
  filter: FilterType
}
export type TasksStateType = {
  [key: string]: TaskType[]
}
export type FilterType = 'all' | 'active' | 'completed'

export const AppWithRedux = () => {
  const dispatch = useDispatch()

  const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)

  const addTodolist = React.useCallback((todolistTitle: string) => {
    dispatch(addTodolistAC(todolistTitle))
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
    <div className="App">
      <Header />
      <Container fixed>
        <Grid container style={{ padding: '10px' }}>
          <ItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={3}>
          {todolistList}
        </Grid>
      </Container>
    </div>
  )
}