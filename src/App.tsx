import React from 'react'
import './App.css'
import { TodoList } from './TodoList'

export const App = () => {

  const truck = `What to learn 1`
  const truck2 = `What to learn 2`

  const tasks1 = [
    {id: 1, title: 'HTML&CSS', isDone: true},
    {id: 2, title: 'JS', isDone: true},
    {id: 3, title: 'ReactJS', isDone: false},
  ]
  const tasks2 = [
    {id: 1, title: 'Hello world', isDone: true},
    {id: 2, title: 'I am Happy', isDone: false},
    {id: 3, title: 'Yo', isDone: false},
  ]

  return (
    <div className="App">
      <TodoList truck={truck} truck2={10200} tasks={tasks1} />
      <TodoList truck={truck2} truck3={true} tasks={tasks2} />
    </div>
  )
}

