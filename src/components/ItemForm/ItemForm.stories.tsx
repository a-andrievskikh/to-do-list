import { Meta, StoryObj } from '@storybook/react'
import { ItemForm, ItemFormT } from './ItemForm'
import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { IconButton, TextField } from '@mui/material'
import { AddBoxOutlined } from '@mui/icons-material'

const meta: Meta<typeof ItemForm> = {
  title: 'Todolists/ItemForm',
  component: ItemForm,
  tags: ['autodocs'],
  argTypes: {
    addItem: {
      description: 'Button clicked inside form',
      action: 'clicked',
    },
  },
}
export default meta

type Story = StoryObj<typeof ItemForm>

export const ItemFormStory: Story = {}

const ItemFormWithError = (args: ItemFormT) => {
  const [title, setTitle] = useState<string>('')
  const [isError, setIsError] = useState<boolean>(true)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

  const addNewItem = () => {
    if (title.trim()) {
      args.addItem(title.trim())
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
}

export const ItemFormWithErrorStory: Story = {
  render: (args) => <ItemFormWithError addItem={args.addItem} disabled={args.disabled} />,
}

const ItemFormDisabled = (args: ItemFormT) => {
  const [title, setTitle] = useState<string>('')
  const [isError, setIsError] = useState<boolean>(false)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

  const addNewItem = () => {
    if (title.trim()) {
      args.addItem(title.trim())
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
                 disabled={args.disabled}
      />
      <IconButton
        onClick={addNewItem}
        disabled={args.disabled}
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

export const ItemFormDisabledStory: Story = {
  render: (args) => <ItemFormDisabled addItem={args.addItem} disabled={true} />,
}