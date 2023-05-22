import React from 'react'


type ToDoListPropsType = {
  truck: string
  truck2?: number
  truck3?: boolean
  tasks: TaskType[] // В ПРОДАКШЕНЕ ПИШУТ ТАК, НЕ Array<object>
}

type TaskType = {
  id: number
  title: string
  isDone: boolean
}
export const TodoList = (props: ToDoListPropsType) => {
  return (
    <div>
      <h3>{props.truck}</h3>
      <h3>{props.truck2}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>
        {props.tasks.map(item => {
          return (
            <li><input type="checkbox" checked={item.isDone} /><span>{item.title}</span></li>
          )
        })}
      </ul>
      <div>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  )
}
