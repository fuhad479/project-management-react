import { useState } from 'react'
import { useEditProjectMutation } from '../../features/projects/projectsApi'
import { useDrop } from 'react-dnd'
import ProjectItem from './ProjectItem'
import AddProjectModal from '../modals/AddProject'

export default function ProjectGroup({ status, projects }) {
    const [addProjectOpen, setAddProjectOpen] = useState(false)

    // using editProject hook from RTK Query
    const [editProject] = useEditProjectMutation()

    // using useDrop hook from react-dnd to make this component a droppable target
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'project-card',
        drop: (item) => {
            editProject({ id: item.id, data: { status } })
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop()
        })
    }))

    return (
        <>
            <div
                ref={drop}
                className={`flex flex-col ${
                    isOver && 'bg-astronaut-100'
                } border border-astronaut-300 rounded-[6px] pt-[8px] pb-[16px] px-[16px] overflow-hidden`}
            >
                <div className="flex justify-between">
                    <p className="capitalize font-medium">{status}</p>
                    <span>
                        {
                            projects.filter(
                                (project) => project.status === status
                            ).length
                        }
                    </span>
                </div>
                <div className="h-full pb-[16px] overflow-y-auto no-scrollbar">
                    {projects
                        .filter((project) => project.status === status)
                        .map((project) => (
                            <ProjectItem
                                key={project.id}
                                project={project}
                            />
                        ))}
                </div>
                {status === 'backlog' && (
                    <input
                        type="submit"
                        name="submit"
                        id="submit"
                        value="Add project"
                        onClick={() => setAddProjectOpen(true)}
                        className="appearance-none block text-[14px] bg-[#2b5276] text-white border border-1 rounded-[6px] py-[5px] px-[16px] mt-auto cursor-pointer hover:bg-[hsl(209,45%,29%)]"
                    />
                )}
            </div>
            {addProjectOpen && (
                <AddProjectModal setAddProjectOpen={setAddProjectOpen} />
            )}
        </>
    )
}
