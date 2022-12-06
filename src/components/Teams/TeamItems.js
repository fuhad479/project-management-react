import { Oval } from 'react-loader-spinner'
import { useSelector } from 'react-redux'
import { useGetTeamsQuery } from '../../features/teams/teamsApi'
import TeamItem from './TeamItem'

const TeamItems = () => {
    // using useSelector hook to get authenticated user data
    const { user } = useSelector((state) => state.auth) || {}

    // using getTeams hook from RTK Query to get teams data
    const {
        data: teams,
        isLoading: isTeamsLoad,
        isError: isTeamsError
    } = useGetTeamsQuery(user?.email, { refetchOnMountOrArgChange: true })

    // manage content
    let content

    if (isTeamsLoad) {
        content = (
            <div className="px-10 mt-4 h-full flex items-center justify-center">
                <Oval
                    height={70}
                    width={70}
                    color="#5b21b6"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="oval-loading"
                    secondaryColor="#ddd6fe"
                    strokeWidth={4}
                    strokeWidthSecondary={3}
                />
            </div>
        )
    } else if (!isTeamsLoad && isTeamsError) {
        content = (
            <div className="px-10 mt-4 h-full flex flex-col items-center justify-center">
                <p className="mt-2 text-lg">Something went wrong!</p>
            </div>
        )
    } else if (!isTeamsLoad && !isTeamsError && teams.length === 0) {
        content = (
            <div className="px-10 mt-4 h-full flex flex-col items-center justify-center">
                <p className="mt-2 text-lg">No team founded!</p>
            </div>
        )
    } else if (!isTeamsLoad && !isTeamsError && teams.length > 0) {
        content = (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-10 mt-4 gap-6 overflow-auto">
                {teams.map((team) => (
                    <TeamItem
                        key={team.id}
                        team={team}
                    />
                ))}
            </div>
        )
    }

    return content
}

export default TeamItems
