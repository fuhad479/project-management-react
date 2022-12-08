import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useMatch } from 'react-router-dom'
import { userLoggedOut } from '../../features/auth/authSlice'
import { getSearchKeyword } from '../../features/search/searchSlice'
import { url } from 'gravatar'
import FormField from '../Form/FormField'

const Navigation = () => {
    const projects = useMatch('/projects')
    const teams = useMatch('/teams')

    const { user } = useSelector((state) => state.auth) || {}
    const { name, email } = user || {}
    const dispatch = useDispatch()

    const debounceHandler = (fn, delay) => {
        let timeoutId
        return (...arg) => {
            clearTimeout(timeoutId)

            timeoutId = setTimeout(() => {
                fn(...arg)
            }, delay)
        }
    }

    const doSearch = (value) => {
        dispatch(getSearchKeyword(value))
    }

    const handleSearch = debounceHandler(doSearch, 500)

    const handleLogout = () => {
        dispatch(userLoggedOut())
        localStorage.clear()
    }

    return (
        <div className="flex items-center gap-[15px] bg-astronaut py-[16px] px-[32px]">
            <FormField
                type="text"
                name="search"
                id="search"
                value=""
                className="appearance-none block text-[14px] bg-transparent border border-1-[hsl(210deg,18%,87%)] rounded-[6px] px-[12px] focus:outline-none focus:border-[#0969da]"
                onChangeHandler={() => console.log('changing this form field')}
            />
            <nav>
                <ul className="flex gap-[16px]">
                    <li>
                        <Link
                            className="text-white font-medium hover:text-[hsl(0,0%,80%)]"
                            to="/teams"
                        >
                            Teams
                        </Link>
                    </li>
                    <li>
                        <Link
                            className="text-white font-medium hover:text-[hsl(0,0%,80%)]"
                            to="/projects"
                        >
                            Projects
                        </Link>
                    </li>
                </ul>
            </nav>
            <div
                className="ml-auto cursor-pointer"
                onClick={handleLogout}
            >
                <img
                    className="rounded-full"
                    src={url(email, { size: 20 })}
                    alt={name}
                />
            </div>
        </div>
    )
}

export default Navigation
