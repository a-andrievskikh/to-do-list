import './App.css'
import { memo, useEffect } from 'react'
import Container from '@mui/material/Container'
import AppBar from '@mui/material/AppBar'
import Menu from '@mui/icons-material/Menu'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import LinearProgress from '@mui/material/LinearProgress'
import { useAppDispatch, useAppSelector } from './hooks'
import { TodolistList } from '../features/TodolistList/TodolistList'
import { Login } from '../features/Login/Login'
import { ErrorSnackbar } from '../components/ErrorSnackbar/ErrorSnackbar'
import { RequestStatusT } from './app-reducer'
import { clearDataAC } from '../features/TodolistList/todolists-reducer'
import { logoutTC, meTC } from '../features/Login/auth-reducer'
import { Navigate, Route, Routes } from 'react-router-dom'


export const App = memo(({ demo = false }: AppPropsT) => {
  const dispatch = useAppDispatch()
  const status = useAppSelector<RequestStatusT>(s => s.app.status)
  const isInitialized = useAppSelector<boolean>(s => s.app.isInitialized)
  const isLoggedIn = useAppSelector<boolean>(s => s.auth.isLoggedIn)

  const logOutHandler = () => {
    dispatch(logoutTC())
    dispatch(clearDataAC())
  }

  useEffect(() => {
    dispatch(meTC())
  }, [])

  if (!isInitialized) {
    return <div
      style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
      <CircularProgress />
    </div>

  }

  return (
    <div className="App">
      <ErrorSnackbar />
      <AppBar position={'static'}>
        <Toolbar>
          <IconButton>
            <Menu />
          </IconButton>
          <Typography variant={'h6'}>
            TODOLIST
          </Typography>
          {isLoggedIn && <Button color={'warning'} onClick={logOutHandler}>Log out</Button>}
        </Toolbar>
        {status === 'loading' && <LinearProgress color={'secondary'} />}
      </AppBar>
      <Container fixed>
        <Routes>
          <Route path={'/'} element={<TodolistList demo={demo} />} />
          <Route path={'/login'} element={<Login />} />
          <Route path={'404'} element={<h1>404: PAGE NOT FOUND</h1>} />
          <Route path={'*'} element={<Navigate to={'404'} />} />
        </Routes>
      </Container>
    </div>
  )
})

// Types
type AppPropsT = { demo?: boolean }