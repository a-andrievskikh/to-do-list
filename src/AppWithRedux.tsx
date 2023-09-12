import { useCallback } from 'react'
import './App.css'
import { Todolist } from './components/Todolist/Todolist'
import { ItemForm } from './components/ItemForm/ItemForm'
import { Header } from './components/Header/Header'
import { Container, Grid, Paper } from '@mui/material'
import { addTodolistAC, TodolistDomainType } from './store/todolists-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from './store/store'


export const AppWithRedux = () => {
  const dispatch = useDispatch()

  const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)

  const addTodolist = useCallback((todolistTitle: string) => {
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