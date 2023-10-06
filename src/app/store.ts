import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import { TasksActionsType, tasksReducer } from '../features/TodolistList/tasks-reducer'
import { TodolistActionsType, todolistsReducer } from '../features/TodolistList/todolists-reducer'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AppActionsType, appReducer } from './app-reducer'

export const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
})
export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppRootActionsType = TodolistActionsType | TasksActionsType | AppActionsType
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppRootActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppRootActionsType>

// @ts-ignore
window.store = store