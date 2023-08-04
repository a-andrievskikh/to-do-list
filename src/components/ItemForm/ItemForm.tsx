import React from 'react'
import { IconButton, TextField } from '@mui/material'
import { AddBoxOutlined } from '@mui/icons-material'

export type ItemFormType = {
  addItem: (title: string) => void
}

export const ItemForm: React.FC<ItemFormType> = React.memo(({ addItem }) => {
    const [title, setTitle] = React.useState<string>('')
    const [isError, setIsError] = React.useState<boolean>(false)

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value)
    }

    const addNewItem = () => {
      if (title.trim()) {
        addItem(title.trim())
        setTitle('')
      } else {
        setIsError(true)
      }
    }

    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
      !title && setIsError(false)
      if (e.key === 'Enter') {
        e.preventDefault()
        addNewItem()
      }
    }

    return (
      <div>
        <TextField variant={'outlined'}
                   label={'Введите название'}
                   helperText={isError ? 'Title is required!' : ''}
                   size={'small'}
                   error={isError}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}
        />
        <IconButton
          onClick={addNewItem}
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
  },
)