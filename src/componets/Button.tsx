import React from 'react'

type PropsType = {
  name: string
  callBack: () => void
}

export const Button = (props: PropsType) => {

  const onclickHandler = () => {
    props.callBack()
  }

  return (
    <button onClick={onclickHandler}>{props.name}</button>
  )
}