import { createSlice } from '@reduxjs/toolkit'

const teamsSlice = createSlice({
    name: 'teams',
    initialState: {
        editing: false,
        title: '',
        description: '',
        email: '',
        date: 0,
        members: [],
        id: 0
    },
    reducers: {
        updateTeam(_, action) {
            return action.payload
        },
        updateTeamMember(state, action) {
            // this is existing member from earlier
            const em = state.members.findIndex(
                (member) => member.id === action.payload.id
            )

            // if member already exists in the list then remove it otherwise add new member to the list
            if (em === -1) {
                state.members = [...state.members, action.payload]
            } else {
                state.members.splice(em, em + 1)
            }
        }
    }
})

export const { updateTeam, updateTeamMember } = teamsSlice.actions
export default teamsSlice
