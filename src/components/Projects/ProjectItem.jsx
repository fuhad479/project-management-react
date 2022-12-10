import { useDrag } from 'react-dnd'
import { url } from 'gravatar'
import moment from 'moment'

export default function ProjectItem({ project }) {
    const { team, title, author, timestamp } = project

    // using useDrag hook from react-dnd to make this component a draggable target
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'project-card',
        item: project,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))

    return (
        <div
            ref={drag}
            className={`bg-white border border-astronaut-200 rounded-[6px] p-[16px] mt-[16px] cursor-pointer ${
                isDragging && 'opacity-0'
            }`}
        >
            <div className="flex items-center justify-between mb-[8px] relative">
                <span
                    className={`inline-block rounded-full text-[12px] font-medium uppercase `}
                >
                    {team}
                </span>
            </div>
            <p className="text-[14px]">{title}</p>
            <div className="flex items-center justify-between mt-3 relative">
                <p className="w-auto grow text-[14px] font-bold">
                    {moment(timestamp).format('MMM DD')}
                </p>
                <div className="absolute w-auto h-full flex right-0 ml-auto -space-x-2">
                    <img
                        src={url(author.email, { size: 25 })}
                        alt="gravatar"
                        className="rounded-full"
                    />
                </div>
            </div>
        </div>
    )
}
