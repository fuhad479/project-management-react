import { useGetTeamInfoQuery } from '../../features/teams/teamsApi'
import { url } from 'gravatar'

import Spinner from '../Spinner'

export default function Team({ teamOpen, setTeamOpen }) {
    const { data, isSuccess, isLoading } =
        useGetTeamInfoQuery(teamOpen)

    return (
        <div className="fixed top-0 left-0 w-full flex items-center justify-center bg-[rgba(43,82,118,0.9)] h-full bg-opacity-60 z-10">
            {isLoading && (
                <div className="w-[344px] bg-white rounded-[6px] h-[194px] flex items-center justify-center">
                    <Spinner />
                </div>
            )}
            {isSuccess && (
                <div className="bg-[#f6f8fa] border border-1-[hsl(210deg,18%,87%)] rounded-[6px] p-[16px]">
                    <div className="flex gap-6">
                        <div className="pr-6 border-r">
                            <div className="flex items-center justify-between">
                                <p className="font-bold">{data.title}</p>
                            </div>
                            <div className="w-[310px] mt-4">
                                {data.description}
                            </div>
                        </div>
                        <div className="">
                            <div className="font-bold mb-4">Members</div>
                            <div className="space-y-2">
                                {data.members.map((user) => (
                                    <div className="flex items-center gap-1">
                                        <img
                                            className="rounded-full"
                                            src={url(user.email, { size: 25 })}
                                            alt=""
                                        />
                                        {user.username}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <input
                        onClick={() => setTeamOpen('')}
                        type="button"
                        name="submit"
                        id="submit"
                        value="Close"
                        className="appearance-none w-full mt-4 text-[14px] bg-[#2b5276] text-white border border-1 rounded-[6px] py-[5px] px-[16px] cursor-pointer hover:bg-[hsl(209,45%,29%)]"
                    />
                </div>
            )}
        </div>
    )
}
