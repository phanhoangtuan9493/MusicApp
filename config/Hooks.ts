import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './Store'
import { select } from 'redux-saga/effects'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export function* appSelect<TSelected>(selector: (state: RootState) => TSelected,):
    Generator<any, TSelected, TSelected> { return yield select(selector); }
