import './App.css'
import Container from '@mui/material/Container'
import AppBar from '@mui/material/AppBar'
import Menu from '@mui/icons-material/Menu'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'
import { TodolistList } from '../features/TodolistList/TodolistList'
import { useAppSelector } from './hooks'
import { ErrorSnackbar } from '../components/ErrorSnackbar/ErrorSnackbar'
import { RequestStatusType } from './app-reducer'

type AppPropsType = { demo?: boolean }

export const App = ({ demo = false }: AppPropsType) => {
  const status = useAppSelector<RequestStatusType>(s => s.app.status)

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
          <Button color={'inherit'}>Login</Button>
        </Toolbar>
        {status === 'loading' && <LinearProgress color={'secondary'} />}
      </AppBar>
      <Container fixed>
        <TodolistList demo={demo} />
      </Container>
    </div>
  )
}