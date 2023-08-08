export {}
/*
import './App.css'
import { Todolist } from './components/Todolist/Todolist'
import { v1 } from 'uuid'
import { ItemForm } from './components/ItemForm/ItemForm'
import { Header } from './components/Header/Header'
import { Container, Grid, Paper } from '@mui/material'
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer,
} from './store/todolists-reducer'
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './store/tasks-reducer'

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

export const AppWithReducers = () => {

  const todolistID1 = v1()
  const todolistID2 = v1()

  const [todolists, dispatchToTodolistReducer] = useReducer(todolistsReducer, [
    { id: todolistID1, title: 'What to learn', filter: 'all' },
    { id: todolistID2, title: 'What to buy', filter: 'all' },
  ])

  const [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
    [todolistID1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: true },
      { id: v1(), title: 'Rest API', isDone: false },
      { id: v1(), title: 'GraphQL', isDone: false },
    ],
    [todolistID2]: [
      { id: v1(), title: 'Bike', isDone: false },
      { id: v1(), title: 'Book', isDone: true },
      { id: v1(), title: 'Car', isDone: true },
      { id: v1(), title: 'Toy', isDone: false },
      { id: v1(), title: 'Cucumber', isDone: true },
    ],
  })

  const removeTask = (todolistID: string, taskID: string) =>
    dispatchToTasksReducer(removeTaskAC(todolistID, taskID))

  const addTask = (todolistID: string, taskTitle: string) =>
    dispatchToTasksReducer(addTaskAC(todolistID, taskTitle))

  const changeTaskStatus = (todolistID: string, taskID: string, newIsDone: boolean) =>
    dispatchToTasksReducer(changeTaskStatusAC(todolistID, taskID, newIsDone))

  const changeTaskTitle = (todolistID: string, taskID: string, newTitle: string) =>
    dispatchToTasksReducer(changeTaskTitleAC(todolistID, taskID, newTitle))

  const removeTodolist = (todolistID: string) => {
    const action = removeTodolistAC(todolistID)
    dispatchToTodolistReducer(action)
    dispatchToTasksReducer(action)
  }

  const addTodolist = (todolistTitle: string) => {
    const action = addTodolistAC(todolistTitle)
    dispatchToTodolistReducer(action)
    dispatchToTasksReducer(action)
  }

  const changeTodolistTitle = (todolistID: string, newTitle: string) =>
    dispatchToTodolistReducer(changeTodolistTitleAC(todolistID, newTitle))

  const changeFilter = (todolistID: string, filterValue: FilterType) =>
    dispatchToTodolistReducer(changeTodolistFilterAC(todolistID, filterValue))

  return (
    <div className="App">
      <Header />
      <Container fixed>
        <Grid container style={{ padding: '10px' }}>
          <ItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={3}>
          {
            todolists.map(tl => {
              const tasksForTodolist: TaskType[] =
                tl.filter === 'active' ? tasks[tl.id].filter(t => !t.isDone)
                  : tl.filter === 'completed' ? tasks[tl.id].filter(t => t.isDone)
                    : tasks[tl.id]
              return (
                <Grid item key={tl.id}>
                  <Paper elevation={3} style={{ padding: '10px' }}>
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
                              changeTaskTitle={changeTaskTitle}
                              changeTodolistTitle={changeTodolistTitle}
                    />
                  </Paper>
                </Grid>
              )
            })
          }
        </Grid>
      </Container>
    </div>
  )
}*/
