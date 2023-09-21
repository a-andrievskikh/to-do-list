import './App.css'
import { Header } from '../components/Header/Header'
import { Container } from '@mui/material'
import { TodolistList } from '../features/TodolistList/TodolistList'

export const App = () => {
  return (
    <div className="App">
      <Header />
      <Container fixed>
        <TodolistList />
      </Container>
    </div>
  )
}