import React, { ChangeEvent, FC, useState } from 'react'
import { FilterValuesType, TaskType } from './App'
import { AddItemForm } from './AddItemForm'
import { EditableSpan } from './EditableSpan'

type TodoListPropsType = {
  todoListId: string
  title: string
  filter: FilterValuesType
  tasks: TaskType[]
  removeTask: (todoListId: string, taskId: string) => void
  removeTodoList: (todoListId: string) => void
  addTask: (todoListId: string, title: string) => void
  changeFilter: (todoListId: string, nextFilterValue: FilterValuesType) => void
  changeTaskStatus: (todoListId: string, taskId: string, newIsDoneValue: boolean) => void
  changeTaskTitle: (todoListId: string, taskId: string, title: string) => void
  changeTodoListTitle: (todoListId: string, title: string) => void
}

export const TodoList: FC<TodoListPropsType> = (props) => {
  const maxTaskTitleLength = 15
  const tasksList =
    props.tasks.length === 0
      ? <p>TodoList is empty</p>
      : <ul className={'tasks-list'}>
        {
          props.tasks.map((task) => {
            const removeTask = () => props.removeTask(props.todoListId, task.id)
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
              props.changeTaskStatus(props.todoListId, task.id, e.currentTarget.checked)
            const changeTaskTitle = (title: string) => {
              props.changeTaskTitle(props.todoListId, task.id, title)
            }
            return (
              <li key={task.id} className={'tasks-list-item'}>
                <div>
                  <input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={changeTaskStatus}
                  />
                  {/*<span className={task.isDone ? 'task-done' : 'task'}>{task.title}</span>*/}
                  <EditableSpan
                    classes={task.isDone ? 'task-done' : 'task'}
                    title={task.title}
                    changeTitle={changeTaskTitle}
                  />
                </div>
                <button onClick={removeTask}>x</button>
              </li>
            )
          })
        }
      </ul>

  const addTask = (title: string) => props.addTask(props.todoListId, title)
  const changeTodoListTitle = (title: string) => {
    props.changeTodoListTitle(props.todoListId, title)
  }
  return (
    <div className="todoList">
      <h3 className={'todolist-header'}>
        <EditableSpan title={props.title} classes={''} changeTitle={changeTodoListTitle} />
        <button onClick={() => props.removeTodoList(props.todoListId)}>x</button>
      </h3>
      <AddItemForm maxItemTitleLength={maxTaskTitleLength} addItem={addTask} />
      {tasksList}
      <div className={'buttons-block'}>
        <button
          className={props.filter === 'All' ? 'btn-filter-active' : ''}
          onClick={() => props.changeFilter(props.todoListId, 'All')}>All
        </button>
        <button
          className={props.filter === 'Active' ? 'btn-filter-active' : ''}
          onClick={() => props.changeFilter(props.todoListId, 'Active')}>Active
        </button>
        <button
          className={props.filter === 'Completed' ? 'btn-filter-active' : ''}
          onClick={() => props.changeFilter(props.todoListId, 'Completed')}>Completed
        </button>
      </div>
    </div>
  )
}