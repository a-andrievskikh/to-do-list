import { IconButton, TextField } from '@mui/material'
import { KeyboardEvent, ChangeEvent, memo, useState } from 'react'
import { AddBoxOutlined } from '@mui/icons-material'

export type ItemFormType = {
  addItem: (title: string) => void
}

export const ItemForm = memo(({ addItem }: ItemFormType) => {
    const [title, setTitle] = useState<string>('')
    const [isError, setIsError] = useState<boolean>(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
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

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
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