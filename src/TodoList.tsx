import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { FilterValuesType } from './App'
import { Button } from './componets/Button'

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  tasks: TaskType[]
  removeTask: (taskId: string) => void
  changeFilter: (value: FilterValuesType) => void
  addTask: (newTitle: string) => void
}

export const Todolist = (props: PropsType) => {
  const [newTitle, setNewTitle] = useState<string>('')

  const mainFuncHandler = (value: FilterValuesType) => {
    props.changeFilter(value)
  }

  const removeTaskHandler = (taskId: string) => props.removeTask(taskId)
  const addTaskHandler = () => {
    props.addTask(newTitle)
    setNewTitle('')
  }

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      props.addTask(newTitle)
      setNewTitle('')
    }
  }
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value)
  }

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input value={newTitle}
               onKeyDown={onKeyDownHandler}
               onChange={onChangeHandler}
        />
        <button onClick={addTaskHandler}>+</button>
      </div>
      <ul>
        {
          props.tasks.map(t => {

              return (
                <li key={t.id}>
                  <input type="checkbox" checked={t.isDone} />
                  <span>{t.title}</span>
                  {/*<button onClick={() => { props.removeTask(t.id) }}>x</button>*/}
                  <Button name={'x'} callBack={() => removeTaskHandler(t.id)} />
                </li>
              )
            },
          )
        }
      </ul>
      <div>
        <Button name={'all'} callBack={() => mainFuncHandler('all')} />
        <Button name={'active'} callBack={() => mainFuncHandler('active')} />
        <Button name={'completed'} callBack={() => mainFuncHandler('completed')} />
        {/*<button onClick={() => { props.changeFilter('all') }}>All</button>*/}
        {/*<button onClick={onChangeFilterAllHandler}>All</button>*/}
        {/*<button onClick={() => mainFuncHandler('all')}>All</button>*/}
        {/*<button onClick={() => mainFuncHandler('active')}>Active</button>*/}
        {/*<button onClick={() => mainFuncHandler('completed')}>Completed</button>*/}
      </div>
    </div>
  )
}
