import { useSelector } from 'react-redux'

export function useAuth() {
    // using useSelector hook from react-redux to get authenticated user
    const { accessToken, user } = useSelector((state) => state.auth)

    return accessToken && user ? true : false
}
