import Projectleadcontent from "@/components/Lead/Projects/Content";
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
    <Projectleadcontent params={params} />
   </div>
  )
}

