import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateTeam } from '../../features/teams/teamsSlice'
import {
    DotsVerticalIcon,
    TrashIcon,
    Pencil1Icon,
    Cross1Icon
} from '@radix-ui/react-icons'
import { ReactComponent as PersonAdd } from '../../assets/person-add.svg'
import { useDeleteTeamMutation } from '../../features/teams/teamsApi'
import { url } from 'gravatar'
import moment from 'moment'

export default function TeamItem({ team, setAddMemberOpen, setTeamOpen }) {
    const [open, setOpen] = useState(false)

    // dispatch function from react-redux
    const dispatch = useDispatch()

    // using deleteTeam hook from RTK Query
    const [deleteTeam] = useDeleteTeamMutation()

    // using useSelector hook from RTK Query to get authenticated user data
    const { user } = useSelector((state) => state.auth) || {}
    const { email } = user || {}
    const { id, title, description, date, members } = team || {}

    return (
        <>
            <div
                onClick={() => setTeamOpen(team.id)}
                className="border border-astronaut-200 shadow-[0_0_20px_5px] shadow-astronaut-100 rounded-[6px] p-[16px] cursor-pointer"
            >
                <div className="flex items-center justify-between mb-[8px] relative">
                    <span
                        className={`inline-block border border-astronaut-200 rounded-full py-[3px] px-[12px] text-[12px] font-medium uppercase `}
                    >
                        {title}
                    </span>
                    {open && (
                        <div className="absolute right-[25px] flex items-center">
                            <div
                                onClick={(event) => {
                                    event.stopPropagation()
                                    deleteTeam({ id, email })
                                }}
                                className="w-[25px] h-[25px] flex items-center justify-center border border-transparent rounded-full hover:border-astronaut-200"
                            >
                                <TrashIcon />
                            </div>
                            <div
                                onClick={(event) => {
                                    event.stopPropagation()
                                    setAddMemberOpen(true)
                                    dispatch(updateTeam(team))
                                }}
                                className="w-[25px] h-[25px] flex items-center justify-center border border-transparent rounded-full hover:border-astronaut-200"
                            >
                                <PersonAdd />
                            </div>
                            {/* <div className="w-[25px] h-[25px] flex items-center justify-center border border-transparent rounded-full hover:border-astronaut-200">
                                <Pencil1Icon />
                            </div> */}
                        </div>
                    )}
                    <div
                        onClick={(event) => {
                            event.stopPropagation()
                            setOpen(!open)
                        }}
                        className={`w-[25px] h-[25px] flex items-center justify-center border border-transparent rounded-full hover:border-astronaut-200 ${
                            open && 'border-astronaut-200'
                        }`}
                    >
                        {open ? <Cross1Icon /> : <DotsVerticalIcon />}
                    </div>
                </div>
                <p className="text-[14px]">{description}</p>
                <div className="flex items-center justify-between mt-3 relative">
                    <p className="w-auto grow text-[14px] font-bold">
                        {moment(date).format('MMM DD')}
                    </p>
                    <div className="absolute w-auto h-full flex right-0 ml-auto -space-x-2">
                        {members
                            .filter((member) => member.id <= 3)
                            .map((member) => (
                                <img
                                    key={member.email}
                                    src={url(member.email, {
                                        size: 25
                                    })}
                                    alt="gravatar"
                                    className="rounded-full"
                                />
                            ))}
                        {members.length > 3 && (
                            <div className="w-[21px] h-[21px] flex items-center justify-center rounded-full text-[11px] text-white tracking-[0px] bg-black z-10">
                                +{members.length - 3}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
