import { AnyAction, applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import { tasksReducer } from '../features/TodolistList/tasks-reducer'
import { todolistsReducer } from '../features/TodolistList/todolists-reducer'
import thunk, { ThunkDispatch } from 'redux-thunk'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

export type ThunkType = ThunkDispatch<AppRootStateType, any, AnyAction>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export type AppRootStateType = ReturnType<typeof rootReducer>

export const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store = store