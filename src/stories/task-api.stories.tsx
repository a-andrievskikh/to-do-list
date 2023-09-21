import { ChangeEvent, useState } from 'react'
import { tasksAPI } from '../api/tasks-api'

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
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [status, setStatus] = useState<number>(0)
  const [priority, setPriority] = useState<number>(0)
  const [startDate, setStartDate] = useState<string>('')
  const [deadline, setDeadline] = useState<string>('')

  const onChangeTodolistIDHandler = (e: ChangeEvent<HTMLInputElement>) => setTodolistID(e.currentTarget.value)
  const onChangeTaskIDHandler = (e: ChangeEvent<HTMLInputElement>) => setTaskID(e.currentTarget.value)
  const onChangeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
  const onChangeDescriptionHandler = (e: ChangeEvent<HTMLInputElement>) => setDescription(e.currentTarget.value)
  const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => setStatus(Number(e.currentTarget.value))
  const onChangePriorityHandler = (e: ChangeEvent<HTMLInputElement>) => setPriority(Number(e.currentTarget.value))
  const onChangeStartDateHandler = (e: ChangeEvent<HTMLInputElement>) => setStartDate(e.currentTarget.value)
  const onChangeDeadlineHandler = (e: ChangeEvent<HTMLInputElement>) => setDeadline(e.currentTarget.value)

  const onClickHandler = () => {
    tasksAPI.updateTask(todolistID, taskID, {
      title,
      description,
      status,
      priority,
      startDate: '',
      deadline: '',
    })
      .then(res => setState(res.data))
  }

  return (
    <>
      <input value={todolistID} placeholder={'Enter Todolist ID'} onChange={onChangeTodolistIDHandler} />
      <input value={taskID} placeholder={'Enter Task ID'} onChange={onChangeTaskIDHandler} />
      <input value={title} placeholder={'Enter Task Title'} onChange={onChangeTaskTitleHandler} />
      <input value={description} placeholder={'Enter Description'} onChange={onChangeDescriptionHandler} />
      <input value={status} placeholder={'Enter Status'} onChange={onChangeStatusHandler} />
      <input value={priority} placeholder={'Enter Priority'} onChange={onChangePriorityHandler} />
      <input value={startDate} placeholder={'Enter Start Date'} onChange={onChangeStartDateHandler} />
      <input value={deadline} placeholder={'Enter Deadline'} onChange={onChangeDeadlineHandler} />
      <button onClick={onClickHandler}>Change Task Title</button>
      <div>{JSON.stringify(state)}</div>
    </>
  )
}