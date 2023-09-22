import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import { TasksActionsType, tasksReducer } from '../features/TodolistList/tasks-reducer'
import { TodolistActionsType, todolistsReducer } from '../features/TodolistList/todolists-reducer'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'

export const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
})
export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppActionsType = TodolistActionsType | TasksActionsType
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

// @ts-ignore
window.store = store