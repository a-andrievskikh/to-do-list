import { ChangeEvent, useState } from 'react'
import { tasksAPI } from '../api/task-api'

export default {
  title: 'API/tasks',
}

export const GetTasks = () => {
  const [state, setState] = useState<any>(null)
  const [todolistID, setTodolistID] = useState<string>('')

  const onClickHandler = () => {
    tasksAPI.getTasks(todolistID)
      .then((res) => setState(res.data))
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTodolistID(e.currentTarget.value)

  return (
    <>
      <input
        value={todolistID}
        placeholder={'Enter Todolist ID'}
        onChange={onChangeHandler}
      />
      <button onClick={onClickHandler}>Get Tasks</button>
      <div>{JSON.stringify(state)}</div>
    </>
  )
}

export const CreateTask = () => {
  const [state, setState] = useState<any>(null)
  const [todolistID, setTodolistID] = useState<string>('')
  const [taskTitle, setTaskTitle] = useState<string>('')

  const onChangeTodolistIDHandler = (e: ChangeEvent<HTMLInputElement>) => setTodolistID(e.currentTarget.value)
  const onChangeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTaskTitle(e.currentTarget.value)

  const onClickHandler = () => {
    tasksAPI.createTask(todolistID, taskTitle)
      .then(res => setState(res.data))
  }

  return (
    <>
      <input
        value={todolistID}
        placeholder={'Enter Todolist ID'}
        onChange={onChangeTodolistIDHandler}
      />
      <input
        value={taskTitle}
        placeholder={'Enter Task Title'}
        onChange={onChangeTaskTitleHandler}
      />
      <button onClick={onClickHandler}>Add Task</button>
      <div>{JSON.stringify(state)}</div>
    </>
  )
}

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null)
  const [todolistID, setTodolistID] = useState<string>('')
  const [taskID, setTaskID] = useState<string>('')

  const onChangeTodolistIDHandler = (e: ChangeEvent<HTMLInputElement>) => setTodolistID(e.currentTarget.value)
  const onChangeTaskIDHandler = (e: ChangeEvent<HTMLInputElement>) => setTaskID(e.currentTarget.value)

  const onClickHandler = () => {
    tasksAPI.deleteTask(todolistID, taskID)
      .then(res => setState(res.data))
  }

  return (
    <>
      <input
        value={todolistID}
        placeholder={'Enter Todolist ID'}
        onChange={onChangeTodolistIDHandler}
      />
      <input
        value={taskID}
        placeholder={'Enter Task ID'}
        onChange={onChangeTaskIDHandler}
      />
      <button onClick={onClickHandler}>Delete Task</button>
      <div>{JSON.stringify(state)}</div>
    </>
  )
}

export const UpdateTaskTitle = () => {
  const [state, setState] = useState<any>(null)
  const [todolistID, setTodolistID] = useState<string>('')
  const [taskID, setTaskID] = useState<string>('')
  const [taskTitle, setTaskTitle] = useState<string>('')

  const onChangeTodolistIDHandler = (e: ChangeEvent<HTMLInputElement>) => setTodolistID(e.currentTarget.value)
  const onChangeTaskIDHandler = (e: ChangeEvent<HTMLInputElement>) => setTaskID(e.currentTarget.value)
  const onChangeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTaskTitle(e.currentTarget.value)

  const onClickHandler = () => {
    tasksAPI.updateTaskTitle(todolistID, taskID, taskTitle)
      .then(res => setState(res.data))
  }

  return (
    <>
      <input
        value={todolistID}
        placeholder={'Enter Todolist ID'}
        onChange={onChangeTodolistIDHandler}
      />
      <input
        value={taskID}
        placeholder={'Enter Task ID'}
        onChange={onChangeTaskIDHandler}
      />
      <input
        value={taskTitle}
        placeholder={'Enter Task Title'}
        onChange={onChangeTaskTitleHandler}
      />
      <button onClick={onClickHandler}>Change Task Title</button>
      <div>{JSON.stringify(state)}</div>
    </>
  )
}