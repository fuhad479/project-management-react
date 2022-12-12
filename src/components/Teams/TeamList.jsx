import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useGetTeamsQuery } from '../../features/teams/teamsApi'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import TeamItem from './TeamItem'
import AddMember from '../modals/AddMember'
import Spinner from '../Spinner'

export default function TeamList() {
    const [open, setOpen] = useState(false)

    // using useSelector hook to get authenticated user data
    const { user } = useSelector((state) => state.auth) || {}

    // using getTeams hook from RTK Query to get teams data
    const { data: teams, isLoading } = useGetTeamsQuery(user?.email, {
        refetchOnMountOrArgChange: true
    })

    return (
        <>
            {isLoading && (
                <div className="w-full h-[calc(100%-56px)] flex items-center justify-center">
                    <Spinner size={50} />
                </div>
            )}
            {teams?.length <= 0 && (
                <div className="w-full h-[calc(100%-106px)] flex flex-col items-center justify-center gap-[16px]">
                    <InfoCircledIcon
                        width={50}
                        height={50}
                        color='#2B5276'
                    />
                    <span>Sorry there is no team please create one</span>
                </div>
            )}
            {teams?.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 py-[25px] px-[32px] gap-[16px] overflow-auto">
                    {teams?.length > 0 &&
                        teams.map((team) => (
                            <TeamItem
                                key={team.id}
                                team={team}
                                setAddMemberOpen={setOpen}
                            />
                        ))}
                </div>
            )}
            {open && <AddMember setOpen={setOpen} />}
        </>
    )
}
