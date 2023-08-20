/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { Cross1Icon } from '@radix-ui/react-icons'
import { updateTeam as ut } from '../../features/teams/teamsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useAddTeamsMutation } from '../../features/teams/teamsApi'
import { useUpdateTeamMutation } from '../../features/teams/teamsApi'

import FormField from '../Form/FormField'

export default function CreateTeam({ setOpen }) {
    const team = useSelector((state) => state.teams)

    const [title, setTitle] = useState(team.title)
    const [description, setDescription] = useState(team.description)
    const [validationMessage, setValidationMessage] = useState('')

    const dispatch = useDispatch()

    // using useSelector hook from RTK Query to get authenticated user data
    const { user } = useSelector((state) => state.auth) || {}
    const { email } = user || {}

    const [addTeams, { isLoading, isSuccess }] = useAddTeamsMutation()
    const [updateTeam, { isSuccess: isSuccessUT }] = useUpdateTeamMutation()

    function handleSubmit(e) {
        // preventing page refresh after submitting form data
        e.preventDefault()
        if (!team.editing) {
            // using addTeam function to create a team
            if (title !== '') {
                addTeams({
                    title,
                    description,
                    email,
                    date: new Date().getTime(),
                    members: [user]
                })
            }
            // set a validation message so user doesn't keep title empty
            setValidationMessage('Please provide a team title')
        } else {
            updateTeam({ ...team, title, description })
        }
    }

    useEffect(() => {
        isSuccess && setOpen(false)
        isSuccessUT && dispatch(ut({ ...team, editing: false }))
    }, [isSuccess, isSuccessUT])

    return (
        <div className="fixed top-0 left-0 w-full flex items-center justify-center bg-[rgba(43,82,118,0.9)] h-full bg-opacity-60 z-10">
            <div className="bg-[#f6f8fa] border border-1-[hsl(210deg,18%,87%)] rounded-[6px] p-[16px]">
                <div className="flex items-center justify-between">
                    <p className="">Add new team!</p>
                    <button
                        onClick={() => {
                            team.editing
                                ? dispatch(ut({ ...team, editing: false }))
                                : setOpen(false)
                        }}
                    >
                        <Cross1Icon />
                    </button>
                </div>
                <form
                    className="w-[310px] mt-4 space-y-6"
                    onSubmit={handleSubmit}
                >
                    <FormField
                        type="text"
                        name="team"
                        id="team-name"
                        placeholder="Development"
                        value={title}
                        onChangeHandler={(e) => setTitle(e.target.value)}
                        className="appearance-none block w-full text-[14px] border border-1-[hsl(210deg,18%,87%)] rounded-[6px] py-[5px] px-[12px] mt-[4px] mb-[16px] focus:outline-none focus:border-[#0969da]"
                    />
                    <div>
                        <textarea
                            type="text"
                            name="title"
                            id="team-title"
                            placeholder="Concisely describe your team's purpose, goals, and focus."
                            className="appearance-none block w-full h-[100px] text-[14px] border border-1-[hsl(210deg,18%,87%)] rounded-[6px] py-[5px] px-[12px] mt-[4px] mb-[16px] focus:outline-none focus:border-[#0969da] resize-none"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    {!team.editing ? (
                        <input
                            type="submit"
                            name="submit"
                            id="submit"
                            value={isLoading ? 'Please wait' : 'Create team'}
                            className="appearance-none w-full !m-0 text-[14px] bg-[#2b5276] text-white border border-1 rounded-[6px] py-[5px] px-[16px] cursor-pointer hover:bg-[hsl(209,45%,29%)]"
                        />
                    ) : (
                        <input
                            type="submit"
                            name="submit"
                            id="submit"
                            value={'Update'}
                            className="appearance-none w-full !m-0 text-[14px] bg-[#2b5276] text-white border border-1 rounded-[6px] py-[5px] px-[16px] cursor-pointer hover:bg-[hsl(209,45%,29%)]"
                        />
                    )}
                    {validationMessage !== '' && (
                        <div className="w-full text-[14px] text-red-700 bg-red-100 border border-1 border-red-400 rounded-[6px] py-[5px] px-[12px] mt-[4px] mb-[16px]">
                            {validationMessage}
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}
