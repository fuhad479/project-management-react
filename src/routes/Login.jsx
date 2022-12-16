import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../features/auth/authApi'
import FormField from '../components/Form/FormField'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // using navigation hook from react-router-dom
    const navigate = useNavigate()

    // using login hook from RTK Query
    const [login, { isLoading, isSuccess }] = useLoginMutation()

    const handleSubmit = (e) => {
        // preventing page refresh after submitting the login form
        e.preventDefault()

        // using login functon from RTK Query hook
        login({ email, password })
    }

    // handling side effects
    useEffect(() => {
        if (isSuccess) {
            // redirect to teams page after successfully loggedin
            navigate('/teams')
        }
    }, [isSuccess, navigate])

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
            <p className="text-[24px] font-thin mb-[16px]">
                Sign in to project management
            </p>
            <div className="flex gap-[16px]">
                <div className="border border-[hsl(210deg,18%,87%)] rounded-[6px] p-[16px]">
                    <p className="text-[14px] font-medium">Emails</p>
                    <p className="text-[14px]">emily@example.com</p>
                    <p className="text-[14px]">alex@example.com</p>
                    <p className="text-[14px]">alison@example.com</p>
                    <p className="text-[14px] mb-[16px]">john@example.com</p>
                    <p className="text-[14px] font-medium">Password</p>
                    <p className="text-[14px] mb-[16px]">123456</p>
                </div>
                <div className="">
                    <form
                        className="w-[310px] flex flex-col border border-[hsl(210deg,18%,87%)] rounded-[6px] bg-[hsl(210,29%,97%)] p-[16px]"
                        onSubmit={handleSubmit}
                    >
                        <FormField
                            label="Email address"
                            type="email"
                            name="email-address"
                            id="email-address"
                            value={email}
                            onChangeHandler={(e) => setEmail(e.target.value)}
                            className="appearance-none block w-full text-[14px] border border-1-[hsl(210deg,18%,87%)] rounded-[6px] py-[5px] px-[12px] mt-[4px] mb-[16px] focus:outline-none focus:border-[#0969da]"
                        />
                        <FormField
                            label="Password"
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChangeHandler={(e) => setPassword(e.target.value)}
                            className="appearance-none block w-full text-[14px] border border-1-[hsl(210deg,18%,87%)] rounded-[6px] py-[5px] px-[12px] mt-[4px] mb-[16px] focus:outline-none focus:border-[#0969da]"
                        />
                        <input
                            type="submit"
                            name="submit"
                            id="submit"
                            value={isLoading ? 'Signing in' : 'Sign in'}
                            className="appearance-none text-[14px] bg-[#2b5276] text-white border border-1 rounded-[6px] py-[5px] px-[16px] cursor-pointer hover:bg-[hsl(209,45%,29%)]"
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}
