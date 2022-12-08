import { useState } from 'react'
import { PlusIcon } from '@radix-ui/react-icons'
import Layout from '../components/base/Layout'
import CreateTeam from '../components/modals/CreateTeam'
import AddMember from '../components/modals/AddMember'
import TeamList from '../components/Teams/TeamList'
const Teams = () => {
    const [createTeamOpen, setCreateTeamOpen] = useState(false)
    const [addMemberOpen, setAddMemberOpen] = useState(false)

    return (
        <Layout>
            <div className="py-[16px] px-[32px] flex justify-between">
                <h1 className="">Teams</h1>
                <button
                    onClick={() => setCreateTeamOpen(true)}
                    className="flex items-center gap-[5px] bg-[hsl(209,47%,32%)] text-white border border-1 rounded-[6px] py-[3px] px-[12px] text-[14px] hover:bg-[hsl(209,45%,29%)]"
                >
                    <PlusIcon />
                    <span className="block">New team</span>
                </button>
            </div>
            <TeamList setAddMemberOpen={setAddMemberOpen} />
            {createTeamOpen && <CreateTeam setIsOpen={setCreateTeamOpen} />}
            {addMemberOpen && <AddMember setAddMemberOpen={setAddMemberOpen} />}
        </Layout>
    )
}

export default Teams
