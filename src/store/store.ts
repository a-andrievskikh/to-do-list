import { combineReducers, legacy_createStore } from 'redux'
import { tasksReducer } from './tasks-reducer'
import { todolistsReducer } from './todolists-reducer'

export type AppRootStateType = ReturnType<typeof rootReducer>

export const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
})

export const store = legacy_createStore(rootReducer)

// @ts-ignore
window.store = store