import { useGetProjectsQuery } from '../features/projects/projectsApi'
import Layout from '../components/base/Layout'
import ProjectGroup from '../components/Projects/ProjectGroup'
import Spinner from '../components/Spinner'

export default function Projects() {
    // using get projects hook from RTK Query
    const { data: projects, isLoading, isSuccess } = useGetProjectsQuery()

    return (
        <Layout>
            {isSuccess && (
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
            )}
            {isLoading && (
                <div className="w-full h-full flex items-center justify-center">
                    <Spinner />
                </div>
            )}
        </Layout>
    )
}
