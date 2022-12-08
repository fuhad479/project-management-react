import React, { useState } from 'react'
import TeamItems from './TeamItems'
import TeamsHead from './TeamsHead'
import TeamCardModal from './TeamCardModal';

const TeamsBody = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            {/* <TeamsHead /> */}
            <TeamItems />
        </>
    )
}

export default TeamsBody
