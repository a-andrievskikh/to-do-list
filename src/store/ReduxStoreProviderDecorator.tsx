import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { AppRootStateType } from './store'
import { combineReducers, legacy_createStore } from 'redux'
import { tasksReducer } from './tasks-reducer'
import { todolistsReducer } from './todolists-reducer'
import { v1 } from 'uuid'
import { TaskStatuses } from '../api/tasks-api'

export const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
})

export const todolistID1 = v1()
export const todolistID2 = v1()

const initialGlobalState = {
  todolists: [
    { id: todolistID1, title: 'What to learn', filter: 'all', addedDate: '', order: 0 },
    { id: todolistID2, title: 'What to buy', filter: 'all', addedDate: '', order: 0 },
  ],
  tasks: {
    [todolistID1]: [
      {
        id: v1(), title: 'HTML & CSS', status: TaskStatuses.Completed,
        todoListId: todolistID1, description: '', priority: 0, startDate: '',
        deadline: '', order: 0, addedDate: '',
      },
      {
        id: v1(), title: 'JS', status: TaskStatuses.New,
        todoListId: todolistID1, description: '', priority: 0,
        startDate: '', deadline: '', order: 0, addedDate: '',
      },
    ],
    [todolistID2]: [
      {
        id: v1(), title: 'Book', status: TaskStatuses.Completed,
        todoListId: todolistID2, description: '', priority: 0, startDate: '',
        deadline: '', order: 0, addedDate: '',
      },
      {
        id: v1(), title: 'Toy', status: TaskStatuses.New,
        todoListId: todolistID2, description: '', priority: 0,
        startDate: '', deadline: '', order: 0, addedDate: '',
      },
    ],
  },

}

export const storybookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType)

export const ReduxStoreProviderDecorator = (storyFn: () => ReactNode) => {
  return <Provider store={storybookStore}>{storyFn()}</Provider>
}