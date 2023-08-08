import { TextField } from '@mui/material'
import { ChangeEvent, memo, useCallback, useState } from 'react'

export type EditableSpan = {
  value: string
  onChangeTitle: (newValue: string) => void
}

export const EditableSpan = memo(({ value, onChangeTitle }: EditableSpan) => {
    console.log('EditableSpan rendered')
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')

    const activateViewMode = useCallback(() => {
      setEditMode(false)
      onChangeTitle(title)
    }, [title])

    const activateEditMode = () => {
      setEditMode(true)
      setTitle(value)
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
        : <span onDoubleClick={activateEditMode}>{value}</span>
    )
  },
)