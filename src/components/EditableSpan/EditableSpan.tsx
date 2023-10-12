import TextField from '@mui/material/TextField'
import { ChangeEvent, memo, useCallback, useState } from 'react'

export const EditableSpan = memo(({ value, onChangeTitle }: EditableSpanPropsT) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')

    const activateViewMode = useCallback(() => {
      setEditMode(false)
      onChangeTitle(title)
    }, [onChangeTitle, title])

    const activateEditMode = () => {
      setEditMode(true)
      setTitle(value)
    }

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) =>
      setTitle(e.currentTarget.value), [setTitle])

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

// Types
export type EditableSpanPropsT = {
  value: string
  onChangeTitle: (newValue: string) => void
}