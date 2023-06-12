import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { FilterValuesType, TaskType } from './App'
import styles from './Todolist.module.css'
import { CheckBox } from './components/CheckBox'


type PropsType = {
  title: string
  tasks: TaskType[]
  addTask: (title: string) => void
  removeTask: (taskId: string) => void
  changeFilter: (value: FilterValuesType) => void
  changeIsDone: (newId: string, newIsDone: boolean) => void
}

export const Todolist = (props: PropsType) => {
  const [error, setError] = useState<string | null>('')
  const [title, setTitle] = useState('')

  const addTask = () => {
    if (title.trim()) {
      props.addTask(title.trim())
      setTitle('')
    } else {
      setError('Title is required')
    }
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setError('')
    setTitle(e.currentTarget.value)
  }
  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => { if (e.key === 'Enter') addTask() }

  const [buttonName, setButtonName] = useState<FilterValuesType>('all')

  const onClickChangeHandler = (value: FilterValuesType) => {
    props.changeFilter(value)
    setButtonName(value)
  }

  const changeIsDoneHandler = (tId: string, isDone: boolean) => {
    props.changeIsDone(tId, isDone)
  }

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input className={error ? styles.error : ''}
               value={title}
               onChange={onChangeHandler}
               onKeyDown={onKeyDownHandler}
               placeholder={'Введи название таски'}
        />
        <button onClick={addTask}>+</button>
        {error && <div className={styles.errorMessage}>{error}</div>}
      </div>
      <ul>
        {
          props.tasks.map(t => {
            const onClickHandler = () => props.removeTask(t.id)

            return (
              <li key={t.id} className={t.isDone ? styles.isDone : ''}>
                <CheckBox checked={t.isDone}
                          callBack={(isDone) => changeIsDoneHandler(t.id, isDone)} />
                <span>{t.title}</span>
                <button onClick={onClickHandler}>x</button>
              </li>
            )
          })
        }
      </ul>
      <div>
        <button className={buttonName === 'all' ? styles.activeFilter : ''}
                onClick={() => onClickChangeHandler('all')}>All
        </button>
        <button className={buttonName === 'active' ? styles.activeFilter : ''}
                onClick={() => onClickChangeHandler('active')}>Active
        </button>
        <button className={buttonName === 'completed' ? styles.activeFilter : ''}
                onClick={() => onClickChangeHandler('completed')}>Completed
        </button>
      </div>
    </div>
  )
}
