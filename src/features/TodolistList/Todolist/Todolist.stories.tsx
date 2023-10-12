import { Meta, StoryObj } from '@storybook/react'
import { Todolist } from './Todolist'
import { ReduxStoreProviderDecorator } from '../../../stories/ReduxStoreProviderDecorator'
import { useSelector } from 'react-redux'
import { AppRootStateT } from '../../../app/store'
import { TodolistDomainT } from '../todolists-reducer'

const meta: Meta<typeof Todolist> = {
  title: 'Todolists/Todolist',
  component: Todolist,
  tags: ['autodocs'],
  decorators: [ReduxStoreProviderDecorator],
}
export default meta

type Story = StoryObj<typeof Todolist>

const TodolistWithRedux = () => {
  const todolist = useSelector<AppRootStateT, TodolistDomainT>(state => state.todolists[0])
  const demo = true

  return todolist ?
    <Todolist todolist={todolist} demo={demo} />
    : <>Todolist have expired. Restart Storybook</>
}

export const TodolistStory: Story = {
  render: () => <TodolistWithRedux />,
}