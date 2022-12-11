import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from '../features/api/apiSlice'
import authReducer from '../features/auth/authSlice'
import searchReducer from '../features/search/searchSlice'
import teamsSlice from '../features/teams/teamsSlice'

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        search: searchReducer,
        teams: teamsSlice.reducer
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware)
})
