import ProjectDetail from "@/components/Lead/Projects/Content"


type Props = {
  params: {
    projectId: string;
  }
}
export default function Home({params}: Props)
{
  return (
   <div>
    <ProjectDetail params={{ ...params, Id: params.projectId }} />
   </div>
  )
}

