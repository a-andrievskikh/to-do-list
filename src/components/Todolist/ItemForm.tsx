import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react'

export type ItemFormType = {
  addItem: (title: string) => void
}

export const ItemForm: FC<ItemFormType> = (props) => {
  const [taskTitle, setTaskTitle] = useState<string>('')
  const [error, setError] = useState<boolean>(false)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value)
  }

  const addItem = () => {
    if (taskTitle.trim()) {
      props.addItem(taskTitle.trim())
      setTaskTitle('')
    } else {
      setError(true)
    }
  }

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(false)
    if (e.key === 'Enter') {
      addItem()
    }
  }

  return (
    <div>
      <input className={error ? 'error' : ''}
             value={taskTitle}
             onChange={onChangeHandler}
             onKeyDown={onKeyDownHandler}
             placeholder={'Введи название'}
      />
      <button onClick={addItem}>+</button>
      <div className={'errorMessage'}>{error && 'Title is required!'}</div>
    </div>
  )
}