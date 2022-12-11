import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { userLoggedOut } from '../../features/auth/authSlice'
import { url } from 'gravatar'
import FormField from '../Form/FormField'

const Navigation = () => {
    const { user } = useSelector((state) => state.auth) || {}
    const { username, email } = user || {}
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(userLoggedOut())
        localStorage.clear()
    }

    return (
        <div className="flex items-center gap-[15px] bg-astronaut py-[16px] px-[32px]">
            {/* <FormField
                type="text"
                name="search"
                id="search"
                value=""
                className="appearance-none block text-[14px] bg-transparent border border-1-[hsl(210deg,18%,87%)] rounded-[6px] px-[12px] focus:outline-none focus:border-[#0969da]"
                onChangeHandler={() => console.log('changing this form field')}
            /> */}
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
                className="ml-auto cursor-pointer flex items-center gap-[10px]"
                onClick={handleLogout}
            >
                <span className="block text-white">{username}</span>
                <img
                    className="rounded-full"
                    src={url(email, { size: 20 })}
                    alt={username}
                />
            </div>
        </div>
    )
}

export default Navigation
