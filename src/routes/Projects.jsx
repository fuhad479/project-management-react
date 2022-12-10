import { useGetProjectsQuery } from '../features/projects/projectsApi'
import Layout from '../components/base/Layout'
import ProjectGroup from '../components/Projects/ProjectGroup'

export default function Projects() {
    // using get projects hook from RTK Query
    const { data: projects, isSuccess } = useGetProjectsQuery()

    return (
        <Layout>
            <div className="h-[calc(100%-56px)] grid grid-cols-4 gap-[16px] py-[16px] px-[32px]">
                <ProjectGroup
                    status="backlog"
                    projects={isSuccess ? projects : []}
                />
                <ProjectGroup
                    status="doing"
                    projects={isSuccess ? projects : []}
                />
                <ProjectGroup
                    status="review"
                    projects={isSuccess ? projects : []}
                />
                <ProjectGroup
                    status="done"
                    projects={isSuccess ? projects : []}
                />
            </div>
        </Layout>
    )
}
