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

export default function ProjectPage({ params }: Props) {
  return <Project params={params} />;
}
