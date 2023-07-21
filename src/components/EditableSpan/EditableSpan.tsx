import React, { ChangeEvent, FC, useState } from 'react'
import { TextField } from '@mui/material'

export type EditableSpan = {
  value: string
  onChange: (newValue: string) => void
}

export const EditableSpan: FC<EditableSpan> = (props) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')


  const activateViewMode = () => {
    setEditMode(false)
    props.onChange(title)
  }

  const activateEditMode = () => {
    setEditMode(true)
    setTitle(props.value)
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

  return (
    editMode
      ? <TextField value={title}
                   variant={'outlined'}
                   size={'small'}
                   onChange={onChangeHandler}
                   onBlur={activateViewMode}
                   autoFocus
      />
      : <span onDoubleClick={activateEditMode}>{props.value}</span>
  )
}