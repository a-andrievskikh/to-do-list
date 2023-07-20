import React, { useState } from 'react'
import './App.css'
import { Todolist } from './components/Todolist/Todolist'
import { v1 } from 'uuid'

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

export type TaskStateType = {
  [key: string]: TaskType[]
}

export type FilterType = 'all' | 'active' | 'completed'

export const App = () => {

  const todolist1 = v1()
  const todolist2 = v1()

  const [todolists, setTodolists] = useState<TodolistType[]>([
    { id: todolist1, title: 'What to learn', filter: 'all' },
    { id: todolist2, title: 'What to buy', filter: 'all' },
  ])

  const [tasks, setTasks] = useState<TaskStateType>({
    [todolist1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: true },
      { id: v1(), title: 'Rest API', isDone: false },
      { id: v1(), title: 'GraphQL', isDone: false },
    ],
    [todolist2]: [
      { id: v1(), title: 'Bike', isDone: false },
      { id: v1(), title: 'Book', isDone: true },
      { id: v1(), title: 'Car', isDone: true },
      { id: v1(), title: 'Toy', isDone: false },
      { id: v1(), title: 'Cucumber', isDone: true },
    ],
  })

  const removeTask = (todolistID: string, taskID: string) => {
    setTasks({ ...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== taskID) })
  }

  const addTask = (todolistID: string, taskTitle: string) => {
    setTasks({ ...tasks, [todolistID]: [{ id: v1(), title: taskTitle, isDone: false }, ...tasks[todolistID]] })
  }

  const changeFilter = (todolistID: string, value: FilterType) => {
    const todolist = todolists.find(tl => tl.id === todolistID)
    if (todolist) todolist.filter = value
    setTodolists([...todolists])
  }

  const changeTaskStatus = (todolistID: string, taskID: string, newIsDone: boolean) => {
    const task = tasks[todolistID].find(task => task.id === taskID)
    if (task) task.isDone = newIsDone
    setTasks({ ...tasks })
  }

  const removeTodolist = (todolistID: string) => {
    setTodolists(todolists.filter(tl => tl.id !== todolistID))
    delete tasks[todolistID]
    setTasks({ ...tasks })
  }

  return (
    <div className="App">
      {
        todolists.map(tl => {
          const tasksForTodolist: TaskType[] =
            tl.filter === 'active' ? tasks[tl.id].filter(t => !t.isDone)
              : tl.filter === 'completed' ? tasks[tl.id].filter(t => t.isDone)
                : tasks[tl.id]

          return (
            <Todolist key={tl.id}
                      id={tl.id}
                      title={tl.title}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      addTask={addTask}
                      changeFilter={changeFilter}
                      changeTaskStatus={changeTaskStatus}
                      filter={tl.filter}
                      removeTodolist={removeTodolist}
            />
          )
        })
      }
    </div>
  )
}