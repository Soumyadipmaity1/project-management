import Project from "@/components/Member/Projects/BothContent"


type Props = {
  params: {
    projectId: string;
  }
}
export default function Home({params}: Props)
{
  return (
   <div>
    <Project params={{ ...params, Id: params.projectId }} />
   </div>
  )
}

 