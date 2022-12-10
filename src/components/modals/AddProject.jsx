/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Cross1Icon } from '@radix-ui/react-icons'
import { useAddProjectMutation } from '../../features/projects/projectsApi'
import { useGetTeamQuery } from '../../features/teams/teamsApi'
import FormField from '../Form/FormField'

export default function AddProject({ setAddProjectOpen }) {
    const [title, setTitle] = useState('')
    const [team, setTeam] = useState('')
    const [teamSkip, setTeamSkip] = useState(true)

    // using useselector hook from react-redux
    const { user } = useSelector((state) => state.auth)

    // using getTeam hook from RTK Query
    const { data: teams } = useGetTeamQuery(team, { skip: teamSkip })

    // using addProject hook from RTK Query
    const [addProject, { isSuccess }] = useAddProjectMutation()

    const timestamp = new Date().getTime()

    // form submit handler for creating a project
    function onSubmitHandler(event) {
        event.preventDefault()
        // using addProject function from RTK Query for creating a project
        addProject({
            team,
            title,
            status: 'backlog',
            timestamp: timestamp,
            author: user
        })
    }

    // debounce function
    function debounce() {
        let timeoutId
        return (team) => {
            clearTimeout(timeoutId)
            setTimeout(() => {
                if (team !== '') {
                    setTeam(team)
                    setTeamSkip(false)
                }
            }, 500)
        }
    }

    // debounce handler function
    const debounceHandler = debounce()

    useEffect(() => {
        isSuccess && setAddProjectOpen(false)
    }, [isSuccess])

    return (
        <div className="fixed top-0 left-0 w-full flex items-center justify-center bg-[rgba(43,82,118,0.9)] h-full bg-opacity-60 z-10">
            <div className="bg-white border border-1-[hsl(210deg,18%,87%)] rounded-[6px] p-[16px]">
                <div className="flex items-center justify-between">
                    <p className="">Add member on this team!</p>
                    <Cross1Icon
                        onClick={() => setAddProjectOpen(false)}
                        className="cursor-pointer"
                    />
                </div>
                <form
                    className="w-[310px] flex flex-col border border-[hsl(210deg,18%,87%)] rounded-[6px] bg-[hsl(210,29%,97%)] p-[16px] mt-[20px]"
                    onSubmit={onSubmitHandler}
                >
                    <FormField
                        id="project-title"
                        name="project-title"
                        type="text"
                        placeholder="Projec title"
                        className="appearance-none block w-full text-[14px] border border-1-[hsl(210deg,18%,87%)] rounded-[6px] py-[5px] px-[12px] mb-[16px] focus:outline-none focus:border-[#0969da]"
                        onChangeHandler={(event) =>
                            setTitle(event.target.value)
                        }
                    />
                    <FormField
                        id="search-team"
                        name="search-team"
                        type="text"
                        placeholder="Search team"
                        onChangeHandler={(event) =>
                            debounceHandler(event.target.value)
                        }
                        className="appearance-none block w-full text-[14px] border border-1-[hsl(210deg,18%,87%)] rounded-[6px] py-[5px] px-[12px] mb-[16px] focus:outline-none focus:border-[#0969da]"
                    />
                    {teams?.length > 0 && (
                        <div className="bg-white border border-[hsl(220,13%,91%)] rounded-[6px] mb-[16px]">
                            {teams.map((team) => (
                                <div
                                    onClick={(event) => {
                                        event.currentTarget.classList.toggle(
                                            'active'
                                        )
                                        setTeam(team.title)
                                    }}
                                    className="text-[14px] px-[16px] py-[8px] border-b border-b-red"
                                >
                                    {team.title}
                                </div>
                            ))}
                        </div>
                    )}
                    <input
                        type="submit"
                        name="submit"
                        id="submit"
                        value="Save project"
                        className="appearance-none text-[14px] bg-[#2b5276] text-white border border-1 rounded-[6px] py-[5px] px-[16px] cursor-pointer hover:bg-[hsl(209,45%,29%)]"
                    />
                </form>
            </div>
        </div>
    )
}
