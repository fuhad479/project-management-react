import { useState } from 'react'
import { Cross1Icon } from '@radix-ui/react-icons'
import { useSelector } from 'react-redux'
import { useAddTeamsMutation } from '../../features/teams/teamsApi'

import FormField from '../Form/FormField'

const TeamCardModal = ({ setIsOpen }) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    // using useSelector hook from RTK Query to get authenticated user data
    const { user } = useSelector((state) => state.auth) || {}
    const { email } = user || {}

    const [addTeams] = useAddTeamsMutation()

    function handleSubmit(e) {
        // preventing page refresh after submitting form data
        e.preventDefault()
        // using addTeam function to create a team
        addTeams({
            title,
            description,
            email,
            date: new Date().getTime(),
            members: [user]
        })
    }

    return (
        <div className="fixed top-0 left-0 w-full flex items-center justify-center bg-[rgba(43,82,118,0.9)] h-full bg-opacity-60 z-10">
            <div className="bg-[#f6f8fa] border border-1-[hsl(210deg,18%,87%)] rounded-[6px] p-[16px]">
                <div className="flex items-center justify-between">
                    <p className="">Add new team!</p>
                    <button
                        onClick={() => setIsOpen(false)}
                        className=""
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
                        placeholder="Team title"
                        value={title}
                        onChangeHandler={(e) => setTitle(e.target.value)}
                        className="appearance-none block w-full text-[14px] border border-1-[hsl(210deg,18%,87%)] rounded-[6px] py-[5px] px-[12px] mt-[4px] mb-[16px] focus:outline-none focus:border-[#0969da]"
                    />
                    <div>
                        <textarea
                            type="text"
                            name="title"
                            id="team-title"
                            placeholder="Team description"
                            className="appearance-none block w-full h-[100px] text-[14px] border border-1-[hsl(210deg,18%,87%)] rounded-[6px] py-[5px] px-[12px] mt-[4px] mb-[16px] focus:outline-none focus:border-[#0969da] resize-none"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <input
                        type="submit"
                        name="submit"
                        id="submit"
                        value="Add team"
                        className="appearance-none w-full !m-0 text-[14px] bg-[#2b5276] text-white border border-1 rounded-[6px] py-[5px] px-[16px] cursor-pointer hover:bg-[hsl(209,45%,29%)]"
                    />
                </form>
            </div>
        </div>
    )
}

export default TeamCardModal
