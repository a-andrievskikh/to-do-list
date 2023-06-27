import React, { ChangeEvent, FC, useState } from 'react'

type EditableSpanPropsType = {
  title: string
  classes: string
  changeTitle: (title: string) => void
}

export const EditableSpan: FC<EditableSpanPropsType> = (props) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')

  const changeItemTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

  const offEditModeHandler = () => {
    setIsEditMode(false)
    props.changeTitle(title)
  }

  const onEditModeHandler = () => {
    setIsEditMode(true)
    setTitle(props.title)
  }

  return (
    isEditMode
      ? <input
        value={title}
        onChange={changeItemTitle}
        onBlur={offEditModeHandler}
        autoFocus
      />
      : <span
        onDoubleClick={onEditModeHandler}
        className={props.classes}
      >{props.title}</span>
  )
}