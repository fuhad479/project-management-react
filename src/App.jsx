/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import { userLoggedIn } from './features/auth/authSlice'
import Login from './routes/Login'
import Projects from './routes/Projects'
import Teams from './routes/Teams'

export default function App() {
    // using dispatch function from react-redux
    const dispatch = useDispatch()

    const isAuthenticated = useAuth()

    useEffect(() => {
        const localAuth = JSON.parse(localStorage.getItem('auth'))
        if (localAuth) {
            dispatch(userLoggedIn({ ...localAuth }))
        }
    }, [])

    return (
        isAuthenticated && (
            <Routes>
                <Route
                    path="/"
                    element={
                        isAuthenticated ? <Navigate to="/teams" /> : <Login />
                    }
                />
                <Route
                    path="/teams"
                    element={!isAuthenticated ? <Navigate to="/" /> : <Teams />}
                />
                <Route
                    path="/projects"
                    element={
                        !isAuthenticated ? <Navigate to="/" /> : <Projects />
                    }
                />
            </Routes>
        )
    )
}
