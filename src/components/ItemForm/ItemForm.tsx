import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react'
import { IconButton, TextField } from '@mui/material'
import { AddBoxOutlined } from '@mui/icons-material'

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
      <TextField variant={'outlined'}
                 label={'Введите название'}
                 helperText={error ? 'Title is required!' : ''}
                 size={'small'}
                 error={error}
                 value={taskTitle}
                 onChange={onChangeHandler}
                 onKeyDown={onKeyDownHandler}
      />
      <IconButton
        onClick={addItem}
      >
        <AddBoxOutlined style={{
          width: '30px',
          height: '30px',
          minWidth: '30px',
          minHeight: '30px',
        }}
                        fontSize={'small'} />
      </IconButton>
    </div>
  )
}