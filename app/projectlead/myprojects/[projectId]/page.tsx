import Projectleadcontent from "@/components/ProjectLead/view";
import ProjectDetail from "@/components/Lead/Projects/Content"


type Props = {
  params: {
    projectId: string;
    Id: string;
  }
}

export default function Home({ params }: Props) {
  return (
    <div>
      <Projectleadcontent params={{ projectId: params.projectId, Id: params.Id }} />
    </div>
  );
}

