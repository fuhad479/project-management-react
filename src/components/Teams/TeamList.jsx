import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useGetTeamsQuery } from '../../features/teams/teamsApi'
import TeamItem from './TeamItem'
import AddMember from '../modals/AddMember'

export default function TeamList() {
    const [open, setOpen] = useState(false)

    // using useSelector hook to get authenticated user data
    const { user } = useSelector((state) => state.auth) || {}

    // using getTeams hook from RTK Query to get teams data
    const { data: teams } = useGetTeamsQuery(user?.email, {
        refetchOnMountOrArgChange: true
    })

    return (
        <>
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
            {open && <AddMember setOpen={setOpen} />}
        </>
    )
}
