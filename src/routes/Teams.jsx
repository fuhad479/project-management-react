import { useState } from 'react'
import { useSelector } from 'react-redux'
import { PlusIcon } from '@radix-ui/react-icons'
import Layout from '../components/base/Layout'
import TeamList from '../components/Teams/TeamList'
import CreateTeam from '../components/modals/CreateTeam'

export default function Teams() {
    const [open, setOpen] = useState(false)

    const { editing } = useSelector((state) => state.teams)

    return (
        <Layout>
            <TeamList />
            <button
                onClick={() => setOpen(true)}
                className="absolute bottom-6 right-6  w-[50px] h-[50px] flex items-center justify-center gap-[5px] bg-[hsl(209,47%,32%)] text-white border border-1 rounded-full py-[3px] px-[12px] text-[14px] hover:bg-[hsl(209,45%,29%)]"
            >
                <PlusIcon
                    width={30}
                    height={30}
                />
            </button>
            {open && <CreateTeam setOpen={setOpen} />}
            {editing && <CreateTeam setOpen={setOpen} />}
        </Layout>
    )
}
