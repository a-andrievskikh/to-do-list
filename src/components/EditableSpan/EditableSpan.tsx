import React from 'react'
import { TextField } from '@mui/material'

export type EditableSpan = {
  value: string
  onChangeTitle: (newValue: string) => void
}

export const EditableSpan: React.FC<EditableSpan> = React.memo((
    {
      value,
      onChangeTitle,
    }) => {
    console.log('EditableSpan rendered')
    const [editMode, setEditMode] = React.useState<boolean>(false)
    const [title, setTitle] = React.useState<string>('')

    const activateViewMode = React.useCallback(() => {
      setEditMode(false)
      onChangeTitle(title)
    }, [title])

    const activateEditMode = () => {
      setEditMode(true)
      setTitle(value)
    }

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return (
      editMode
        ? <TextField value={title}
                     variant={'outlined'}
                     size={'small'}
                     onChange={onChangeHandler}
                     onBlur={activateViewMode}
                     autoFocus
        />
        : <span onDoubleClick={activateEditMode}>{value}</span>
    )
  },
)