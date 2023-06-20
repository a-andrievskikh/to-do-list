import React, { useState } from 'react'
import './App.css'
import { TodoList } from './TodoList'
import { v1 } from 'uuid'

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
export type FilterValuesType = 'All' | 'Active' | 'Completed'

type TodoListType = {
  id: string
  title: string
  filter: FilterValuesType
}

type TasksStateType = {
  [todoListId: string]: TaskType[]
}

export const App = (): JSX.Element => {
  // BLL

  const todoListId_1 = v1()
  const todoListId_2 = v1()

  const [todoLists, setTodoLists] = useState<TodoListType[]>([
    { id: todoListId_1, title: 'What to learn', filter: 'All' },
    { id: todoListId_2, title: 'What to buy', filter: 'All' },
  ])

  const [tasks, setTasks] = useState<TasksStateType>({
    [todoListId_1]: [
      { id: v1(), title: 'HTML', isDone: true },
      { id: v1(), title: 'CSS', isDone: true },
      { id: v1(), title: 'JS/TS', isDone: false },
    ],
    [todoListId_2]: [
      { id: v1(), title: 'Books', isDone: true },
      { id: v1(), title: 'Toys', isDone: true },
      { id: v1(), title: 'Bikes', isDone: false },
    ],
  })

  const changeTodoListFilter = (nextFilterValue: FilterValuesType, todoListId: string) => {
    const updatedTodoLists: TodoListType[]
      = todoLists.map(tl => (
        tl.id === todoListId ? { ...tl, filter: nextFilterValue } : tl
      ),
    )
    setTodoLists(updatedTodoLists)
  }
  const removeTask = (taskId: string, todoListId: string) => {
    const tasksForTodoList: TaskType[] = tasks[todoListId]
    const updatedTasks = tasksForTodoList.filter((t) => t.id !== taskId)
    const copyTasks: TasksStateType = { ...tasks }
    copyTasks[todoListId] = updatedTasks
    setTasks(copyTasks)

    // setTasks( {...tasks, tasksForTodoList.filter((t) => t.id !== taskId)}) /// короткий вариант
  }
  const addTask = (title: string, todoListId: string) => {
    const tasksForTodoList: TaskType[] = tasks[todoListId]
    const newTask: TaskType = { id: v1(), title: title, isDone: false }
    const updatedTasks = [newTask, ...tasksForTodoList]
    const copyTasks: TasksStateType = { ...tasks }
    copyTasks[todoListId] = updatedTasks
    setTasks(copyTasks)

    // setTasks({ ...tasks, [todoListId]: [newTask, ...tasks[todoListId]] }) /// короткий вариант
  }
  const changeTaskStatus = (taskId: string, newIsDoneValue: boolean, todoListId: string) => {
    const tasksForTodoList: TaskType[] = tasks[todoListId]
    const updatedTasks
      = tasksForTodoList.map(t => ( t.id === taskId ? { ...t, isDone: newIsDoneValue } : t ),
    )
    const copyTasks: TasksStateType = { ...tasks }
    copyTasks[todoListId] = updatedTasks
    setTasks(copyTasks)


    /*setTasks({
        ...tasks,
        [todoListId]: tasks[todoListId].map(t => (
          t.id === taskId ? { ...t, isDone: newIsDoneValue } : t ), /// короткая запись...
        ),
      },
    )*/
  }
  const removeTodoList = (todoListId: string) => {
    const updateTodoLists: TodoListType[] = todoLists.filter(tl => tl.id !== todoListId)
    setTodoLists(updateTodoLists)
    delete tasks[todoListId]
  }

  // UI
  const getFilteredTasks = (allTasks: TaskType[], currentFilterValue: FilterValuesType): TaskType[] => {
    return currentFilterValue === 'Active' ? allTasks.filter(t => !t.isDone)
      : currentFilterValue === 'Completed' ? allTasks.filter(t => t.isDone)
        : allTasks
    /*switch (currentFilterValue) {
      case 'Completed':
        return allTasks.filter(t => t.isDone)
      case 'Active':
        return allTasks.filter(t => !t.isDone)
      default:
        return allTasks
    }*/
  }
  const todoListsComponents: JSX.Element[] = todoLists.map(tl => {
    const filteredTasks: TaskType[] = getFilteredTasks(tasks[tl.id], tl.filter)
    return (
      <TodoList key={tl.id}
                todoListId={tl.id}
                title={tl.title}
                filter={tl.filter}
                tasks={filteredTasks}
                addTask={addTask}
                removeTask={removeTask}
                removeTodoList={removeTodoList}
                changeFilter={changeTodoListFilter}
                changeTaskStatus={changeTaskStatus}
      />
    )
  })

  return (
    <div className="App">
      {todoListsComponents}
    </div>
  )
}
