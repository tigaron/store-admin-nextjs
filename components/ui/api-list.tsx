import { useOrigin } from "@/hooks/use-origin";
import { useParams } from "next/navigation";
import { APIAlert } from "@/components/ui/api-alert";

interface APIListProps {
  entityName: string;
  entityIdName: string;
}

export const APIList: React.FC<APIListProps> = ({ entityName, entityIdName }) => {
  const params = useParams();
  const origin = useOrigin();

  const baseUrl = `${origin}/api/${params.storeId}`;

  return (
    <>
      <APIAlert title="GET" variant="public" description={`${baseUrl}/${entityName}`} />
      <APIAlert title="GET" variant="public" description={`${baseUrl}/${entityName}/`} editLabel="BILLBOARD_ID" />
      <APIAlert title="POST" variant="admin" description={`${baseUrl}/${entityName}`} />
      <APIAlert title="PATCH" variant="admin" description={`${baseUrl}/${entityName}/`} editLabel="BILLBOARD_ID" />
      <APIAlert title="DELETE" variant="admin" description={`${baseUrl}/${entityName}/`} editLabel="BILLBOARD_ID" />
    </>
  );
};
