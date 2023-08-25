import { Meta, StoryObj } from '@storybook/react'
import { Todolist, TodolistPropsType } from './Todolist'
import { ReduxStoreProviderDecorator } from '../../store/ReduxStoreProviderDecorator'
import { useSelector } from 'react-redux'
import { AppRootStateType } from '../../store/store'

const meta: Meta<typeof Todolist> = {
  title: 'Todolists/Todolist',
  component: Todolist,
  tags: ['autodocs'],
  decorators: [ReduxStoreProviderDecorator],
}
export default meta

type Story = StoryObj<typeof Todolist>

const TodolistWithRedux = () => {
  const todolist = useSelector<AppRootStateType, TodolistPropsType>(state => state.todolists[0])
  return todolist ?
    <Todolist id={todolist.id} title={todolist.title} filter={todolist.filter} />
    : <>Todolist have expired. Restart Storybook</>
}

export const TodolistStory: Story = {
  render: () => <TodolistWithRedux />,
}