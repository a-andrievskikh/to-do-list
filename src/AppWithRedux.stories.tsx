import { Meta, StoryObj } from '@storybook/react'
import { AppWithRedux } from './AppWithRedux'
import { ReduxStoreProviderDecorator } from './store/ReduxStoreProviderDecorator'

const meta: Meta<typeof AppWithRedux> = {
  title: 'Todolists/AppWithRedux',
  component: AppWithRedux,
  tags: ['autodocs'],
  decorators: [ReduxStoreProviderDecorator],
}
export default meta

type Story = StoryObj<typeof AppWithRedux>

export const AppWithReduxStory: Story = {
  render: () => <AppWithRedux />,
}