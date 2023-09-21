export {}
/*
import './App.css'
import { Todolist } from './components/Todolist/Todolist'
import { v1 } from 'uuid'
import { ItemForm } from './components/ItemForm/ItemForm'
import { Header } from './components/Header/Header'
import { Container, Grid, Paper } from '@mui/material'

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

export const App = () => {

  const todolistID1 = v1()
  const todolistID2 = v1()

  const [tasks, setTasks] = useState<TasksStateType>({
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
  const addTask = (todolistID: string, taskTitle: string) => {

    setTasks({ ...tasks, [todolistID]: [{ id: v1(), title: taskTitle, isDone: false }, ...tasks[todolistID]] })
  }
  const removeTask = (todolistID: string, taskID: string) => {
    setTasks({ ...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== taskID) })
  }
  const changeTaskStatus = (todolistID: string, taskID: string, newIsDone: boolean) => {
    const task = tasks[todolistID].find(task => task.id === taskID)
    if (task) task.isDone = newIsDone
    setTasks({ ...tasks })
  }
  const changeTaskTitle = (todolistID: string, taskID: string, newTitle: string) => {
    const task = tasks[todolistID].find(task => task.id === taskID)
    if (task) {
      task.title = newTitle
      setTasks({ ...tasks })
    }
  }

  const [todolists, setTodolists] = useState<TodolistType[]>([
    { id: todolistID1, title: 'What to learn', filter: 'all' },
    { id: todolistID2, title: 'What to buy', filter: 'all' },
  ])
  const addTodolist = (taskTitle: string) => {
    const todolist: TodolistType = { id: v1(), title: taskTitle, filter: 'all' }
    setTodolists([todolist, ...todolists])
    setTasks({ ...tasks, [todolist.id]: [] })
  }
  const removeTodolist = (todolistID: string) => {
    setTodolists(todolists.filter(tl => tl.id !== todolistID))
    delete tasks[todolistID]
    setTasks({ ...tasks })
  }
  const changeFilter = (todolistID: string, value: FilterType) => {
    const todolist = todolists.find(tl => tl.id === todolistID)
    if (todolist) todolist.filter = value
    setTodolists([...todolists])
  }
  const changeTodolistTitle = (todolistID: string, newTitle: string) => {
    const todolist = todolists.find(tl => tl.id === todolistID)
    if (todolist) {
      todolist.title = newTitle
      setTodolists([...todolists])
    }

  }

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
                <Grid item>
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
