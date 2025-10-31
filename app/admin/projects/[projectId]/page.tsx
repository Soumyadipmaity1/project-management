import RightContent from '@/components/Admin/Projects/RightContent';


type Props = {
  params: {
    projectId: string;
  }
}
export default function Home({params}: Props)
{
  return (
   <div>
    <RightContent params={{ ...params, Id: params.projectId }}/>
   </div>
  )
}

