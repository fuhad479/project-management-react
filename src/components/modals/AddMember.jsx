/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateTeamMember } from '../../features/teams/teamsSlice'
import { Cross1Icon } from '@radix-ui/react-icons'
import { useGetUserQuery } from '../../features/users/usersApi'
import { useAddTeamMemberMutation } from '../../features/teams/teamsApi'
import { url } from 'gravatar'
import isValidEmail from '../../utils/isValidEmail'
import FormField from '../Form/FormField'
import Spinner from '../Spinner'

export default function AddMember({ setOpen }) {
    const [email, setEmail] = useState('')
    const [skip, setSkip] = useState(true)

    // dispatch function from react-redux
    const dispatch = useDispatch()

    // using useSelector hook from RTK Query to get single team data
    const { id, members } = useSelector((state) => state.teams)

    // using getUser hook from RTK Query
    const { data, isLoading, isSuccess } = useGetUserQuery(email, { skip })

    // using addTeamMember hook from RTK Query
    const [
        addTeamMember,
        { isLoading: addTeamMemberLoading, isSuccess: addTeamMemberSuccess }
    ] = useAddTeamMemberMutation()

    // this is debounce function
    function debounce() {
        let timeoutId
        return (email) => {
            clearTimeout(timeoutId)
            timeoutId = setTimeout(() => {
                if (isValidEmail(email)) {
                    setEmail(email)
                    setSkip(false)
                }
            }, 1000)
        }
    }

    const debounceHandler = debounce()

    // function for assigning team member
    function assignTeamMember(event) {
        // addTeamMember function from RTK Query for assigning a team member to existing team
        addTeamMember({ id, data: { members } })
    }

    useEffect(() => {
        addTeamMemberSuccess && setOpen(false)
    }, [addTeamMemberSuccess])

    return (
        <div className="fixed top-0 left-0 w-full flex items-center justify-center bg-[rgba(43,82,118,0.9)] h-full bg-opacity-60 z-10">
            <div className="bg-white border border-1-[hsl(210deg,18%,87%)] rounded-[6px] p-[16px]">
                <div className="flex items-center justify-between">
                    <p className="">Add member on this team!</p>
                    <button
                        onClick={() => setOpen(false)}
                        className=""
                    >
                        <Cross1Icon />
                    </button>
                </div>
                <form
                    onSubmit={() => console.log('on submit')}
                    className="w-[310px] flex flex-col border border-[hsl(210deg,18%,87%)] rounded-[6px] bg-[hsl(210,29%,97%)] p-[16px] mt-[20px]"
                >
                    <FormField
                        label="Email address"
                        type="email"
                        name="email-address"
                        id="email-address"
                        onChangeHandler={(e) => debounceHandler(e.target.value)}
                        className="appearance-none block w-full text-[14px] border border-1-[hsl(210deg,18%,87%)] rounded-[6px] py-[5px] px-[12px] mt-[4px] focus:outline-none focus:border-[#0969da]"
                    />
                </form>
                {isLoading ? (
                    <div className="w-full flex justify-center mt-[16px]">
                        <Spinner />
                    </div>
                ) : (
                    isSuccess &&
                    data.length > 0 && (
                        <>
                            <p className="text-[14px] mt-[20px]">Click to select members</p>
                            <div
                                onClick={(event) => {
                                    // indication if member is selected or not
                                    event.currentTarget.classList.toggle(
                                        'active'
                                    )
                                    dispatch(updateTeamMember(data[0]))
                                }}
                                className="w-[310px] flex items-center gap-[10px] border border-[hsl(210deg,18%,87%)] rounded-[6px] p-[8px] mt-2 cursor-pointer"
                            >
                                <img
                                    src={url(data[0].email, { size: 40 })}
                                    alt="avata"
                                    className="rounded-full"
                                />
                                <div className="leading-[20px]">
                                    <p className="text-[14px] font-medium">
                                        {data[0]?.username}
                                    </p>
                                    <p className="text-[14px]">
                                        {data[0]?.email}
                                    </p>
                                </div>
                            </div>
                            <input
                                type="submit"
                                name="submit"
                                id="submit"
                                value={
                                    addTeamMemberLoading
                                        ? 'Please wait'
                                        : 'Assign member'
                                }
                                onClick={assignTeamMember}
                                className="appearance-none w-full text-[14px] bg-[#2b5276] text-white border border-1 rounded-[6px] py-[5px] px-[16px] mt-[20px] cursor-pointer hover:bg-[hsl(209,45%,29%)]"
                            />
                        </>
                    )
                )}
                {data && data.length === 0 && <div className='w-full text-[14px] text-red-700 bg-red-100 border border-1 border-red-400 rounded-[6px] py-[5px] px-[12px] mt-3 mb-[16px]'>No user found with this email address</div>}
            </div>
        </div>
    )
}
