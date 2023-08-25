import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { AppRootStateType } from './store'
import { combineReducers, legacy_createStore } from 'redux'
import { tasksReducer } from './tasks-reducer'
import { todolistsReducer } from './todolists-reducer'
import { v1 } from 'uuid'

export const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
})

export const todolistID1 = v1()
export const todolistID2 = v1()

const initialGlobalState = {
  todolists: [
    { id: todolistID1, title: 'What to learn', filter: 'all' },
    { id: todolistID2, title: 'What to buy', filter: 'all' },
  ],
  tasks: {
    [todolistID1]: [
      { id: v1(), title: 'HTML & CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: false },
    ],
    [todolistID2]: [
      { id: v1(), title: 'Book', isDone: true },
      { id: v1(), title: 'Toy', isDone: false },
    ],
  },

}

export const storybookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType)

export const ReduxStoreProviderDecorator = (storyFn: () => ReactNode) => {
  return <Provider store={storybookStore}>{storyFn()}</Provider>
}