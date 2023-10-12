import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import { TasksActionsT, tasksReducer } from '../features/TodolistList/tasks-reducer'
import { TodolistActionsT, todolistsReducer } from '../features/TodolistList/todolists-reducer'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AppActionsT, appReducer } from './app-reducer'
import { AuthActionsT, authReducer } from '../features/Login/auth-reducer'

export const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
  auth: authReducer,
})
export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateT = ReturnType<typeof rootReducer>
export type AppRootActionsT = TodolistActionsT | TasksActionsT | AppActionsT | AuthActionsT
export type AppDispatch = ThunkDispatch<AppRootStateT, unknown, AppRootActionsT>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateT, unknown, AppRootActionsT>

// @ts-ignore
window.store = store