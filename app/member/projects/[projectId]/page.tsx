// import Project from "@/components/Member/Projects/BothContent"


// type Props = {
//   params: {
//     projectId: string;
//   }
// }
// export default function Home({params}: Props)
// {
//   return (
//    <div>
//     <Project params={params} />
//    </div>
//   )
// }

import Project from '@/components/Member/Projects/BothContent';

type Props = {
  params: { projectId: string };
};

const ProjectComponent = Project as any;

export default function ProjectPage({ params }: Props) {
  return <ProjectComponent params={params} />;
}
