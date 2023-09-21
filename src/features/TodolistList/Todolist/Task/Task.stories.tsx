import { Meta, StoryObj } from '@storybook/react'
import { Task } from './Task'
import { ReduxStoreProviderDecorator, todolistID1 } from '../../../../stories/ReduxStoreProviderDecorator'
import { useSelector } from 'react-redux'
import { AppRootStateType } from '../../../../app/store'
import { TaskType } from '../../../../api/tasks-api'

const meta: Meta<typeof Task> = {
  title: 'Todolists/Task',
  component: Task,
  tags: ['autodocs'],
  decorators: [ReduxStoreProviderDecorator],
}
export default meta

type Story = StoryObj<typeof Task>

const TaskWithRedux = () => {
  const task = useSelector<AppRootStateType, TaskType>(state => state.tasks[todolistID1][0])
  return task ?
    <Task taskID={task.id} title={task.title} status={task.status} todolistID={todolistID1} />
    : <>Tasks have expired. Restart Storybook</>
}

export const TaskStory: Story = {
  render: () => <TaskWithRedux />,
}